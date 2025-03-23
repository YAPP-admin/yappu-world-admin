import { Controller, useFormContext } from 'react-hook-form';
import { forwardRef } from 'react';
import Radio from './Radio';

interface RadioGroupProps {
  name: string;
  options: string[];
}

const RadioGroup = ({ name, options }: RadioGroupProps) => {
  const { control } = useFormContext();

  return (
    <div id="radio-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {options.map((option) => (
              <Radio
                key={option}
                value={option}
                checked={field.value === option}
                onChange={() => field.onChange(option)}
              />
            ))}
          </>
        )}
      />
    </div>
  );
};

export default RadioGroup;
