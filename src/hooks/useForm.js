import { useState } from 'react';

export function useForm(fields = {}) {
  const [formData, setFormData] = useState(fields);

  function handleFormData(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.type === 'range'
        ? Number(event.target.value)
        : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  }

  function resetFormData() {
    setFormData(fields);
  }

  return {
    formData,
    handleFormData,
    resetFormData,
  };
}
