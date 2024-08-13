import { useState, useRef } from "react";
import axios from "../../api/axios";
import { Image } from "cloudinary-react";
import ChangePasswordForm from "../componenets/ChangePasswordForm";

// IN DEVELOPMENT
// API to backend to connect with user profile's

export default function Settings(props) {
  const { userInformation, updateUser } = props;
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const errStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: ".8rem",
  };

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    previewFile(file);
  }

  async function uploadAvatar(e) {
    e.preventDefault();
    let data;
    if (!avatar) return;
    console.log(avatar);
    await axios
      .patch(
        `/users/avatar/${
          JSON.parse(window.localStorage.getItem("userInfo"))?._id
        }`,
        {
          avatar,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => (data = res.data))
      .catch((err) => console.error(err.message));
    updateUser(data);
    window.location.reload();
  }

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
  }
  async function updateSettings(e) {
    e.preventDefault();
    let data;
    await axios
      .patch(
        `/users/${JSON.parse(window.localStorage.getItem("userInfo"))?._id}`,
        {
          name: name === "" ? null : name,
          emailAddress: emailAddress === "" ? null : emailAddress,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => (data = res.data))
      .catch((err) => console.log(err.message));
    updateUser(data);
    window.location.reload();
  }

  return (
    <div className="container">
      <div className="menuDiv flex align">
        <div className="pageTitle">
          <h1>
            MY <span>SETTINGS</span>
          </h1>
        </div>
        {userInformation && (
          <div className="settings w-80 flex row">
            <div className="leftPane flex justify-b">
              <h1>Profile</h1>
              <div>
                <Image
                  cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
                  publicId={userInformation.avatar}
                  width="150px"
                />
              </div>
            </div>
            <form action="" className="rightPane flex">
              <h3>Name</h3>
              <input
                type="text"
                id="name"
                placeholder={userInformation.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="on"
              />
              <h3>Email</h3>
              <input
                type="email"
                id="email"
                placeholder={userInformation.emailAddress}
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                autoComplete="on"
              />
              <h3>Upload new Profile Picture</h3>
              <div className="flex row">
                <input
                  type="file"
                  id="avatar"
                  onChange={handleFileInputChange}
                />
                {avatar && (
                  <button
                    className="save btn select flex align"
                    onClick={uploadAvatar}
                  >
                    Upload File
                  </button>
                )}
              </div>
              <p ref={errRef} style={errStyle}>
                {errMsg}
              </p>
              <button className="save btn select" onClick={updateSettings}>
                <p>Save</p>
              </button>
            </form>
          </div>
        )}
        <ChangePasswordForm userInformation={userInformation}/>
      </div>
    </div>
  );
}
Settings.propTypes