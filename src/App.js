import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Schools from "./components/Schools";
import School from "./components/School";
import ApplicationForm from "./components/ApplicationForm";
import Requests from "./components/Requests";
import Admin from "./components/Admin";

function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container py-3">
          <Routes>
            <Route path="/" element={ user ? <Schools/>: <Login/>} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/:id" element={<School />} />
            <Route path="/schools/create" element={<School />} />
            <Route path="/application/:id" element={<ApplicationForm />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/countries/:id" element={<Country />} /> */}
            {/* <Route path="/countries/create" element={<Country />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
