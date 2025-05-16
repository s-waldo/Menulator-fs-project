import { useState, useRef, useEffect } from "react";
import checkCredentials from "../assets/credentials";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const LOGIN_URL = "./users/login";
export default function Login(props) {
  const { logIn, setUserInformation } = props;
  const errRef = useRef();
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [emailAddress, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    const check = checkCredentials(emailAddress, password);
    if (!check.passed) {
      setErrMsg(check.message);
      return;
    }
    try {
      const res = await axios.post(
        LOGIN_URL,
        JSON.stringify({ emailAddress, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      setUserInformation(data);
      setEmailAddress("");
      setPassword("");
      logIn();
      navigate("/");
    } catch (error) {
      if (!error.response) {
        setErrMsg("Something went wrong");
      } else if (error.response?.status === 401) {
        setErrMsg("Username or Password incorrect");
      } else if (error.response?.status === 500) {
        setErrMsg("Server not responding.  Please try again later");
      }
      return;
    }
  }
  return (
    <div className="loginContainer">
      <div className="logoDiv">
        <div className="flex row logo">
          <i className="fa-solid fa-pizza-slice" />
          <h3 className="">Menulator</h3>
        </div>
      </div>
      <form className="loginForm flex align txt center">
        <h3>Sign in to Menulator</h3>
        <h5>Enter your credentials below</h5>
        <div className="field-group">
          <label htmlFor="emailAddress" className="flex row align gap w-80">
            Email
          </label>
          <input
            type="text"
            autoFocus
            id="emailAddress"
            value={emailAddress}
            autoComplete="off"
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
        </div>
        <div className="field-group">
          <label htmlFor="password" className="flex row align gap w-80">
            Password
          </label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p ref={errRef} className="errmsg">
            {errMsg}
          </p>
        </div>

        <button type="submit" className="btn select" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p>
        New to the site? <a href="/register">Register</a>
      </p>
    </div>
  );
}

Login.propTypes;
