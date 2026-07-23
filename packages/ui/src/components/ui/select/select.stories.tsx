import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  playDefault,
  playDisabledItem,
  playPreselected,
  playWithGroups,
} from "./select.play";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The controlled value of the select.",
      table: { category: "State" },
    },
    defaultValue: {
      description: "The uncontrolled initial value of the select.",
      table: { category: "State" },
    },
    onValueChange: {
      description: "Fired when the selected value changes.",
      table: { category: "Events" },
    },
    open: {
      control: "boolean",
      description: "Whether the select popup is open.",
      table: { category: "State" },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the select popup is initially open.",
      table: { category: "State" },
    },
    onOpenChange: {
      description: "Fired when the popup is opened or closed.",
      table: { category: "Events" },
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction with the select.",
      table: { category: "State" },
    },
    children: {
      description: "Trigger and content of the select.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: playDefault,
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: playWithGroups,
};

export const WithDisabledItem: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (coming soon)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  play: playDisabledItem,
};

export const Preselected: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: playPreselected,
};
