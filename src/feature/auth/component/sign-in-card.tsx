'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Typewriter } from 'react-simple-typewriter'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import type { SignInFormFields } from '@/interface/auth.interface'
import { useSignInSchema } from '@/hooks/useSignInSchema'
import Link from 'next/link'
import { useLogin } from '../api/use-login'

export const SignInCard = () => {
  const { mutate,isPending } = useLogin();
  const formSchema = useSignInSchema

  const formHook = useForm<SignInFormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: SignInFormFields) => {
    mutate({ json:values });
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          <Typewriter
            words={['Welcome back!']}
            loop={0}             
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </CardTitle>
      </CardHeader>

      <div className="px-7 mb-2">
        <Separator />
      </div>

      <CardContent className="p-7">
        <Form {...formHook}>
          <form onSubmit={formHook.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={formHook.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />

            
            <FormField
              control={formHook.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      minLength={8}
                      maxLength={256}
                    />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <Separator />
      </div>

      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button disabled={isPending} type="button" variant="outline" size="lg" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>

        <Button disabled={isPending} type="button" variant="outline" size="lg" className="w-full">
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up">
              <span className="text-blue-700">&nbsp;Sign Up</span>
          </Link>
        </p>    
      </CardContent>
    </Card>
  )
}