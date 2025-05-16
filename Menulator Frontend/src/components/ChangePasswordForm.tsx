import { useRef, useState } from "react";
import axios from "../../api/axios";
import { checkPasswordLength, checkPasswordRules } from "../assets/credentials";

export default function ChangePasswordForm(props) {
  const { userInformation } = props;
  const oldPassword = useRef();
  const newPassword = useRef();
  const passwordConfirm = useRef();
  const [msg, setMsg] = useState("");

  function changeMsg(msg) {
    setMsg(msg);
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }
  async function changePassword(e) {
    e.preventDefault();
    if (newPassword.current.value !== passwordConfirm.current.value) {
      changeMsg("Passwords do not match");
      return;
    }
    if (!checkPasswordLength(newPassword.current.value)) {
      changeMsg("Password must be between 8-16 characters");
      return;
    }
    if (!checkPasswordRules(newPassword.current.value)) {
      changeMsg(
        "Password must include at least one lower, one upper, one number, and one special character"
      );
    }
    try {
      const res = await axios.patch(
        `/users/password/${userInformation._id}`,
        {
          password: oldPassword.current.value,
          newPassword: newPassword.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      changeMsg(res.data.message);
    } catch (error) {
      console.error(error);
      changeMsg(error?.response?.data?.message);
    } finally {
      oldPassword.current.value = "";
      newPassword.current.value = "";
      passwordConfirm.current.value = "";
    }
  }

  return (
    <div className="settings">
      <h3>Change Password</h3>
      <form className="rightPane flex">
        <input
          type="password"
          id="oldPassword"
          ref={oldPassword}
          placeholder="Old Password"
        />
        <input
          type="password"
          id="newPassword"
          ref={newPassword}
          placeholder="New Password"
        />
        <input
          type="password"
          id="passwordConfirm"
          ref={passwordConfirm}
          placeholder="Confirm New Password"
        />

        <button className="save btn select" onClick={changePassword}>
          <p>Update</p>
        </button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
