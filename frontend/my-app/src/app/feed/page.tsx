'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderLogado from '../../components/headers/logado';
import HeaderDeslogado from '@/components/headers/deslogado';
export default function FeedPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, [router]);

    if (!isAuth){
        return (
            <HeaderDeslogado/>
        )
    }
    else{
    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderLogado />
        </div>
    );
    }
}
