import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = () => {};

  return (
    <Box>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)} fullWidth>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              label="是否加密"
              control={<Switch size="small" {...register("encrypted")} />}
            />
            {watch("encrypted") ? (
              <TextField label="密码" size="small" />
            ) : null}
          </Stack>
          <TextField
            label="内容"
            multiline
            minRows={10}
            {...register("content")}
          ></TextField>
          <Stack direction="row" spacing={2}>
            <Box component='label' px={2} py={1} border='1px dashed'>
              <Typography textTransform="none">
                {watch("attachment[]")
                  ? "已附加 " + (watch("attachment[]") as FileList).length + ' 个文件'
                  : "附加文件"}
              </Typography>
              <input
                type="file"
                hidden
                {...register("attachment[]")}
                multiple
              />
            </Box>
            <Button variant="contained" size="small">保存</Button>
          </Stack>
        </Stack>
      </FormControl>
    </Box>
  );
}
