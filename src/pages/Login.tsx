import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://frontend-take-home.fetch.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }

      window.location.href = "/search"; // ✅ Redirect on success
    } catch (error) {
      console.error("Login error:", error);
      
      // ✅ Fix: Explicitly cast `error` as an Error object
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
