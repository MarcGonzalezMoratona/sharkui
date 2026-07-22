import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  playDefault,
  playKeyboardNavigation,
  playLineVariant,
  playVertical,
} from "./tabs.play";
import { Button } from "../button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card/card";
import { Input } from "../input/input";
import { Label } from "../label/label";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-account-name">Name</Label>
              <Input id="tabs-account-name" defaultValue="Marc Gonzalez" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-account-username">Username</Label>
              <Input id="tabs-account-username" defaultValue="@marcgm" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-password-current">Current password</Label>
              <Input id="tabs-password-current" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-password-new">New password</Label>
              <Input id="tabs-password-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  play: playDefault,
};

export const KeyboardNavigation: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your account details, name, and email address here.
      </TabsContent>
      <TabsContent value="password">
        Change your password and configure two-factor authentication.
      </TabsContent>
      <TabsContent value="notifications">
        Choose which email and push notifications you want to receive.
      </TabsContent>
    </Tabs>
  ),
  play: playKeyboardNavigation,
};

export const LineVariant: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="overview" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        A high-level summary of your workspace activity.
      </TabsContent>
      <TabsContent value="analytics">
        Detailed charts and metrics for the current period.
      </TabsContent>
      <TabsContent value="reports">
        Export and schedule recurring reports for your team.
      </TabsContent>
    </Tabs>
  ),
  play: playLineVariant,
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs
      {...args}
      defaultValue="general"
      orientation="vertical"
      className="w-xl"
    >
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              General workspace preferences and defaults.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Update the workspace name and default language for new members.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Sessions, devices, and access controls.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Review active sessions and revoke access from unknown devices.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Plan, payment methods, and invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Manage your subscription and download past invoices.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  play: playVertical,
};
