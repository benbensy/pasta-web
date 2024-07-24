import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  StyleFunctionProps,
} from "@chakra-ui/react";
import { CSSReset } from "@chakra-ui/react";
import { BaseLayout } from "./layouts/BaseLayout";
import { Home } from "./pages/Home/Home";
import { Preview } from "./pages/Preview/Preview";
import { List } from "./pages/List";
import { mode } from "@chakra-ui/theme-tools";
import { History } from "./pages/History";
import { Guide } from "./pages/Guide";

export default function App() {
  const theme = extendTheme({
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          fontFamily: "body",
          color: mode("gray.600", "whiteAlpha.800")(props),
          bg: mode("white", "gray.600")(props),
          lineHeight: "base",
        },
      }),
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="/preview/:id" element={<Preview />} />
            <Route path="/list" element={<List />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
