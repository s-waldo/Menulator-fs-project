import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "../lib/zod.ts"

type RegisterType = {

}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
  })
  const navigate = useNavigate()


  async function onSubmit(e: RegisterType) {
    console.log(e)
    navigate('/login')
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
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm flex align txt center">
        <h3>Ready to join?</h3>
        <h5>Let us know about you!</h5>

        <div className="field-group">
          <label htmlFor="emailAddress" className="flex row align gap w-80">
            Name
          </label>
          <input
            type="text"
            {...register('name')}
          />
          {errors.name && <p className="errmsg">{errors.name.message}</p>}
        
        </div>
        <div className="field-group">
          <label htmlFor="emailAddress" className="flex row align gap w-80">
            Email
          </label>
          <input
            type="text"
            {...register('email')}
          />
          {errors.email && <p className="errmsg">{errors.email.message}</p>}
        
        </div>
        <div className="field-group">
          <label htmlFor="password" className="flex row align gap w-80">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
          />
          {errors.password && <p className="errmsg">{errors.password.message}</p>}
        
        </div>
        <div className="field-group">
          <label htmlFor="password" className="flex row align gap w-80">
            Confirm Password
          </label>
          <input
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="errmsg">{errors.confirmPassword.message}</p>}
        
        </div>
        {errors.root && <p className="errmsg">{errors.root.message}</p>}
        <button type="submit" className="btn select">
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  )
}
