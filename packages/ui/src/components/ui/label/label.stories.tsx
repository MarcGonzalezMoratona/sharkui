import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./label";
import { playDefault, playWithInput } from "./label.play";
import { Input } from "../input/input";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Label",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const WithInput: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 240 }}
    >
      <Label {...args} htmlFor="username">
        Username
      </Label>
      <Input id="username" placeholder="Enter your username" />
    </div>
  ),
  play: playWithInput,
};
