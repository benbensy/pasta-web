import { useGetPasta } from "../../data/pasta";

export function Home() {
  const [pasta] = useGetPasta({
    id: "hDmx1O",
  });

  return pasta ? pasta.content : null;
}
