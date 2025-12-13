'use client'

import { useForm } from "@tanstack/react-form"
import z from 'zod'

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { Button, buttonVariants } from "@/src/components/ui/button"
import Link from "next/link"
import { Spinner } from "@/src/components/ui/spinner"
import { useRegister } from "../hooks/use-register"
import { Checkbox } from "@/src/components/ui/checkbox"

const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),
    email: z
        .email()
        .min(1, "Email is required"),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Please confirm your password' }),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

const RegisterForm = ({ }) => {


    const { mutate: registerUser, isPending } = useRegister();


    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: '',
            agreeTerms: false
        },
        validators: {
            onSubmit: registerSchema,
        },
        onSubmit: ({ value }) => {

            registerUser({
                email: value.email,
                name: value.name,
                password: value.password,
            });


        },


    })

    return <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
        }}
    >

        <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Create new account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to register to your account
                </p>
            </div>
            <form.Field name="name">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="Name"
                                autoComplete="name"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="email">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="Email Address"
                                autoComplete="email"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="password">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                type="password"
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="Password"
                                autoComplete="new-password"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>
            <form.Field name="confirmPassword">
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                type="password"
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}

            </form.Field>
            <form.Field
                name="agreeTerms"
            >
                {(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field className="" data-invalid={isInvalid}>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={`agree-terms`}
                                    name={field.name}
                                    checked={field.state.value}
                                    onCheckedChange={(checked) =>
                                        field.handleChange(checked === true)
                                    }
                                />
                                <FieldLabel
                                    htmlFor={`agree-terms`}
                                    className="font-normal"
                                >
                                    I agree to the{" "}
                                    <Link

                                        className={buttonVariants({ className: "underline underline-offset-4", variant: 'link', size: "sm" })}
                                        href="/terms"

                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className={buttonVariants({ className: "underline underline-offset-4", variant: 'link', size: "sm" })}
                                    >
                                        Privacy Policy
                                    </Link>
                                </FieldLabel>
                            </div>

                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    )
                }}
            </form.Field>

            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting, isPending]}
            >
                {([canSubmit, isSubmitting, isPending]) => (
                    <Button type="submit" disabled={!canSubmit || isPending}>
                        {isSubmitting || isPending && <Spinner />}
                        {isSubmitting || isPending ? "Creating Account" : 'Create Account'}
                    </Button>
                )}
            </form.Subscribe>


        </FieldGroup>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
            <Button variant="outline" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" style={{ opacity: 1 }}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                Continue with Google
            </Button>
            <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/login" >
                    Login
                </Link>
            </FieldDescription>
        </Field>
    </form>
}

export default RegisterForm