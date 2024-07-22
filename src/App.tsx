import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { BaseLayout } from "./layouts/BaseLayout";
import { Home } from "./pages/Home";
import { Preview } from "./pages/Preview";
import { List } from "./pages/List";

export default function App() {
  return (
    <>
      <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Home />} />
              <Route path="/preview/:id" element={<Preview />} />
              <Route path="/list" element={<List />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}
