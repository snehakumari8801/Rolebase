import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="subadmin">Subadmin</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}