import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Uploader } from "../../components/Uploader";
import { SubmitHandler, useForm } from "react-hook-form";

export interface Fields {
  syntax: string;
  encrypted: string;
  password?: string;
  content: string;
  attachments: File[];
}

interface Props {
  defaultContent?: string;
  onSubmit: SubmitHandler<Fields>;
}

function toBool(input: string) {
  return input === "true";
}

export function PastaForm({ defaultContent, onSubmit }: Props) {
  const { register, handleSubmit, watch } = useForm<Fields>();
  const encrypted = watch("encrypted");

  return (
    <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Box>
            <FormLabel fontWeight={400}>输出格式</FormLabel>
            <Select
              defaultValue="plain"
              w={{ base: "100%", md: 165 }}
              {...register("syntax", { required: true })}
            >
              <option value="plain">纯文本</option>
              <option value="js">Javascript</option>
              <option value="jsx">Javascript react</option>
              <option value="ts">Typescript</option>
              <option value="tsx">Typescript react</option>
              <option value="py">Python</option>
              <option value="clike">C-like</option>
              <option value="css">Css</option>
              <option value="sh">Shell</option>
            </Select>
          </Box>
          <Box>
            <FormLabel fontWeight={400}>隐私性</FormLabel>
            <Select
              defaultValue="false"
              w={{ base: "100%", md: 165 }}
              {...register("encrypted", { required: true })}
            >
              <option value="false">开放</option>
              <option value="true">加密</option>
            </Select>
          </Box>
          <Box>
            <FormLabel fontWeight={400}>密码</FormLabel>
            <Input
              w={{ base: "100%", md: 165 }}
              placeholder={toBool(encrypted) ? "输入密码" : "///"}
              {...register("password", { required: toBool(encrypted) })}
              disabled={!toBool(encrypted)}
            />
          </Box>
        </Stack>
        <Stack>
          <Box>
            <FormLabel fontWeight={400}>内容</FormLabel>
            <Textarea
              defaultValue={defaultContent}
              placeholder="输入内容"
              rows={10}
              {...register("content", { required: true })}
            />
          </Box>
        </Stack>
        <Stack>
          <Stack justifyContent="space-between" direction="row">
            <Uploader {...register("attachments")} />
            <Button type="submit" px={8} colorScheme="blue" variant="solid">
              保存
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </FormControl>
  );
}
