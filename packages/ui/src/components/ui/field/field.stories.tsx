import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field";
import {
  playDefault,
  playFieldGroup,
  playFieldSet,
  playHorizontalWithControl,
  playWithError,
  playWithTitle,
} from "./field.play";
import { Input } from "../input/input";
import { Textarea } from "../textarea/textarea";
import { Switch } from "../switch/switch";

const meta = {
  title: "Components/Field",
  component: Field,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
      description: "Layout orientation of the field and its control.",
      table: { category: "Appearance" },
    },
    children: {
      description: "Field label, control, description, and error content.",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="you@example.com" />
        <FieldDescription>
          We&apos;ll never share your email with anyone else.
        </FieldDescription>
      </Field>
    </div>
  ),
  play: playDefault,
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field data-invalid="true">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" aria-invalid defaultValue="123" />
        <FieldError
          errors={[{ message: "Password must be at least 8 characters." }]}
        />
      </Field>
    </div>
  ),
  play: playWithError,
};

export const HorizontalWithControl: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
          <FieldDescription>
            Receive email updates about your account activity.
          </FieldDescription>
        </FieldContent>
        <Switch id="notifications" defaultChecked />
      </Field>
    </div>
  ),
  play: playHorizontalWithControl,
};

export const FieldGroupExample: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">Full name</FieldLabel>
          <Input id="fullName" placeholder="Ada Lovelace" />
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" placeholder="ada" />
          <FieldDescription>This will be your public handle.</FieldDescription>
        </Field>
        <FieldSeparator>Optional</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </Field>
      </FieldGroup>
    </div>
  ),
  play: playFieldGroup,
};

export const FieldSetExample: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <FieldSet>
        <FieldLegend>Shipping address</FieldLegend>
        <FieldDescription>Where should we send your order?</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street</FieldLabel>
            <Input id="street" placeholder="123 Main St" />
          </Field>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" placeholder="Barcelona" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
  play: playFieldSet,
};

export const WithTitle: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Marketing emails</FieldTitle>
          <FieldDescription>
            Receive tips, product updates, and offers.
          </FieldDescription>
        </FieldContent>
        <Switch id="marketing" aria-label="Marketing emails" />
      </Field>
    </div>
  ),
  play: playWithTitle,
};
