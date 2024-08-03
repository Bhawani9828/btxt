import { Search } from ".";

export default {
  title: "Components/Search",
  component: Search,
  argTypes: {
    stateProp: {
      options: ["resting", "hover"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "resting",
    className: {},
    inputType: "text",
  },
};
