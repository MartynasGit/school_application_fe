import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const url = process.env.REACT_APP_API_SERVER_URL + 'logout';
  const hs = {
    Accept: "application/json", Authorization: `Bearer ${token}`,
  };
  const req = { method: "POST", headers: hs };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    setUser(JSON.parse(user));
    setToken(JSON.parse(token));
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    fetch(url, req).then(
      (res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/login");
      },
      (err) => {}
    );
  };

  const getUser = () => user;
  const getToken = () => token;
  const getRole = () => user.role;
  const isAdmin = () => (user.role == "2" ? true : false);
  const getUserId = () => user.id;
  const isLoggedin = () => (user ? true : false);

  return (
    <AuthContext.Provider
      value={{ login, isLoggedin, logout, getUser, getToken, getRole, getUserId, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
