import { DoneList } from "../DoneList";
import React from "react";
import { shallow } from "enzyme";

let wrapped, spy;
const props = {
  fetchList: () => {},
  listOfTasks: [
    { name: "Fetched #1", isDone: true, _id: { $oid: 1 } },
    { name: "Fetched #2", isDone: true, _id: { $oid: 2 } }
  ],
  deleteTask: () => {}
};

describe("rendering", () => {
  it(" ComponentDidMount", () => {
    spy = jest.spyOn(props, "fetchList");
    wrapped = shallow(<DoneList {...props} />);
    wrapped.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
    wrapped.unmount();
  });

  it(" renderPosts", () => {
    spy = jest.spyOn(DoneList.prototype, "renderPosts");
    wrapped = shallow(<DoneList {...props} />);
    wrapped.update();
    expect(wrapped.instance().renderPosts).toHaveBeenCalled();
    wrapped.unmount();
  });
  describe("randering list elements", () => {
    afterEach(() => {
      wrapped.unmount();
    });

    it("corect number of li", () => {
      wrapped = shallow(<DoneList {...props} />);
      wrapped.update();
      expect(wrapped.find("li").length).toEqual(2);
    });
    it("list element have delete button", () => {
      wrapped = shallow(<DoneList {...props} />);
      wrapped.update();
      wrapped.find("li").forEach(node => {
        expect(node.exists("button")).toEqual(true);
      });
    });

    it("delete button call delete function", () => {
      spy = jest.spyOn(props, "deleteTask");
      wrapped = shallow(<DoneList {...props} />);
      wrapped.update();
      wrapped.find("li").forEach(node => {
        node.find(".delete").simulate("click");
        wrapped.update();
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
