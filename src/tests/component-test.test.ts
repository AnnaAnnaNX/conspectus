import { shallowMount } from "@vue/test-utils";
import Editor from "../components/Editor.vue";
import { assert, describe, it } from "vitest";

// ?

describe.skip("addSelection", () => {
  it("I", () => {
    // render the component
    const wrapper: any = shallowMount(Editor as any, {
      propsData: {
        HTMLContent: `<div></div>`,
      },
    });
    // wrapper.vm.;

    assert.equal(wrapper.props().HTMLContent, "<div></div>");
    assert.equal(wrapper.vm.q1, 2);
  });
});
