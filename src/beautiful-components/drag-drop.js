import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { Component } from "react";
import {
  changeOrder,
  changeUserTasks,
  doneTask,
  fetchList,
  fetchOrder,
  fetchUser,
  getLogedUser
} from "../actions/dragDropList.actions";

import Column from "./columns";
import InputTask from "./addT";
import _ from "lodash";
import { connect } from "react-redux";
import { logout } from "../actions/user.actions";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  overflow: visible;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.column === this.props.column &&
      nextProps.taskMap === this.props.taskMap &&
      nextProps.index === this.props.index
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { column, taskMap, index } = this.props;
    let tasks
    if( column.title !== 'done'){
       tasks = column.taskIds.map(taskId =>
        taskMap[taskId].is_done === false ? taskMap[taskId] : null
      );
    }
    else{
       tasks = _.map(taskMap,taskId =>
        taskId.is_done === true ? taskId: null
      );
    }

    tasks = tasks.filter(Boolean);
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
      />
    );
  }
}

const swapUserOrder = (obj, key1, key2) => {
  [obj[key1].user, obj[key2].user] = [obj[key2].user, obj[key1].user];
};

export class DragDrop extends Component {
  async componentDidMount() {
    await this.props.fetchList();
    await this.props.fetchUser();
    await this.props.fetchOrder();
    await this.props.getLogedUser();
   // this.setDoneInLastPosition();
    }

  setDoneInLastPosition = () =>{
    const userId = _.mapKeys(this.props.columns,'username')['done'].id;
    const userPosition = _.mapKeys(this.props.columnOrder,'user')[userId].id;
    if(userPosition !== this.props.columnOrder.length) swapUserOrder(this.props.columnOrder,this.props.columnOrder.length,userPosition);
  }


  renderContent() {
    return _.map(this.props.columnOrder, (columnId, index) => {
      const column = this.props.columns[columnId["user"]];
      const tasks = _.mapKeys(
        column.taskIds.map(taskId => this.props.tasks[taskId]),
        "id"
      );
      return (
        <div>

          <InnerList
            key={column.id}
            index={index}
            column={column}
            taskMap={column.title === 'done'? this.props.tasks:tasks}

          />
        </div>
      );
    });
  }

  onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
    const homeIndex = this.props.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex
    });
  };

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position
      ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
      ${result.source.index + 1}`;
    provided.announce(message);

    this.setState({
      homeIndex: null
    });

    const { destination, source, draggableId, type, combine } = result;

    if (combine) {
      const sourceId = _.mapKeys(this.props.tasks, "content")[draggableId].id;
      const destinationId = _.mapKeys(this.props.tasks, "content")[
        combine.draggableId
      ].id;

      const div = document.getElementsByName(combine.draggableId)[0];
      const a = document.createElement("a");
      a.className = "dropdown-item";
      a.href = "#";
      a.text = draggableId;
      div.appendChild(a);

      return;
    }

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      if (destination.index === this.props.columnOrder.length) {
        return;
      }

      let newColumnOrder = this.props.columnOrder;
      swapUserOrder(newColumnOrder, source.index, destination.index);
      this.props.changeOrder(newColumnOrder);
      return;
    }

    if (this.props.columns[destination.droppableId].username === 'done') {
      const start = this.props.columns[source.droppableId];
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };
      let findFromDraggableId = _.mapKeys(this.props.tasks, "content");
      this.props.doneTask(findFromDraggableId[draggableId].id);
      this.props.changeUserTasks(newStart);

      return;
    }

    const start = this.props.columns[source.droppableId];
    const finish = this.props.columns[destination.droppableId];

    if (start === finish) {
      let findFromDraggableId = _.mapKeys(this.props.tasks, "content");

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(
        destination.index,
        0,
        findFromDraggableId[draggableId].id
      );

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
      this.props.changeUserTasks(newColumn);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    let findFromDraggableId = _.mapKeys(this.props.tasks, "content");
    finishTaskIds.splice(
      destination.index,
      0,
      findFromDraggableId[draggableId].id
    );
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    this.props.changeUserTasks(newStart);
    this.props.changeUserTasks(newFinish);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <a
              href="#"
              className="btn btn-info btn-lg"
              onClick={e => this.props.logout()}
            >
              <span className="glyphicon glyphicon-log-out" /> Log out
            </a>
          </div>
        </div>

        <div>
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}
          >
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {provided => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                  {this.renderContent()}

                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <InputTask />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    columns: state.users,
    tasks: state.tasks,
    columnOrder: state.userOrder
  };
};

export default connect(
  mapStateToProps,
  {
    fetchList,
    fetchOrder,
    fetchUser,
    changeOrder,
    changeUserTasks,
    getLogedUser,
    logout,
    doneTask
  }
)(DragDrop);
