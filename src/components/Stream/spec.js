import React from "react";
import Stream from "./presenter";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

describe("Stream", function() {
  const tracks = [
    { origin: { title: "Track 1" } },
    { origin: { title: "Track 2" } }
  ];

  it("snapshot", () => {
    const component = renderer.create(<Stream tracks={tracks} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders two tracks", () => {
    const component = shallow(<Stream tracks={tracks} />);
    expect(component.find(".track")).toHaveLength(2);
  });
});
