'use client'

import { useEffect, type FC } from 'react'
import { useVerifyEmail } from '../hooks/use-verify-email'
import { redirect } from 'next/navigation'
import { PendingVerification } from './pending-verification'
import { VerificationFailed } from './verification-failed'
import { VerificationSuccess } from './verification-success'


type VerifyEmailformProps = {
    token?: string | undefined,
    email: string
}



const VerifyEmailform: FC<VerifyEmailformProps> = ({ token, email }) => {
    const { mutate: verifyEmail, error, data } = useVerifyEmail()

    if (!email && !token) {
        redirect('/register')
    }

    useEffect(() => {
        if (token) verifyEmail(token)
    }, [token, verifyEmail])

    if (error) {
        return <VerificationFailed message={error.message} />
    }
    if (email && !token) {
        return <PendingVerification email={email} />
    } else if (token && data) {
        return <VerificationSuccess email={data?.data.email || email} />
    }


}

export default VerifyEmailform