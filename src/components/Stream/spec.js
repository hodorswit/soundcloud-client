import React from "react";
import Stream from "./presenter";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

describe("Stream", function() {
  const props = {
    trackIds: ["x", "y"],
    trackEntities: { x: { title: "x" }, y: { title: "y" } }
  };

  it("snapshot", () => {
    const component = renderer.create(<Stream tracks={props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders two tracks", () => {
    const component = shallow(<Stream tracks={props} />);
    expect(component.find(".track")).toHaveLength(2);
  });
});
