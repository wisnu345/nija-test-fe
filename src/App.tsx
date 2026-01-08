import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import PokemonListPage from "./pages/PokemonListPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* default redirect */}
        <Route path="/" element={<Navigate to="/wiki" replace />} />

        {/* wiki page */}
        <Route path="/wiki" element={<PokemonListPage />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
