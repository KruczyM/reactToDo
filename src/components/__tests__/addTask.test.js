import { mount, shallow } from 'enzyme';

import  AddTask from '../AddTask';
import React from 'react';
import Root from '../../Root';
import sinon from 'sinon';
import { wrap } from 'module';

let wrapped;
/*
const defaultProps = {
    handleSubmit: () => {},
    initialValues: {},
    renderField: () => {}
  };

beforeEach(() => {

    wrapped = shallow(<AddTask {...defaultProps} />);
})

afterEach(() => {
    wrapped.unmount();
})

it('has a SubmitButton', () => {
    expect(wrapped.find('form').find('button').length).toEqual(1);
});

it('ir rander <form /> element ', () => {
        expect(wrapped.find('form').is('.TaskNewForm')).toEqual(true);
});

*/
beforeEach(() => {
    wrapped = mount(<Root><AddTask  /></Root>);
    wrapped.update();
})

afterEach(() => {
    wrapped.unmount();
})

describe('the input', () => {
    beforeEach(() => {
        wrapped.find('input').simulate('change', {
            target: { value: 'new task' }
        });
        wrapped.update();
    });

    it('has a input that user can type in', () => {
        expect(wrapped.find('input').prop('value')).toEqual('new task');
    });

    it('when form is submitted, input gets empty', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('input').prop('value')).toEqual('');
    });

})
describe('the Field {name: task} validation', () => {

    it('it prevent to submiting empty string ', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('Field').filter({ name: 'task' }).find('.has-danger').find('.text-help').text()).toEqual('Enter a task');
    });
    it('pop message with error to user after touched', () => {
        const fieldTask = wrapped.find('Field').filter({ name: 'task' });
        fieldTask.find('input').simulate('focus');
        fieldTask.find('input').simulate('blur');
        wrapped.update();
        // Czemu nie działa przy podstawieniu pod zmienną
        //  console.log(fieldTask.find('.has-danger').length);  0
        //  console.log(wrapped.find('Field').filter({name:'task'}).find('.has-danger').length);   1
        expect(wrapped.find('Field').filter({ name: 'task' }).find('.text-help').text()).toEqual('Enter a task');
    })

})





