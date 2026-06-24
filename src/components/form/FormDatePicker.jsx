import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function FormDatePicker({
  name,
  control,
  label,
  rules,
  minDate,
  disablePast = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          value={field.value ?? null}
          minDate={minDate}
          disablePast={disablePast}
          format="DD/MM/YYYY"
          onChange={(newValue) => field.onChange(newValue)}
          onClose={field.onBlur}
          slotProps={{
            textField: {
              fullWidth: true,
              required: Boolean(rules?.required),
              error: Boolean(fieldState.error),
              helperText: fieldState.error?.message || "",
              onBlur: field.onBlur,
            },
          }}
        />
      )}
    />
  );
}
