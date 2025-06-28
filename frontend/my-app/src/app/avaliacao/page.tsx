'use client';

import { use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import HeaderLogado from "@/components/headers/logado";
import { Avaliacao } from "@/utils/types";
import { User } from "@/utils/types";

export default function AvaliacaoPage() {
    const router = useRouter();
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded: { sub: string } = jwtDecode(token);
                    const email = decoded.sub;
                    const userResponse: User = (await axios.get(`http://localhost:3000/user/email/${email}`)).data;
                    setUserInfo(userResponse);
                }
                else {
                    router.push('/feed');
                }
            } catch (error) {
                toast.error("Erro ao buscar informações do usuário");
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            fetchAvaliacoesUser(userInfo.email);
        }
    }, [userInfo]);

    const fetchAvaliacoesUser = async (email: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/avaliacao/user/${email}`);
            setAvaliacoes(response.data);
        } catch (error) {
            toast.error("Erro ao carregar avaliações.");
        }
    };

    if (!userInfo) return <div>Carregando...</div>;

    return (
        <div>
            <HeaderLogado />
            <div className="container mx-auto px-4 py-8">
                {avaliacoes.length > 0 && (
                    <h1 className="text-2xl font-bold mb-4 text-center">Minhas Avaliações</h1>
                )}
                {avaliacoes.length === 0 ? (
                    <div className="text-center text-gray-600 text-xl mt-20">
                        <p>Você não fez nenhuma avaliação!</p>
                    </div>
                ) : (
                    avaliacoes.map(avaliacao => (
                        <div key={avaliacao.id} className="w-full max-w-[95%] bg-[#49ffff] rounded-md mt-8 flex flex-col mx-auto mb-4 min-h-fit">
                            <div className="w-full max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                                <div className="flex items-center pl-3 pb-[0.7rem] mt-2">
                                    <div className="pl-1">
                                        <div className='flex ml-3 items-center'>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">Data da avaliação: {new Date(avaliacao.dataavaliacao).toLocaleDateString()}</span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex"> Data de consumo: {avaliacao.dataconsumo.toLocaleString()}
                                            </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">Nota: {avaliacao.nota}</span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{avaliacao.nomeprato}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col ml-[4.25rem]'>
                                        <div>
                                            <div>
                                                <p className="text-[#222E50] text-[15px] font-[500] leading-[18.15px] pb-2 pr-4 whitespace-pre-wrap break-words max-w-full">{avaliacao.texto}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}