"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { buttonVariants } from "@/src/components/ui/button"
import Link from "next/link"

interface VerificationFailedProps {
    email?: string
    onRetry?: () => void
    onBackToSignup?: () => void
    message: string
}

export function VerificationFailed({ email, onBackToSignup, message }: VerificationFailedProps) {


    return (
        <div className="flex items-center justify-center  bg-background p-4">
            <div className="w-full max-w-md">
                {/* Icon with circular backdrop */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Outer circle - lighter shade */}
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-950 rounded-full opacity-30"></div>
                        {/* Middle circle - medium shade */}
                        <div className="absolute inset-2 bg-red-100 dark:bg-red-900 rounded-full opacity-50"></div>
                        {/* Inner circle - darker shade */}
                        <div className="absolute inset-4 bg-red-200 dark:bg-red-800 rounded-full opacity-70"></div>
                        {/* Icon */}
                        <AlertCircle className="relative w-12 h-12 text-red-600 dark:text-red-400 z-10" />
                    </div>
                </div>

                {/* Alert */}
                <Alert className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950">
                    <AlertTitle className="text-lg font-semibold text-foreground">Verification Failed</AlertTitle>
                    <AlertDescription className="mt-2 text-sm text-muted-foreground">{message}</AlertDescription>
                </Alert>

                {/* Additional info */}
                <div className="bg-card border border-border rounded-lg p-4 mb-6">
                    {email && (
                        <p className="text-sm text-muted-foreground mb-2">
                            Email: <strong>{email}</strong>
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        Please request a new verification link or contact our support team if the issue persists.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex w-full justify-center">


                    <Link href={'/register'} onClick={onBackToSignup} className={buttonVariants({ variant: "outline" })} >
                        Back to Sign Up
                    </Link>
                </div>


            </div>
        </div>
    )
}
