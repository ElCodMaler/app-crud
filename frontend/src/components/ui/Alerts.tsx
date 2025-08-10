import { Alert as FlowbiteAlert } from 'flowbite-react';
import type { JSX, ReactNode } from 'react';

type CustomAlertProps = {
  variant?: 'info' | 'success' | 'warning' | 'error';
  visible: boolean;
  className?: string;
  children: ReactNode;
};

const variantColors = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

export const Alerts = ({variant = 'info',visible=false ,className ,children}: CustomAlertProps): JSX.Element => {
  const alertVisable = visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0';
  return (
    <div className={`w-full max-w-md ${alertVisable} transition-all duration-400 ease-in ${className}`}>
      <FlowbiteAlert color={variantColors[variant]} className='rounded-lg text-base p-4'>
        <strong className="text-transform: capitalize text-xl">{variant}</strong> {children}
      </FlowbiteAlert>
    </div>
  );
};
