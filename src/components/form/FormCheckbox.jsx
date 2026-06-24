import { Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

export default function FormCheckbox({
  name,
  control,
  label,
  rules,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl error={Boolean(fieldState.error)}>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                checked={Boolean(field.value)}
                onChange={(event) =>
                  field.onChange(event.target.checked)
                }
                onBlur={field.onBlur}
                inputRef={field.ref}
              />
            }
          />

          <FormHelperText>
            {fieldState.error?.message || ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
