import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Shared/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Введите текст",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Имя пользователя",
    placeholder: "Введите имя",
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "example@email.com",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Пароль",
    type: "password",
    placeholder: "Введите пароль",
    error: "Пароль должен содержать минимум 8 символов",
  },
};

export const Disabled: Story = {
  args: {
    label: "Отключенное поле",
    placeholder: "Это поле отключено",
    disabled: true,
  },
};

export const Number: Story = {
  args: {
    label: "Возраст",
    type: "number",
    placeholder: "Введите возраст",
    min: 0,
    max: 120,
  },
};

export const Tel: Story = {
  args: {
    label: "Телефон",
    type: "tel",
    placeholder: "+7 (999) 123-45-67",
  },
};

export const Url: Story = {
  args: {
    label: "Веб-сайт",
    type: "url",
    placeholder: "https://example.com",
  },
};
