import { useState } from 'react';
import { LoginParams } from '@/api/api'

interface UseAuthFormReturn {
  state: LoginParams;
  handleChange:(value: string, field: string) => void
}


const useInput = (initialState:LoginParams):UseAuthFormReturn => {
  const [state, setState] = useState<LoginParams>(initialState);

  const handleChange: {
    (value: string, field: string): void;
  } = (valueOrEvent: string,field:string) => {
    setState(prevState => ({
        ...prevState,
        [field]: valueOrEvent,
      }));
  };

  return {
    state,
    handleChange,
  };
};

export default useInput;