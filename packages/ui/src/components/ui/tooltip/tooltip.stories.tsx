import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { playDefault, playKeyboard, playOpen } from "./tooltip.play";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
  play: playDefault,
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["start", "center", "end"] as const).map((align) => (
        <Tooltip key={align}>
          <TooltipTrigger
            render={<Button variant="outline">align: {align}</Button>}
          />
          <TooltipContent align={align} side="bottom">
            Aligned {align}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>Save</Button>} />
      <TooltipContent>
        Save changes
        <kbd
          data-slot="kbd"
          className="bg-background/20 px-1 font-mono text-[0.625rem]"
        >
          ⌘S
        </kbd>
      </TooltipContent>
    </Tooltip>
  ),
  play: playKeyboard,
};

export const LongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Details</Button>} />
      <TooltipContent>
        This is a longer tooltip that demonstrates how the content wraps once it
        reaches its maximum width.
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Offset 12px</Button>} />
      <TooltipContent sideOffset={12}>Pushed further away</TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delay={700}>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline">Hover and wait</Button>}
        />
        <TooltipContent>Appears after 700ms</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Open: Story = {
  render: () => (
    <div style={{ padding: 48 }}>
      <Tooltip defaultOpen>
        <TooltipTrigger
          render={<Button variant="outline">Always visible</Button>}
        />
        <TooltipContent>Open by default</TooltipContent>
      </Tooltip>
    </div>
  ),
  play: playOpen,
};
