import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string({required_error: 'Password is required'}).min(1, {message: "Required Field"})
})

export const RegisterSchema = z.object({
  name: z.string().min(3, "Required Field"),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((password) => /[A-Z]/.test(password),{
      message: 'Must have an uppercase letter'
    })
    .refine(password=> /[a-z]/.test(password), {
      message: 'Must have a lowercase letter'
    })
    .refine(password=> /[0-9]/.test(password), {
      message: 'Must have a number'
    })
    .refine(password=> /[!@#$%^&*]/.test(password), {
      message: 'Must have a special character'
    }),
  confirmPassword: z.string({required_error: 'Required'})
}).refine(values => values.password === values.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})
