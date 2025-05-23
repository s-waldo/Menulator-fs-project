import { useState } from "react"
import axios from "../../api/axios.ts"
import { Image } from "cloudinary-react"
import ChangePasswordForm from "../components/ChangePasswordForm"
import { useStore } from "zustand"
import { UserStore } from "../lib/zustand.setup.ts"

// IN DEVELOPMENT
// API to backend to connect with user profile's

export default function Settings() {
  const [errMsg] = useState("")
  const user = useStore(UserStore)

  const errStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: ".8rem",
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    previewFile(file)
  }

  async function uploadAvatar(e) {
    e.preventDefault()
    let data
    if (!avatar) return
    console.log(avatar)
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
      .catch((err) => console.error(err.message))
    updateUser(data)
    window.location.reload()
  }

  function previewFile(file: Blob) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setAvatar(reader.result)
    }
  }
  async function updateSettings(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    let data
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
      .catch((err) => console.log(err.message))
    updateUser(data)
    window.location.reload()
  }

  return (
    <div className="container">
      <div className="menuDiv flex align">
        <div className="pageTitle">
          <h1>
            MY <span>SETTINGS</span>
          </h1>
        </div>

        <div className="settings w-80 flex row">
          <div className="leftPane flex justify-b">
            <h1>Profile</h1>
            <div>
              <Image
                cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
                publicId={user.avatar}
                width="150px"
              />
            </div>
          </div>
          <form action="" className="rightPane flex">
            <h3>Name</h3>
            <input
              type="text"
              id="name"
              placeholder={user.name}
              autoComplete="on"
            />
            <h3>Email</h3>
            <input
              type="email"
              id="email"
              placeholder={user.email}
              autoComplete="on"
            />
            <h3>Change Profile Picture</h3>
            <div className="flex row">
              <input type="file" id="avatar" onChange={handleFileInputChange} />
              {user.avatar && (
                <button
                  className="save btn select flex align"
                  onClick={uploadAvatar}
                >
                  Upload File
                </button>
              )}
            </div>
            <p style={errStyle}>{errMsg}</p>
            <button className="save btn select" onClick={updateSettings}>
              <p>Save</p>
            </button>
          </form>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  )
}
