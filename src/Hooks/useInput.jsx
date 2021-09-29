import { useState } from 'react';

export default function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  return {
    bind: { value, onChange },
    value,
  };
}
