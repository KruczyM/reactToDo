import React from 'react';
import { shallow } from 'enzyme';
import  App from '../App';
import DoneList from '../DoneList';
import ToDoList from '../ToDoList';
import AddTask from '../AddTask';


let wrapped

beforeEach( () =>{
    wrapped = shallow(<App />);
});

it('show a ToDoList', () => {
    expect(wrapped.find(ToDoList).length).toEqual(1);
});

it('show a AddTask', () => {
    expect(wrapped.find(AddTask).length).toEqual(1);
});

it('show a DoneList', () => {
    expect(wrapped.find(DoneList).length).toEqual(1);
}); 