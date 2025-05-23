import "./App.css";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Trash from "./components/pages/Trash/Trash";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { DashboardProvider } from "./components/pages/Dashboard/DashboardContext";

function App() {
  return (
    <DashboardProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </Layout>
    </DashboardProvider>
  );
}

export default App;
