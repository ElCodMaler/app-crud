import { type JSX, useEffect, useState } from 'react';
import { Alert as FlowbiteAlert } from 'flowbite-react';

interface CustomAlertProps {
  variant?: 'info' | 'success' | 'failure';
  visible?: boolean;
  children: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

const variantColors = {
  info: 'blue',
  success: 'green',
  failure: 'red'
} as const;

export const Alerts = ({
  variant = 'info',
  visible = false,
  children,
  duration = 4000,
  onClose
}: CustomAlertProps): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(visible);
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setShouldRender(true);
      
      // Auto-ocultar después de la duración
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShouldRender(false);
          onClose?.();
        }, 500); // Esperar a que termine la animación
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!shouldRender) return null;

  const alertClasses = `w-full max-w-md transition-all duration-500 ease-in-out fixed bottom-3 left-1/2 transform -translate-x-1/2 ${
    isVisible 
      ? 'translate-y-0 opacity-100' 
      : 'translate-y-full opacity-0'
  }`;

  return (
    <div className={alertClasses}>
      <FlowbiteAlert 
        color={variantColors[variant]} 
        className='rounded-lg text-base p-4 shadow-lg'
      >
        <strong className="capitalize text-xl mr-1.5">{variant}</strong> 
        {children}
      </FlowbiteAlert>
    </div>
  );
};
