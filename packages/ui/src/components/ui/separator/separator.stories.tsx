import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./separator";
import { playHorizontal, playVertical } from "./separator.play";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Axis the separator is drawn along.",
      table: { category: "Appearance" },
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-64">
      <div className="text-sm font-medium">SharkUI</div>
      <div className="text-xs text-muted-foreground">
        A design system built on Base UI.
      </div>
      <Separator {...args} className="my-3" />
      <div className="text-xs text-muted-foreground">
        Components, tokens, and guidelines.
      </div>
    </div>
  ),
  play: playHorizontal,
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-6 items-center gap-3 text-xs">
      <span>Docs</span>
      <Separator {...args} />
      <span>Components</span>
      <Separator {...args} />
      <span>Tokens</span>
    </div>
  ),
  play: playVertical,
};
