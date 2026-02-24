import { z } from 'zod'

export const useSignInSchema = () => {
  return z.object({
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(256, 'Password is too long'),
  })
}