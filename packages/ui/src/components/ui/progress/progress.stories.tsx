import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress, ProgressLabel, ProgressValue } from "./progress";
import {
  playComplete,
  playDefault,
  playEmpty,
  playIndeterminate,
  playLabeled,
} from "./progress.play";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: {
    value: 60,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const Empty: Story = {
  args: { value: 0 },
  play: playEmpty,
};

export const Halfway: Story = {
  args: { value: 60 },
};

export const Complete: Story = {
  args: { value: 100 },
  play: playComplete,
};

export const Indeterminate: Story = {
  args: { value: null },
  play: playIndeterminate,
};

export const Labeled: Story = {
  args: { value: 72 },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  ),
  play: playLabeled,
};
