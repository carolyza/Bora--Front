import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { MainApp } from "./components/MainApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Calendar from "./pages/Sessions";
import Theater from "./pages/Teather";
import Show from "./pages/Show";
import Lgbt from "./pages/Lgbtqia";
import Feminist from "./pages/Feminist";
import Expo from "./pages/Expo";
import Event from "./pages/Event";
import Dance from "./pages/Dance";
import BlackArt from "./pages/Blackart";
import { Balance } from "@mui/icons-material";

function App() {
  const theme = createTheme({
    palette: {
      secondary: { main: "#424445" },
      background: { default: "#FAFAFA", paper: "#FAFAFA" },
    },
  });
  const [catalogueId, setCatalogueId] = useState<any>();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />}>
            <Route
              path="/adicionar"
              element={
                <Create
                  setCatalogueId={setCatalogueId}
                  catalogueId={catalogueId}
                />
              }
            />
            <Route
              path="/sessoes"
              element={<Calendar catalogueId={catalogueId} />}
            />
            <Route path="/teatro" element={<Theater />}></Route>
            <Route path="/show" element={<Show />}></Route>
            <Route path="/lgbtqia" element={<Lgbt />}></Route>
            <Route path="/feminista" element={<Feminist />}></Route>
            <Route path="/exposicao" element={<Expo />}></Route>
            <Route path="/eventos" element={<Event />}></Route>
            <Route path="/danca" element={<Dance />}></Route>
            <Route path="/artepreta" element={<BlackArt />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
