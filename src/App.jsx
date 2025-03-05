import "./App.css";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Trash from "./components/pages/Trash/Trash";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Layout>
  );
}

export default App;
