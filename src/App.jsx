import { Login } from "./Login";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
