'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode, useState } from 'react';
import { AuthProvider } from '../features/auth/context/auth-context';

type ProvidersProps = {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            },
        },
    }));



    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>

                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default Providers