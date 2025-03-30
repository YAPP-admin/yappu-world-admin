import { Controller, useFormContext } from 'react-hook-form';

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
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {options.map((option) => (
              <Radio
                key={option}
                checked={field.value === option}
                value={option}
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
