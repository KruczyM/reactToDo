import React,{ Component } from 'react';
import { addToDone, deleteTask, fetchList } from '../actions/task.actions';

import _ from 'lodash';
import { connect } from 'react-redux';

export class ToDoList extends Component{

    componentDidMount(){
        this.props.fetchList();
    }



    addToDoneHelper(task){
        let doneTask = task;
        doneTask.isDone = true;
        doneTask.end = new Date().toLocaleString();
        this.props.addToDone(this.props.listOfTasks,doneTask);
    }



    renderPosts(){

        return _.map(this.props.listOfTasks, task => {

            if(task.isDone === false)
            {
            return(
                <li
                className="list-group-item"
                key={task._id.$oid}
                >
                {task.name}
                <span className="pull-xs-right">
                <button className="btn btn-success btn-sm add" onClick={()=>this.addToDoneHelper(task)}>Zrobione</button>
                <button className="btn btn-danger btn-sm delete"  onClick={()=>this.props.deleteTask(task)}>Usun</button>
                </span>
                </li>
            );
        }});
    }

    render(){
        return(
            <div className="col-sm-4">
                <h3>ToDo</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
                </div>
        );
    }


}

function mapStateToProps(state){
    return {listOfTasks: state.listOfTasks};
}


export default connect (mapStateToProps,{fetchList,addToDone,deleteTask})(ToDoList);
