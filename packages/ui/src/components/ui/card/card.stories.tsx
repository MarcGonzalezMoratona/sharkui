import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpRight, MoreHorizontal, TrendingUp } from "lucide-react";

import { Button } from "../button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {
  playDefault,
  playSmall,
  playStat,
  playWithLinkAction,
} from "./card.play";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Internal spacing scale of the card.",
      table: { category: "Appearance" },
    },
    children: {
      control: "text",
      description: "Card content, typically the Card* sub-components.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>
          Invite your colleagues to collaborate on this workspace.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        Everyone with access can view and edit the documents shared inside this
        project.
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="ghost">Cancel</Button>
        <Button>Invite</Button>
      </CardFooter>
    </Card>
  ),
  play: playDefault,
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} className="w-72">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Uses the reduced spacing token.</CardDescription>
      </CardHeader>
      <CardContent>
        The <code>sm</code> size tightens the internal spacing variable.
      </CardContent>
    </Card>
  ),
  play: playSmall,
};

export const Stat: Story = {
  render: (args) => (
    <Card {...args} className="w-64">
      <CardHeader>
        <CardDescription>Total revenue</CardDescription>
        <CardTitle className="text-2xl">$45,231.89</CardTitle>
        <CardAction>
          <TrendingUp className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardFooter className="text-muted-foreground">
        +20.1% from last month
      </CardFooter>
    </Card>
  ),
  play: playStat,
};

export const WithLinkAction: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
        <CardDescription>
          Everything you need to integrate the design system.
        </CardDescription>
        <CardAction>
          <Button variant="link" size="sm">
            Open
            <ArrowUpRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        Browse guides, component references, and design tokens in one place.
      </CardContent>
    </Card>
  ),
  play: playWithLinkAction,
};
