import React from "react";
import Stream from "./Stream";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

describe("Stream", function() {
  const tracks = [{ title: "Track 1" }, { title: "Track 2" }];

  it("renders deterministically", () => {
    const component = renderer.create(<Stream tracks={tracks} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders two tracks", () => {
    const component = shallow(<Stream tracks={tracks} />);
    expect(component.find(".track")).toHaveLength(2);
  });
});
