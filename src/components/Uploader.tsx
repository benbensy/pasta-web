import {
  Badge,
  Box,
  InputProps,
  Stack,
  VisuallyHiddenInput,
  forwardRef,
} from "@chakra-ui/react";
import { useState } from "react";

export const Uploader = forwardRef<InputProps, "input">((props, ref) => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  return (
    <Stack spacing={2}>
      <Box as={"label"} border="1px dashed" w={180}>
        <Box p={2} textAlign="center">点击选择上传文件</Box>
        <VisuallyHiddenInput
          type="file"
          multiple
          ref={ref}
          {...{
            ...props,
            onChange: (ev) => {
              setFileList(ev.currentTarget.files);
              props.onChange?.(ev);
            },
          }}
        />
      </Box>
      <Stack spacing={2}>
        {fileList
          ? Array.from(fileList).map((file, index) => (
              <Badge w={180} textOverflow='ellipsis' overflow='hidden' key={index} textTransform='none'>{file.name}</Badge>
            ))
          : null}
      </Stack>
    </Stack>
  );
});
