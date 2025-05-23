import type { ZodIssue } from "zod"
import type { UserType } from "./types"
import { LoginSchema } from "./zod"

type LoginReturnType = {
  success?: boolean
  errors?: ZodIssue[] | 'Server Error' | "Not allowed"
  data?: UserType
}

export async function login(user: {
  email: string
  password: string
}): Promise<LoginReturnType> {
  const result = LoginSchema.safeParse(user)
  if (!result.success) {
    return { errors: result.error.issues }
  }
  try {
    const response = await fetch(`http://localhost:3000/users/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 404) {
      return {errors: "Not allowed"}
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { errors: "Server Error"}
  }
}
