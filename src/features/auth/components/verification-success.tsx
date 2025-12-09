"use client"

import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Button } from "@/src/components/ui/button"

interface VerificationSuccessProps {
    email: string
    onContinue?: () => void
}

export function VerificationSuccess({ email, onContinue }: VerificationSuccessProps) {
    return (
        <div className="flex items-center justify-center  bg-background p-4">
            <div className="w-full max-w-md">
                {/* Icon with circular backdrop */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Outer circle - lighter shade */}
                        <div className="absolute inset-0 bg-green-100 dark:bg-green-950 rounded-full opacity-30"></div>
                        {/* Middle circle - medium shade */}
                        <div className="absolute inset-2 bg-green-100 dark:bg-green-900 rounded-full opacity-50"></div>
                        {/* Inner circle - darker shade */}
                        <div className="absolute inset-4 bg-green-200 dark:bg-green-800 rounded-full opacity-70"></div>
                        {/* Icon */}
                        <CheckCircle2 className="relative w-12 h-12 text-green-600 dark:text-green-400 z-10" />
                    </div>
                </div>

                {/* Alert */}
                <Alert className="mb-6 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
                    <AlertTitle className="text-lg font-semibold text-foreground">Email Verified Successfully</AlertTitle>
                    <AlertDescription className="mt-2 text-sm text-muted-foreground">
                        Your email <strong>{email}</strong> has been verified. Your account is now fully activated and ready to use.
                    </AlertDescription>
                </Alert>

                {/* Additional info */}
                <div className="bg-card border border-border rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground">
                        Thank you for confirming your email address. You can now access all features of your account and enjoy our
                        services without any restrictions.
                    </p>
                </div>

                {/* Continue button */}
                <Button onClick={onContinue} className="w-full">
                    Continue to Dashboard
                </Button>
            </div>
        </div>
    )
}
