import { Controller } from "react-hook-form";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

export default function FormSelect({
  name,
  control,
  label,
  options = [],
  rules,
  multiple = false,
}) {
  const labelId = `${name}-label`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const selectedValue =
          field.value ?? (multiple ? [] : "");

        return (
          <FormControl
            fullWidth
            error={Boolean(fieldState.error)}
          >
            <InputLabel id={labelId}>{label}</InputLabel>

            <Select
              labelId={labelId}
              label={label}
              multiple={multiple}
              value={selectedValue}
              onChange={(event) =>
                field.onChange(event.target.value)
              }
              onBlur={field.onBlur}
              inputRef={field.ref}
              renderValue={
                multiple
                  ? (selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {selected.map((value) => {
                          const selectedOption = options.find(
                            (option) => option.value === value
                          );

                          return (
                            <Chip
                              key={value}
                              label={
                                selectedOption?.label || value
                              }
                              size="small"
                            />
                          );
                        })}
                      </Box>
                    )
                  : undefined
              }
            >
              {!multiple && (
                <MenuItem value="">
                  <em>Select an option</em>
                </MenuItem>
              )}

              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {multiple && (
                    <Checkbox
                      checked={selectedValue.includes(
                        option.value
                      )}
                    />
                  )}

                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {fieldState.error?.message || ""}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
