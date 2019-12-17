import { Field, reduxForm, reset } from "redux-form";
import React, { Component } from "react";
import his from '../helpers/history';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from '../actions/user.actions';

export class LoginForm extends Component {

    componentDidMount(){
      if(localStorage.getItem('user')){
        his.push("/ToDoList")
      }
    }
  
  onSubmit = (values) => {
      this.props.login(values);
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
              <p className="error">{this.props.loginCallBack.loging === false? 'Wrong login data' : null }</p>
              <p className="form-title">Sign In</p>
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
                  name="password"
                  type="password"
                  component={this.renderField}
                  label="Password"
                />
                <input
                  type="submit"
                  className="btn btn-success btn-sm"
                  value="Sign In"
                />
                <div className="row">
                  <div className=" col-sm-offset-8 col-sm-4">
                    <Link to="/register">Register</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={{display:"block", position:"absolute", right:'10vw', top: '80vh'}}>
          <button className="btn btn-success btn-sm" onClick={()=>his.push("/ToDoList2")}>Old version Todo</button>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  errors.username = !values.username ? "Enter your username" : null;
  errors.password = !values.password ? "Enter your password" : null;
  return errors;
};

const mapStateToProps = state =>{
  return {loginCallBack: state.login}
}

export default reduxForm({
  validate,
  form: "LoginForm"
})(
  connect(
    mapStateToProps,
    {login}
  )(LoginForm)
);
