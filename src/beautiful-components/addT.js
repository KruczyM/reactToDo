import { Field, reduxForm, reset } from 'redux-form';
import React, { Component } from 'react';
import { addTask, fetchList, fetchUser } from '../actions/dragDropList.actions';

import { connect } from 'react-redux';

export const renderField = field => {

    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
        <div className={className}>
            <label className="labelTask">{field.label}</label>
            <input
                type="text"
                className="form-control"
                {...field.input}
            />
            <div className="text-help">
                {touched ? error  : ''}
                
            </div>
        </div>
        
    );
}

export class AddTask extends Component {

    componentDidMount(){
        this.props.fetchList();
    }

    onSubmit(values) {

        Object.values(this.props.tasks).forEach(element =>{
            if ( element.content === values.task){
                let div = document.getElementsByClassName('text-help')[0];
                div.style.color = 'red';
                div.textContent = 'task must be unique';
                return
            }
        });

        if(document.getElementsByClassName('text-help')[0].style.color !== 'red'){
            this.props.addTask(values);
            this.props.fetchUser();
            this.props.dispatch(reset('TaskNewForm'));
        }


    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="col-sm-4">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Add Task"
                        name="task"
                        component={renderField}
                    />
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    errors.task = !values.task ?  'Enter a task' : null;
    return errors;

}

const mapStateToProps = state => {
    return {
      tasks: state.tasks,
    };
  };

export default reduxForm({
    validate,
    form: 'TaskNewForm',
})(
    connect(mapStateToProps, { addTask,fetchUser, fetchList })(AddTask)
)