import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Uploader } from "../components/Uploader";
import { useNavigate, useLocation } from "react-router-dom";
import { getPasta, uploadPasta } from "../data/pasta";
import { useEffect, useState } from "react";

interface Inputs {
  encrypted: boolean;
  password?: string;
  content: string;
  syntax: string;
  reference?: string;
  attachments?: File[];
}

export function Home() {
  const form = useForm<Inputs>();
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultContent, setDefaultContent] = useState("");
  const searchQuery = new URLSearchParams(location.search);
  const forkId = searchQuery.get("fork");

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (forkId) {
      (async () => {
        const { content } = await getPasta(forkId);
        setDefaultContent(content);
      })();
    }
  }, [forkId, location.search]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    encrypted,
    password,
    content,
    attachments,
    syntax,
  }: Inputs) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("encrypted", `${encrypted}`);
    if (encrypted) {
      formData.append("password", password!);
    }
    attachments?.forEach((file) => {
      formData.append("attachments[]", file);
    });
    formData.append("syntax", syntax);
    if (forkId) {
      formData.append("reference", forkId);
    }
    const responseData = await uploadPasta(formData);
    navigate("/preview/" + responseData.id);
  };

  return (
    <Box>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Box>
                <Select defaultValue={"plain"} {...form.register("syntax")}>
                  <MenuItem value="plain">Plain Text</MenuItem>
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="typescript">TypeScript</MenuItem>
                </Select>
              </Box>
              <FormControlLabel
                label="是否加密"
                control={
                  <Switch size="small" {...form.register("encrypted")} />
                }
              />
              {form.watch("encrypted") ? (
                <TextField
                  {...form.register("password", {
                    required: form.watch("encrypted") ? true : false,
                  })}
                  label="密码"
                  size="small"
                />
              ) : null}
            </Stack>
            <TextField
              multiline
              minRows={10}
              {...form.register("content", { required: true })}
              placeholder="填写内容"
              defaultValue={defaultContent}
            ></TextField>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Uploader {...form.register("attachments")} />
              <Box>
                <Button type="submit" variant="contained">
                  保存
                </Button>
              </Box>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
      <Snackbar open={showMessage} />
    </Box>
  );
}
