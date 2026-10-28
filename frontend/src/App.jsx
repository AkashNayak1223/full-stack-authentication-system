
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed.");
        return;
      }

      setMessage(data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(
        "Cannot connect to the server. Please check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Get Started</h1>
        <p>Sign up to get started</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Join Us"}
          </button>
        </form>

        {message && <p role="status">{message}</p>}

        <p className="login-text">
          Already have an account? <strong>Log in</strong>
        </p>
      </div>
    </div>
  );
}

export default App;
