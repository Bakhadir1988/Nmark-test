import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Состояние чекбокса",
    },
    label: {
      control: { type: "text" },
      description: "Текст метки",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Отключен ли чекбокс",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Размер чекбокса",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "success", "warning", "error"],
      description: "Вариант цвета",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Обертка для управления состоянием
const CheckboxWrapper = (args: React.ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState(args.checked || false);

  return (
    <div style={{ padding: "20px" }}>
      <Checkbox {...args} checked={checked} onChange={setChecked} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    label: "Принять условия использования",
  },
};

export const Checked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: true,
    label: "Подписаться на рассылку",
  },
};

export const Small: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    label: "Маленький чекбокс",
    size: "small",
  },
};

export const Large: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    label: "Большой чекбокс",
    size: "large",
  },
};

export const Success: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: true,
    label: "Задача выполнена",
    variant: "success",
  },
};

export const Warning: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    label: "Требует внимания",
    variant: "warning",
  },
};

export const Error: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    label: "Критическая ошибка",
    variant: "error",
  },
};

export const Disabled: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    label: "Отключенный чекбокс",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: true,
    label: "Отключенный отмеченный чекбокс",
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [checkboxes, setCheckboxes] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    const handleChange = (key: string, value: boolean) => {
      setCheckboxes((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Checkbox
          checked={checkboxes.option1}
          onChange={(value) => handleChange("option1", value)}
          label="Опция 1"
        />
        <Checkbox
          checked={checkboxes.option2}
          onChange={(value) => handleChange("option2", value)}
          label="Опция 2"
          variant="success"
        />
        <Checkbox
          checked={checkboxes.option3}
          onChange={(value) => handleChange("option3", value)}
          label="Опция 3"
          variant="warning"
        />
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <strong>Состояние:</strong>
          <pre>{JSON.stringify(checkboxes, null, 2)}</pre>
        </div>
      </div>
    );
  },
};
