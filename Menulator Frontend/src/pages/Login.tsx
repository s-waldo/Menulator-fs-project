import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "../lib/zod.ts"


type LoginFormType = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema), mode: "onTouched" })

  async function onSubmit(e: LoginFormType)  {
    console.log(e, typeof e)
    navigate("/")
    return
  }

  return (
    <div className="loginContainer">
      <div className="logoDiv">
        <div className="flex row logo">
          <i className="fa-solid fa-pizza-slice" />
          <h3 className="">Menulator</h3>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="loginForm flex align txt center"
      >
        <h3>Sign in to Menulator</h3>
        <h5>Enter your credentials below</h5>
        <div className="field-group">
          <label htmlFor="emailAddress" className="flex row align gap w-80">
            Email
          </label>
          <input {...register("email")} type="email" />
          {errors.email && <p className="errmsg">{errors.email.message}</p>}
        </div>
        <div className="field-group">
          <label htmlFor="password" className="flex row align gap w-80">
            Password
          </label>

          <input type="password" {...register("password")} />
          {errors.password && <p className="errmsg">{errors.password.message}</p>}
        </div>
        {errors.root && <p className="errmsg">{errors.root.message}</p>}
        <button type="submit" className="btn select">
          Login
        </button>
      </form>
      <p>
        New to the site? <a href="/register">Register</a>
      </p>
    </div>
  )
}
