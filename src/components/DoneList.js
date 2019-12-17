import React,{ Component } from 'react';
import {deleteTask, fetchList} from '../actions/task.actions';

import _ from 'lodash';
import { connect } from 'react-redux';

export class DoneList extends Component{

    componentDidMount(){
        this.props.fetchList();
    }

    renderPosts(){

        return _.map(this.props.listOfTasks, task => {

            if(task.isDone === true)
            {
            return(
                <li
                className="list-group-item"
                key={task._id.$oid}
                >
                {task.name}
                <span className="pull-xs-right">
                <button className="btn btn-danger btn-sm delete"  onClick={()=>this.props.deleteTask(task)}>Usun</button>
                </span>
                </li>
            );
        }});
    }

    render(){
        return(
            <div className="col-sm-4">
            <h3>Done</h3>
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


export default connect (mapStateToProps,{fetchList,deleteTask})(DoneList);
