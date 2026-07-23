import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { playDefault, playNavigation, playSides } from "./sheet.play";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the sheet is open (controlled).",
      table: { category: "State" },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the sheet is open by default (uncontrolled).",
      table: { category: "State" },
    },
    onOpenChange: {
      description: "Fired when the sheet is opened or closed.",
      table: { category: "Events" },
    },
    children: {
      control: false,
      description: "Trigger and content of the sheet.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline">Open sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-6">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium">Name</span>
            <input
              defaultValue="Marc González"
              className="h-8 rounded-md border border-border bg-transparent px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium">Username</span>
            <input
              defaultValue="@marcgm"
              className="h-8 rounded-md border border-border bg-transparent px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </label>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: playDefault,
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline">{side}</Button>} />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Sheet from {side}</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side} edge of the viewport.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button variant="outline">Close</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
  play: playSides,
};

export const Navigation: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger
        render={<Button variant="outline">Open navigation</Button>}
      />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Jump to a section of the app.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-md px-2 py-1.5 text-xs hover:bg-muted"
            >
              {item}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
  play: playNavigation,
};
