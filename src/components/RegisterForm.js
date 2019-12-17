import { Field, reduxForm, reset } from "redux-form";
import React, { Component } from "react";
import his from '../helpers/history';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from "react-redux";
import { register } from '../actions/user.actions';

export class RegisterForm extends Component {

  
    componentDidMount(){
      if(localStorage.getItem('user')){
        his.push("/ToDoList")
      }
    }
  
  onSubmit = (values) => {
    this.props.register(values);
  };

  renderField = field => {
    const {
      meta: { touched, error }
    } = field;
    const className = `${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label className="text-white">{field.label}</label>
        <input
          type={field.type}
          id={field.label.toLowerCase()}
          {...field.input}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  };


  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="wrap">
              <p className="error">{this.props.registerCallBack.username}</p>
              <p className="form-title">Register</p>
              <form
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                className="login"
              >
                <Field
                  name="username"
                  type="text"
                  component={this.renderField}
                  label="UserName"
                />
                <Field
                  name="email"
                  type="email"
                  component={this.renderField}
                  label="Email"
                />
                <Field
                  name="password"
                  type="password"
                  component={this.renderField}
                  label="Password"
                />
                <Field
                  name="repeatPassword"
                  type="password"
                  component={this.renderField}
                  label="Repeat Password"
                />
                <input
                  type="submit"
                  className="btn btn-success btn-sm"
                  value="Register"
                />
                <div className="row">
                  <div className=" col-sm-offset-8 col-sm-4">
                    <Link to="login">Sign In</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  errors.username = !values.username ? "Enter your username" : null;
  errors.password = !values.password ? "Enter your password" : null;
  errors.email = values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ?
  'Invalid email address' : undefined;
  errors.repeatPassword = !values.repeatPassword ? "Enter your password second time" : null;
  errors.repeatPassword = values.repeatPassword !== values.password ? "Password must be the same" : null;
  return errors;
};

const mapStateToProps = state => {
  return {registerCallBack : state.registration}
}

export default reduxForm({
  validate,
  form: "RegisterForm"
})(
  connect(
    mapStateToProps,
    {register}
  )(RegisterForm)
);