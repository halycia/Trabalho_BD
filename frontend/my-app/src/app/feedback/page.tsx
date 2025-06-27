
import  { useEffect, useState } from 'react';
import {Feedback, User} from "../../utils/types";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import HeaderLogado from "@/components/headers/logado";

import axios from 'axios';
export default function UserFeedback() {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const router = useRouter();   
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [nomeSetores, setNomeSetores] = useState<Map<number, string>>(new Map());
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            router.push('/login');
        }},[]);

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
            } catch (error) {
                toast.error("Erro ao buscar informações do usuário");
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const findFeedbacks = async () => {
            try {
                if (userInfo) {
                    const response = await axios.get(`http://localhost:3000/feedback/user/${userInfo.email}`);
                    setFeedbacks(response.data);
                }
            } catch (error) {
                toast.error("Erro ao buscar feedbacks do usuário");
            }
        };

        findFeedbacks();
    }, [userInfo]);

    useEffect(() => {
        const findSetorNames = async () => {
            try {
                for (const feedback of feedbacks) {
                    const response = await axios.get(`http://localhost:3000/setor/${feedback.idsetor}`);
                    const nomeSetor = response.data.nome;
                    setNomeSetores(prev => new Map(prev).set(feedback.id, nomeSetor));
                }
            } catch (error) {
                toast.error("Erro ao buscar nomes dos setores");
            }
        };

        findSetorNames();
    }, [feedbacks]);

    const deleteFeedback = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/feedback/${id}`);
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            toast.success("Feedback deletado com sucesso!");
        } catch (error) {
            toast.error("Erro ao deletar feedback");
        }
    };



    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <HeaderLogado/>
            <div className='flex flex-col items-center justify-center mt-10'>
                { feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback.id} className=" w-full max-w-[95%] bg-[#49ffff] rounded-md mt-8 flex flex-col mx-auto mb-4 min-h-fit">
                            <div className=" w-full max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                                <div className="flex items-center pl-3 pb-[0.7rem] mt-2">
                                    <div className="pl-1">
                                        <div className='flex ml-3 items-center'>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{new Date(feedback.data).toLocaleDateString()}</span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{feedback.tipo}</span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{nomeSetores.get(feedback.id)}</span>


                                        </div>
                                    </div>
                                    <div className='flex flex-col ml-[4.25rem]'>
                                        <div>
                                            <div>
                                                <p className="text-[#222E50] text-[15px] font-[500] leading-[18.15px] pb-2 pr-4 whitespace-pre-wrap break-words max-w-full">{feedback.texto}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex">
                                                <span className="font-sans text-[#222E50] text-[12px] font-[600] leading-[14.52px] flex pl-1 items-center"> 
                                                    Feedback
                                                </span>                                     
                                            </div>
                                            <div className="flex pr-2">             
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-600 text-xl mt-20">
                        <p>Você não fez nenhum feedback!</p>
                    </div>
                )}
            </div>
        </div>
    );
}