import React from "react";
import { createRoot } from "react-dom/client";
import RankingsRoot from "./pages/RankingsRoot";
import { BrowserRouter, Routes, Route } from "react-router";
import PlayerDetailsPage from "./pages/PlayerDetailsPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RankingsRoot />} />
        <Route
          path="/player-details/:playerIdentifier"
          element={<PlayerDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
