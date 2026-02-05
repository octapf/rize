import { useToast } from '@/contexts/ToastContext';
import axios from 'axios';

export function useToastError() {
  const toast = useToast();

  const showError = (error: any, defaultMessage = 'Algo salió mal') => {
    let message = defaultMessage;

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || defaultMessage;
    }
    // Handle custom errors
    else if (error instanceof Error) {
      message = error.message || defaultMessage;
    }
    // Handle string errors
    else if (typeof error === 'string') {
      message = error;
    }

    toast.error(message);
  };

  return { showError, toast };
}
