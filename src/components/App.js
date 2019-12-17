import AddTask from './AddTask';
import DoneList from './DoneList';
import React  from 'react';
import ToDoList from './ToDoList';
import his from '../helpers/history';
export default () =>  {
  document.body.style.background = "white";
    return (
      <div>
        <div>
          <a className="btn btn-info btn-lg" onClick={()=>{
            document.body.style.background= "url('http://farm3.staticflickr.com/2832/12303719364_c25cecdc28_b.jpg')";
            document.body.style.backgroundSize = 'cover'
            his.push("/Login")
            }} >
          <span className="glyphicon glyphicon-log-out" /> Back
          </a>
        </div>
        <ToDoList />
        <AddTask />
        <DoneList />
      </div>
    );
  
};
