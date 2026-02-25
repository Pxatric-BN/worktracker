import { z } from 'zod'

export const useSignInSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(256, 'Password is too long'),
   
  })

export type SignInInput = z.infer<typeof useSignInSchema>