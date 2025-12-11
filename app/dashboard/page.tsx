'use client'

import { useAuth } from "@/src/features/auth/context/auth-context"

const Dashboard = () => {
    const { user } = useAuth()


    console.log(user)
    return (
        <div>{user?.email}</div>
    )
}

export default Dashboard