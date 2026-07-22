import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsIcon } from "lucide-react";

import { Button } from "../button/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";
import { playDefault, playDimensions, playSides } from "./popover.play";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger
        render={<Button variant="outline">Open popover</Button>}
      />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>
            Popovers are great for lightweight, contextual content anchored to a
            trigger.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  play: playDefault,
};

export const Dimensions: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <SettingsIcon />
            Dimensions
          </Button>
        }
      />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          {[
            { label: "Width", value: "100%" },
            { label: "Max. width", value: "300px" },
            { label: "Height", value: "25px" },
            { label: "Max. height", value: "none" },
          ].map((field) => (
            <label
              key={field.label}
              className="grid grid-cols-[1fr_2fr] items-center gap-2"
            >
              <span className="text-xs">{field.label}</span>
              <input
                defaultValue={field.value}
                className="h-7 rounded-md border border-border bg-transparent px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: playDimensions,
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["top", "left", "right", "bottom"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
          <PopoverContent side={side}>
            <PopoverHeader>
              <PopoverTitle>Side: {side}</PopoverTitle>
              <PopoverDescription>
                This popover is positioned on the {side}.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
  play: playSides,
};
