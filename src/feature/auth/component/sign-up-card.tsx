'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import type { SignUpFormFields } from "@/interface/auth.interface"
import { useSignUpSchema } from "@/hooks/useSignUpSchema"

export const SignUpCard = () => {
  const schema = useSignUpSchema()

  const form = useForm<SignUpFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: SignUpFormFields) => {
    console.log(values)
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign-up</CardTitle>

        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy" className="text-blue-700 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/term" className="text-blue-700 hover:underline">
            Terms of Service
          </Link>
        </CardDescription>
      </CardHeader>

      <div className="px-7 mb-2">
        <Separator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                      autoComplete="new-password"
                      minLength={8}
                      maxLength={256}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full">
              Sign Up
            </Button>

          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <Separator />
      </div>

      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button type="button" variant="outline" size="lg" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Sign up with Google
        </Button>

        <Button type="button" variant="outline" size="lg" className="w-full">
          <FaGithub className="mr-2 size-5" />
          Sign up with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account?
          <Link href="/sign-in">
              <span className="text-blue-700">&nbsp;Sign In</span>
          </Link>
        </p>    
      </CardContent>
    </Card>
  )
}