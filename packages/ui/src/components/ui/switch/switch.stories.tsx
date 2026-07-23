import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./switch";
import {
  playChecked,
  playDefault,
  playDisabled,
  playWithLabel,
} from "./switch.play";
import { Label } from "../label/label";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
      description: "Size of the switch.",
      table: { category: "Appearance" },
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial checked state for uncontrolled usage.",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction and dims the switch.",
      table: { category: "State" },
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state of the switch.",
      table: { category: "State" },
    },
    onCheckedChange: {
      description: "Fired when the checked state changes.",
      table: { category: "Events" },
    },
  },
  args: {
    size: "default",
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const On: Story = {
  args: { defaultChecked: true },
  play: playChecked,
};

export const Disabled: Story = {
  args: { disabled: true },
  play: playDisabled,
};

export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Switch {...args} size="sm" />
      <Switch {...args} size="default" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Switch {...args} id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  ),
  play: playWithLabel,
};
