import { Alert as FlowbiteAlert } from 'flowbite-react';
import { type ReactNode } from 'react';

type CustomAlertProps = {
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
  children: ReactNode;
};

const variantColors = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

export const Alerts = ({variant = 'info',className ,children}: CustomAlertProps) => {
  return (
    <FlowbiteAlert color={variantColors[variant]} className={`rounded-lg ${className}`}>
      {children}
    </FlowbiteAlert>
  );
};
