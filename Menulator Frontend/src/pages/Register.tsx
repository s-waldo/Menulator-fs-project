import { useState, useRef, useEffect } from "react";
import checkCredentials from "../assets/credentials";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const REGISTER_URL = "/users";

export default function Login() {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [name, password, emailAddress, confirmPassword]);

  async function handleSubmit(e) {
    e.preventDefault();
    const check = checkCredentials(emailAddress, password);
    if (!name) {
      setErrMsg("Please enter your name");
      return;
    }
    if (!check.passed) {
      setErrMsg(check.message);
      return;
    }
    if (password != confirmPassword) {
      setErrMsg("Passwords must match");
      return;
    }
    let id;
    try {
      await axios
        .post(REGISTER_URL, JSON.stringify({ name, emailAddress, password }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          id = res.data._id;
        })
        .catch((err) => setErrMsg(err?.response?.data?.message));
    } catch (error) {
      if (!error.response) {
        setErrMsg("Something went wrong");
      } else if (error.response?.status === 400) {
        setErrMsg(error.response.message);
      }
    } finally {
      await axios.post(
        `/menu/${id}`,
        {
          menu: [
            {
              id: 0,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
            {
              id: 1,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
            {
              id: 2,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
            {
              id: 3,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
            {
              id: 4,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
            {
              id: 5,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
            {
              id: 6,
              breakfast: "N/A",
              lunch: "N/A",
              dinner: "N/A",
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );
      await axios.post(`/recipes/${id}`, {
        recipes: {
          breakfast: [],
          lunch: [],
          dinner: [],
          side: [],
        },
      });
      navigate("/login");
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
        <h3>Ready to join?</h3>
        <h5>Let us know about you!</h5>

        <div className="field-group">
          <label htmlFor="emailAddress" className="flex row align gap w-80">
            Name
          </label>
          <input
            type="text"
            autoFocus
            id="name"
            value={name}
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
        </div>
        <div className="field-group">
          <label htmlFor="password" className="flex row align gap w-80">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <p ref={errRef} className="errmsg">
          {errMsg}
        </p>
        <button type="submit" className="btn select" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
