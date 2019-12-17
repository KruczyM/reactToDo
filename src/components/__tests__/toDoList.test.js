import React from "react";
import { ToDoList } from "../ToDoList";
import { shallow } from "enzyme";

let wrapped, spy;

const props = {
  fetchList: () => {},
  listOfTasks: [
    { name: "Fetched #1", isDone: false, _id: { $oid: 1 } },
    { name: "Fetched #2", isDone: false, _id: { $oid: 2 } }
  ],
  addToDone: () => {},
  deleteTask: () => {}
};

describe("rendering", () => {
    afterEach(() => {
        wrapped.unmount();
    });

  it(" ComponentDidMount", () => {

    spy = jest.spyOn(props, "fetchList");
    wrapped = shallow(<ToDoList {...props} />);
    wrapped.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();

  });

  it(" renderPosts", () => {

    spy = jest.spyOn(ToDoList.prototype, "renderPosts");
    wrapped = shallow(<ToDoList {...props} />);
    wrapped.update();
    expect(wrapped.instance().renderPosts).toHaveBeenCalled();
  });
  describe("randering list elements", () => {
    it("corect number of li", () => {
      wrapped = shallow(<ToDoList {...props} />);

      wrapped.update();
      expect(wrapped.find("li").length).toEqual(2);
    });

    it("list element have two buttons", () => {
      wrapped.update();
      expect(
        wrapped.find("li").forEach(node => {
          expect(node.find("button").length).toEqual(2);
        })
      );
    });

    it("add button call addToDone function ", () => {
      spy = jest.spyOn(props, "addToDone");
      wrapped = shallow(<ToDoList {...props} />);

      wrapped.update();
      expect(
        wrapped.find("li").forEach(node => {
          node.find(".add").simulate("click");
          wrapped.update();
          expect(spy).toHaveBeenCalled();
        })
      );
    });

    it("delete button call deleteTask function ", () => {
        spy = jest.spyOn(props, "deleteTask");
        wrapped = shallow(<ToDoList {...props} />);
  
        wrapped.update();
        expect(
          wrapped.find("li").forEach(node => {
            node.find(".delete").simulate("click");
            wrapped.update();
            expect(spy).toHaveBeenCalled();
          })
        );
      });
  });
});
