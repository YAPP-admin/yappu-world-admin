import { Controller, useFormContext } from 'react-hook-form';

import Radio from './Radio';
import { OptionType } from './Select';

interface RadioGroupProps {
  name: string;
  options: OptionType[];
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
                key={option.value}
                checked={field.value === option.value}
                value={option.label}
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
