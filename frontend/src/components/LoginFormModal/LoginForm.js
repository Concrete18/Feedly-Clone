import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/collection" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="auth_modal">
          <h1>Log In</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="user_auth_form">
            <input
              type="text"
              placeholder="Username or Email Address"
              className=" auth_input"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className=" auth_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth_submit_button" type="submit">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
