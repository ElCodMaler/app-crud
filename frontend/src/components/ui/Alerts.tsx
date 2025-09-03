import { Alert as FlowbiteAlert } from 'flowbite-react';
import { useEffect, type JSX, type ReactNode } from 'react';

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

export const Alerts = ({variant = 'info',visible=false ,children}: CustomAlertProps): JSX.Element => {
  let alertVisable = visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0';
  useEffect(() => {
    if(visible){
      alertVisable = 'translate-y-0 opacity-100';
    } else {
      alertVisable = 'translate-y-full opacity-0';
    }
  },[4000]);
  return (
    <div className={`w-full max-w-md ${alertVisable} transition-opacity duration-400 ease-in fixed bottom-3 text-center`}>
      <FlowbiteAlert color={variantColors[variant]} className='rounded-lg text-base p-4'>
        <strong className="capitalize text-xl mr-1.5">{variant}</strong> {children}
      </FlowbiteAlert>
    </div>
  );
};
