import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function FormTextField({
  name,
  control,
  label,
  rules,
  type = "text",
  multiline = false,
  rows,
  ...textFieldProps
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const {
          ref,
          onChange,
          value,
          ...fieldProps
        } = field;

        return (
          <TextField
            {...textFieldProps}
            {...fieldProps}
            fullWidth
            inputRef={ref}
            label={label}
            type={type}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            value={value ?? ""}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message || ""}
            onChange={(event) => {
              if (type === "number") {
                const inputValue = event.target.value;

                onChange(
                  inputValue === ""
                    ? ""
                    : Number(inputValue)
                );
                return;
              }

              onChange(event);
            }}
          />
        );
      }}
    />
  );
}
