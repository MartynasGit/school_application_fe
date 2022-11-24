import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/hotels" element={<Hotels />} /> */}
            {/* <Route path="/hotel/:id" element={<Hotel />} /> */}
            {/* <Route path="/hotel/create" element={<Hotel />} /> */}
            {/* <Route path="/countries" element={<Countries />} /> */}
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
