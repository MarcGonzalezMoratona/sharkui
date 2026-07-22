import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";
import { playDefault, playDisabled, playInvalid, playWithLabel } from "./input.play";
import { Label } from "../label/label";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    type: "text",
    placeholder: "Type something...",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const WithPlaceholder: Story = {
  args: { placeholder: "you@example.com", type: "email" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
  play: playDisabled,
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "not-an-email",
    type: "email",
  },
  play: playInvalid,
};

export const WithLabel: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 240 }}
    >
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
  play: playWithLabel,
};
