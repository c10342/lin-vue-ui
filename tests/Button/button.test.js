import { shallowMount } from "@vue/test-utils";

import Button from "packages/Button";

const createButton = (obj = {}) => {
  return shallowMount(Button, obj);
};

describe("属性", () => {
  it("type", () => {
    const typeList = [
      "default",
      "primary",
      "success",
      "warning",
      "danger",
      "info",
    ];
    for (let i = 0; i < typeList.length; i++) {
      const wrapper = createButton({
        propsData: { type: typeList[i] },
      });
      const button = wrapper.find("button");
      expect(button.classes()).toContain(`l-button-${typeList[i]}`);
    }
  });

  it("plain", () => {
    const wrapper = createButton({ propsData: { plain: true } });

    const button = wrapper.find("button");
    expect(button.classes()).toContain("l-button-plain");
  });

  it("round", () => {
    const wrapper = createButton({ propsData: { round: true } });
    const button = wrapper.find("button");
    expect(button.classes()).toContain("l-button-round");
  });

  it("circle", () => {
    const wrapper = createButton({ propsData: { circle: true } });
    const button = wrapper.find("button");
    expect(button.classes()).toContain("l-button-circle");
  });

  it("disabled", () => {
    const wrapper = createButton({ propsData: { disabled: true } });
    const button = wrapper.find("button");
    expect(button.classes()).toContain("l-button-disabled");
  });

  it("icon", () => {
    const wrapper = createButton({ propsData: { icon: "l-icon-date" } });
    const icon = wrapper.find(".l-icon-date");
    expect(icon.classes()).toContain("l-icon-date");
  });

  it("size", () => {
    const typeList = ["default", "medium", "small"];
    for (let i = 0; i < typeList.length; i++) {
      const wrapper = createButton({
        propsData: { size: typeList[i] },
      });
      const button = wrapper.find("button");
      expect(button.classes()).toContain(`l-button-size-${typeList[i]}`);
    }
  });
});

describe("插槽", () => {
  it("default", () => {
    const wrapper = createButton({
      slots: {
        default: "按钮",
      },
    });
    const button = wrapper.find("button");
    expect(button.text()).toEqual("按钮");
  });
});

describe("事件", () => {
  it("click", async () => {
    const wrapper = createButton();
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
