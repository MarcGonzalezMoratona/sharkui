import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";
import {
  playChecked,
  playDefault,
  playDisabled,
  playWithLabel,
} from "./checkbox.play";
import { Label } from "../label/label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "Initial checked state for uncontrolled usage.",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction and dims the checkbox.",
      table: { category: "State" },
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state of the checkbox.",
      table: { category: "State" },
    },
    name: {
      control: "text",
      description: "Name submitted with the form data.",
      table: { category: "State" },
    },
    required: {
      control: "boolean",
      description: "Marks the checkbox as required for form submission.",
      table: { category: "State" },
    },
    onCheckedChange: {
      description: "Fired when the checked state changes.",
      table: { category: "Events" },
    },
  },
  args: {
    "aria-label": "Accept terms and conditions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const Checked: Story = {
  args: { defaultChecked: true },
  play: playChecked,
};

export const Disabled: Story = {
  args: { disabled: true },
  play: playDisabled,
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Checkbox {...args} aria-label={undefined} id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  play: playWithLabel,
};
