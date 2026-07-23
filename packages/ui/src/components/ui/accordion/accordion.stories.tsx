import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import {
  playDefault,
  playDisabled,
  playKeyboard,
  playMultiple,
} from "./accordion.play";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description:
        "Values of the item(s) that should be expanded. Use when the component is controlled.",
      table: { category: "State" },
    },
    defaultValue: {
      description:
        "Values of the item(s) expanded by default. Use when the component is uncontrolled.",
      table: { category: "State" },
    },
    multiple: {
      control: "boolean",
      description: "Whether multiple items can be open at the same time.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Whether the accordion should ignore user interaction.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    hiddenUntilFound: {
      control: "boolean",
      description:
        "Allows the browser's built-in page search to find and expand collapsed panels.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    keepMounted: {
      control: "boolean",
      description: "Whether to keep closed panels mounted in the DOM.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    onValueChange: {
      description: "Fired when an item is expanded or collapsed.",
      table: { category: "Events" },
    },
    children: {
      description: "Accordion items.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={["what"]} className="w-96">
      <AccordionItem value="what">
        <AccordionTrigger>What is Shark UI?</AccordionTrigger>
        <AccordionContent>
          A component library built on Base UI and styled with Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="accessible">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          It follows the WAI-ARIA design pattern for disclosure widgets.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="customize">
        <AccordionTrigger>Can I customize it?</AccordionTrigger>
        <AccordionContent>
          Every part accepts a <code>className</code> that merges with the
          defaults.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: playDefault,
};

export const Multiple: Story = {
  render: (args) => (
    <Accordion
      {...args}
      multiple
      defaultValue={["shipping", "returns"]}
      className="w-96"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          Orders ship within two business days and arrive in 3–5 days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          Return any unused item within 30 days for a full refund.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          All products include a one-year limited warranty.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: playMultiple,
};

export const Disabled: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={["free"]} className="w-96">
      <AccordionItem value="free">
        <AccordionTrigger>Free plan</AccordionTrigger>
        <AccordionContent>
          Includes core components and community support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pro">
        <AccordionTrigger>Pro plan</AccordionTrigger>
        <AccordionContent>
          Adds priority support and advanced theming.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="enterprise" disabled>
        <AccordionTrigger>Enterprise plan</AccordionTrigger>
        <AccordionContent>
          Contact sales for enterprise pricing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: playDisabled,
};

export const KeyboardNavigation: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={["one"]} className="w-96">
      <AccordionItem value="one">
        <AccordionTrigger>Step one</AccordionTrigger>
        <AccordionContent>
          Install the package from the registry.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Step two</AccordionTrigger>
        <AccordionContent>Import the components you need.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="three">
        <AccordionTrigger>Step three</AccordionTrigger>
        <AccordionContent>Compose them into your interface.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: playKeyboard,
};
