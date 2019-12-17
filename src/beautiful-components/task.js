import React, { Component } from "react";
import { deleteTask, fetchList } from "../actions/dragDropList.actions";

import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  white-space: nowrap;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;

export class Task extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.content}
        index={this.props.index}
        isDragDisabled={this.props.column === "done"}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            aria-roledescription="Press space bar to lift the task"
            className="dropdown"
          >
            {this.props.task.content}
            <button
              className="btn btn-link dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            />
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              name={this.props.task.content}
            />
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={  e => {
                 this.props.deleteTask(this.props.task.id, e);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default connect(
  null,
  { deleteTask, fetchList }
)(Task);
