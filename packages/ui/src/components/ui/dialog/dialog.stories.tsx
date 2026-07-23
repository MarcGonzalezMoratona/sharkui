import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2Icon } from "lucide-react";

import { Button } from "../button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  playConfirmDelete,
  playDefault,
  playEditProfile,
  playWithoutCloseButton,
} from "./dialog.play";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the dialog is open (controlled).",
      table: { category: "State" },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the dialog is open by default (uncontrolled).",
      table: { category: "State" },
    },
    modal: {
      control: "boolean",
      description:
        "Whether the dialog traps focus and blocks interaction with the rest of the page.",
      table: { category: "State" },
    },
    onOpenChange: {
      description: "Fired when the dialog is opened or closed.",
      table: { category: "Events" },
    },
    children: {
      control: false,
      description: "Trigger and content of the dialog.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            This is a basic dialog. Click outside, press escape, or use the
            close button to dismiss it.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  play: playDefault,
};

export const EditProfile: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
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
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: playEditProfile,
};

export const ConfirmDelete: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger
        render={
          <Button variant="destructive">
            <Trash2Icon />
            Delete account
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose
            render={
              <Button variant="destructive">
                <Trash2Icon />
                Delete
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: playConfirmDelete,
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No close button</DialogTitle>
          <DialogDescription>
            The top-right close button is hidden. Use the footer action to
            dismiss.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button>Got it</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: playWithoutCloseButton,
};
