import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main } from "../Pages/Main";
import { Chat } from "../Pages/Chat";

export const AppRoutes = () => {
  return (
    <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/chat" element={<Chat />} />    
    </Routes>
  );
};
