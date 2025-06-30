import React from 'react';
import { useField } from 'formik';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: 'small' | 'medium' | 'large';
};

export const TextInput: React.FC<TextInputProps> = ({ inputSize = 'large', ...props }) => {
  const [field, meta] = useField(props.name as string);

  const sizeClasses =
    inputSize === 'small'
      ? 'py-1 px-2 text-sm'
      : inputSize === 'medium'
      ? 'py-2 px-3 text-base'
      : 'py-3 px-4 text-lg';

  return (
    <div>
      <input
        {...field}
        {...props}
        className={`block w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white dark:bg-neutral-900 dark:text-gray-100 dark:border-neutral-700 ${sizeClasses} ${props.className ?? ''}`}
      />
      {meta.touched && meta.error ? (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
