'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = {
  label?: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          ref={ref}
          className={clsx('input input-bordered border-primary w-full', className, {
            'input-error': !!error,
          })}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
