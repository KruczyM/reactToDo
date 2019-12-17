import { Field, reduxForm, reset } from 'redux-form';
import React, { Component } from 'react';

import { addTask } from '../actions/task.actions';
import { connect } from 'react-redux';

export const renderField = field => {

    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
        <div className={className}>
            <label>{field.label}</label>
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
    onSubmit(values) {
        const toDo={
            name: values['task'],
            isDone: false,
            created: new Date().toLocaleString()
            }
        this.props.addTask(toDo);
        this.props.dispatch(reset('TaskNewForm'));
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
function mapStateToProps(state){
    return {listOfTasks: state.listOfTasks};
}


export default reduxForm({
    validate,
    form: 'TaskNewForm',
})(
    connect(mapStateToProps, { addTask })(AddTask)
)