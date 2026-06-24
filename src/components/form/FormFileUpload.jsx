import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function FormFileUpload({
  name,
  control,
  label,
  rules,
  accept,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth
          error={Boolean(fieldState.error)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
            >
              {label}

              <input
                hidden
                type="file"
                accept={accept}
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={(event) => {
                  const selectedFile =
                    event.target.files?.[0] || null;

                  field.onChange(selectedFile);
                }}
              />
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {field.value?.name || "No file selected"}
            </Typography>
          </Box>

          <FormHelperText>
            {fieldState.error?.message || ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
