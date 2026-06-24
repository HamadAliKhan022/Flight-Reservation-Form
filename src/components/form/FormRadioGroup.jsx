import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function FormRadioGroup({
  name,
  control,
  label,
  options = [],
  rules,
  row = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl error={Boolean(fieldState.error)}>
          <FormLabel>{label}</FormLabel>

          <RadioGroup
            row={row}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <FormHelperText>
            {fieldState.error?.message || ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
