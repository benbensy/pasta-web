import { Box, Stack } from "@mui/material";
import { forwardRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export const Uploader = forwardRef<HTMLInputElement, Props>(({ name }, ref) => {
  const { control, setValue, watch } = useFormContext();
  const onDrop = useCallback(
    (files: File[]) => {
      setValue(name, files);
    },
    [name, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const files: File[] | undefined = watch(name);

  return (
    <Stack gap={1}>
      <Box {...getRootProps()} width={250} border="1px dashed" p={2}>
        <Stack>
          <Controller
            render={({ field: { onChange } }) => (
              <input ref={ref} {...getInputProps({ onChange })} multiple />
            )}
            name={name}
            control={control}
            defaultValue=""
          />
          <Box p={1}>{isDragActive ? "拖放到此处 ..." : "点击或拖拽文件上传"}</Box>
        </Stack>
      </Box>
      <Stack>
        {files?.length
          ? files.map((file, index) => (
              <Box key={file.name + index} fontSize="0.85rem" color="royalblue">
                {file.name}
              </Box>
            ))
          : null}
      </Stack>
    </Stack>
  );
});
