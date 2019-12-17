import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { Component } from "react";

import Task from "./task";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radious: 2px;
  min-width: 220px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const Title = styled.h3`
  padding: 8px;
  color: white;
  color: ${props => (props.column === "done" ? "green" : "")};
  font-size: ${props => (props.column === "done" ? "50px" : "")};
  font-weight: ${props => (props.column === "done" ? "bold" : "")};
  text-transform: ${props => (props.column === "done" ? "uppercase" : "")};
  text-align: center;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tasks === this.props.tasks ? false : true;
  }

  render() {
    return this.props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        column={this.props.column}
      />
    ));
  }
}

export default class Column extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.column.username}
        index={this.props.index}
      >
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title
              column={this.props.column.title}
              {...provided.dragHandleProps}
            >
              {this.props.column.username}
            </Title>
            <Droppable
              droppableId={this.props.column.id}
              type="task"
              isCombineEnabled={
                this.props.column.username === "done" ? false : true
              }
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList
                    tasks={this.props.tasks}
                    column={this.props.column.username}
                  />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
