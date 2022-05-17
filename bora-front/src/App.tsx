import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import { MainApp } from "./components/MainApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Calendar from "./pages/Calendar";

function App() {
  const theme = createTheme({
    palette: {
      secondary: { main: "#424445" },
      background: { default: "#FAFAFA", paper: "#FAFAFA" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />}>
            <Route path="/adicionar" element={<Create />} />
          </Route>

          <Route path="/datas" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
