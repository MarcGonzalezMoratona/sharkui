import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Toaster, toast } from "./toast";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button onClick={() => toast("Event has been created")}>
        Show toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Changes saved successfully")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Something went wrong")}
      >
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.info("Heads up!")}>
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Your session is about to expire")}
      >
        Warning
      </Button>
      <Toaster {...args} />
    </div>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button
        onClick={() =>
          toast.success("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Show toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button
        onClick={() =>
          toast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => toast("Undone"),
            },
          })
        }
      >
        Show toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
};
