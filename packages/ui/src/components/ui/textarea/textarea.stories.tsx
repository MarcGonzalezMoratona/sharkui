import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./textarea";
import {
  playDefault,
  playDisabled,
  playInvalid,
  playWithLabel,
} from "./textarea.play";
import { Label } from "../label/label";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Hint text shown when the textarea is empty.",
      table: { category: "Content" },
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction and dims the textarea.",
      table: { category: "State" },
    },
    value: {
      control: "text",
      description: "Controlled value of the textarea.",
      table: { category: "State" },
    },
    name: {
      control: "text",
      description: "Name submitted with the form data.",
      table: { category: "State" },
    },
    required: {
      control: "boolean",
      description: "Marks the textarea as required for form submission.",
      table: { category: "State" },
    },
    readOnly: {
      control: "boolean",
      description: "Makes the value non-editable while still focusable.",
      table: { category: "State" },
    },
    onChange: {
      description: "Fired when the textarea value changes.",
      table: { category: "Events" },
    },
  },
  args: {
    placeholder: "Type something...",
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
  play: playDisabled,
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Too short" },
  play: playInvalid,
};

export const WithLabel: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}
    >
      <Label htmlFor="message">Message</Label>
      <Textarea {...args} id="message" placeholder="Write a message..." />
    </div>
  ),
  play: playWithLabel,
};
