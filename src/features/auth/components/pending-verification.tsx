"use client"

import { useState, useEffect } from "react"
import { Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Button } from "@/src/components/ui/button"


interface PendingVerificationProps {
    email: string
    onResendClick?: () => void
}

export function PendingVerification({ email, onResendClick }: PendingVerificationProps) {
    const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
    const [isResending, setIsResending] = useState(false)

    useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleResend = async () => {
        setIsResending(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        onResendClick?.()
        setTimeLeft(120)
        setIsResending(false)
    }

    return (
        <div className="flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* Icon with circular backdrop */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Outer circle - lighter shade */}
                        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-950 rounded-full opacity-30"></div>
                        {/* Middle circle - medium shade */}
                        <div className="absolute inset-2 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50"></div>
                        {/* Inner circle - darker shade */}
                        <div className="absolute inset-4 bg-blue-200 dark:bg-blue-800 rounded-full opacity-70"></div>
                        {/* Icon */}
                        <Mail className="relative w-12 h-12 text-blue-600 dark:text-blue-400 z-10" />
                    </div>
                </div>

                {/* Alert */}
                <Alert className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
                    <AlertTitle className="text-lg font-semibold text-foreground">Verification Link Sent</AlertTitle>
                    <AlertDescription className="mt-2 text-sm text-muted-foreground">
                        We&apos;ve sent a verification link to <strong>{email}</strong> Please check your inbox and click the link
                        to verify your email address.
                    </AlertDescription>
                </Alert>

                {/* Additional info */}
                <div className="bg-card border border-border rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-3">
                        Didn&apos;t receive the email? It may take a few moments to arrive. Check your spam folder if you don&apos;t
                        see it.
                    </p>
                </div>

                {/* Resend button */}
                <Button
                    onClick={handleResend}
                    disabled={timeLeft > 0 || isResending}
                    variant={timeLeft > 0 ? "outline" : "default"}
                    className="w-full"
                >
                    {isResending ? "Sending..." : timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend Link"}
                </Button>
            </div>
        </div>
    )
}
