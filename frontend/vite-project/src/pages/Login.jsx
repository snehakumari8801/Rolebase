import { useState } from "react";
import API, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    setAuthToken(res.data.token);
    nav("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}