import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import {CSSReset} from '@chakra-ui/react'
import { BaseLayout } from "./layouts/BaseLayout";
import { Home } from "./pages/Home/Home";
import { Preview } from "./pages/Preview/Preview";
import { List } from "./pages/List/List";

export default function App() {
  return (
    <ChakraBaseProvider>
      <CSSReset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/list" element={<List />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}
