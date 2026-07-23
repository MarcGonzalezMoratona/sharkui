import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./skeleton";
import { playCardLoading, playCircle, playDefault } from "./skeleton.play";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Optional content rendered inside the placeholder.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
  play: playDefault,
};

export const Line: Story = {
  render: () => <Skeleton className="h-4 w-64" />,
};

export const Circle: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
  play: playCircle,
};

export const CardLoading: Story = {
  parameters: { layout: "padded" },
  play: playCardLoading,
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: 320 }}>
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div
        style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}
      >
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
};
