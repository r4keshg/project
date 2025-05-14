// hooks/use-toast.ts
import { useCallback } from 'react';

type ToastConfig = {
  title: string;
  description?: string;
  variant?: 'destructive' | 'default';
};

export function useToast() {
  const toast = useCallback((config: ToastConfig) => {
    // This basic implementation just shows an alert.
    alert(`${config.title}\n${config.description || ''}`);
  }, []);

  return { toast };
}
