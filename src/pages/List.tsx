import {
  Box,
  Button,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { usePastaList } from "../data/pasta";
import { NavLink } from "react-router-dom";

export function List() {
  const { data, error } = usePastaList();

  const toast = useToast();
  const copy = (text: string) => async () => {
    await navigator.clipboard.writeText(text);
    toast({ title: "复制成功" });
  };

  if (error) throw error;

  return data ? (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>创建时间</Th>
            <Th>隐私性</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>
                <Link color="blue.500" as={NavLink} to={`/preview/${row.id}`}>
                  {row.id}
                </Link>
              </Td>
              <Td>{row.created}</Td>
              <Td>{row.encrypted ? "私密" : "开放"}</Td>
              <Td>
                <Button
                  size="sm"
                  onClick={copy(`${window.location.origin}/preview/${row.id}`)}
                >
                  复制链接
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Box>加载内容中</Box>
  );
}
