import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar";
import {
  playDefault,
  playFallback,
  playGroup,
  playSizes,
  playWithStatusBadge,
} from "./avatar.play";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const IMAGE_SRC = "https://avatars.githubusercontent.com/u/80526953?v=4";

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={IMAGE_SRC} alt="Marc Gonzalez" />
      <AvatarFallback>MG</AvatarFallback>
    </Avatar>
  ),
  play: playDefault,
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://broken.example/does-not-exist.png"
        alt="Marc Gonzalez"
      />
      <AvatarFallback>MG</AvatarFallback>
    </Avatar>
  ),
  play: playFallback,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar size="sm">
        <AvatarImage src={IMAGE_SRC} alt="Marc Gonzalez" />
        <AvatarFallback>MG</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarImage src={IMAGE_SRC} alt="Marc Gonzalez" />
        <AvatarFallback>MG</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={IMAGE_SRC} alt="Marc Gonzalez" />
        <AvatarFallback>MG</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: playSizes,
};

export const WithStatusBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={IMAGE_SRC} alt="Marc Gonzalez" />
      <AvatarFallback>MG</AvatarFallback>
      <AvatarBadge className="bg-green-500" />
    </Avatar>
  ),
  play: playWithStatusBadge,
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User 1" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User 2" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User 3" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
  play: playGroup,
};
