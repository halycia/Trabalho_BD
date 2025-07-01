'use client';

import { use, useEffect, useState } from 'react';
import { Feedback, User } from "../../types";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import HeaderLogado from "@/components/headers/logado";

import axios from 'axios';
import { error } from 'console';
export default function UserFeedback() {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const router = useRouter();
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [nomeSetores, setNomeSetores] = useState<Map<number, string>>(new Map());
    const [feedbackEscolhido, setFeedbackEscolhido] = useState<Feedback | null>(null);
    const [feedbackEscolhidoTexto, setFeedbackEscolhidoTexto] = useState<string>('');
    const [isModalEditFeedbackOpen, setIsModalEditFeedbackOpen] = useState(false);
    const [editFeedbackTipo, setEditFeedbackTipo] = useState<string>('');
    const [campusEditFeedback, setCampusEditFeedback] = useState<string>('');
    const [nomeCampus, setNomeCampus] = useState<Map<number, string>>(new Map());

    const findCampusEditFeedback = async (idSetor: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/setor/${idSetor}`);
            setCampusEditFeedback(response.data.nomecampus);
        } catch (error) {
            toast.error("Erro ao buscar nome do campus");
        }
    }
    const toggleModalEditFeedback = () => {
        setIsModalEditFeedbackOpen(!isModalEditFeedbackOpen);
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

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
        const findSetorNomes = async () => {
            try {
                for (const feedback of feedbacks) {
                    const response = await axios.get(`http://localhost:3000/setor/${feedback.idsetor}`);
                    const nomeSetor = response.data.nome;
                    setNomeSetores(prev => new Map(prev).set(feedback.id, nomeSetor));
                    const nomeCampus = response.data.nomecampus;
                    setNomeCampus(prev => new Map(prev).set(feedback.idsetor, nomeCampus));

                }
            } catch (error) {
                toast.error("Erro ao buscar nomes dos setores");
            }
        };

        findSetorNomes();
    }, [feedbacks]);


    const handleDeleteFeedback = (id: number) => {
        const confirm = window.confirm("Tem certeza que deseja excluir este feedback? Esta ação não pode ser desfeita.");
        if (confirm) {
            deleteFeedback(id);
        }
    }

    const deleteFeedback = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/feedback/${id}`);
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            toast.success("Feedback deletado com sucesso!");
        } catch (error) {
            toast.error("Erro ao deletar feedback");
        }
    };

    const resetEditFeedbackModalFields = () => {
        setFeedbackEscolhido(null);
        setEditFeedbackTipo('');
        setFeedbackEscolhidoTexto('');
    };

    const editingFeedback = async (feedback: Partial<Feedback>, id: number) => {
        try {
            if (!feedback.texto || !feedback.tipo) {
                toast.error("Preencha todos os campos!");
                return;
            }
            await axios.patch(`http://localhost:3000/feedback/${id}`, feedback);
            toast.success("Feedback editado com sucesso!", { autoClose: 2200 });
            resetEditFeedbackModalFields();
            setTimeout(() => {
                toggleModalEditFeedback();
                window.location.reload();
            }, 500);
        } catch (error) {
            toast.error("Erro ao editar feedback. Por favor, tente novamente.");
            console.log(error)
        }
    };

    const modalEditFeedback = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="h-screen text-black w-[60%] max-h-[60%] flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center">

                <select
                    disabled
                    value={campusEditFeedback}
                    className="bg-gray-200 h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md cursor-not-allowed opacity-75"
                >
                    <option>{campusEditFeedback}</option>
                </select>

                <select
                    disabled
                    value={nomeSetores.get(feedbackEscolhido?.id ?? 0)}
                    className="bg-gray-200 h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md cursor-not-allowed opacity-75"
                >
                    <option>{nomeSetores.get(feedbackEscolhido?.id ?? 0)}</option>
                </select>

                <select
                    value={editFeedbackTipo}
                    className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    onChange={(event) => {
                        setEditFeedbackTipo(event.target.value);
                    }}
                >
                    <option value="-1" disabled>Selecione o tipo</option>
                    <option value="Reclamação">Reclamação</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Elogio">Elogio</option>
                </select>

                <div className="flex flex-col h-[12rem] w-[90%] bg-[#A4FED3] mt-[2rem] rounded-md">
                    <textarea
                        value={feedbackEscolhidoTexto}
                        maxLength={500}
                        onChange={(event) => setFeedbackEscolhidoTexto(event.target.value)}
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>

                <div className="flex justify-between items-center w-[90%] mt-6">
                    <span className="text-white text-base pl-1">
                        {feedbackEscolhidoTexto.length}/500
                    </span>
                    <div className="flex justify-end items-center w-full mt-6 space-x-4 px-4 pb-2">
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all"
                            onClick={() => {
                                if (!feedbackEscolhidoTexto.trim() || editFeedbackTipo === '-1') {
                                    toast.error("Preencha todos os campos!");
                                } else {
                                    const editedFeedback: Partial<Feedback> = {
                                        texto: feedbackEscolhidoTexto,
                                        tipo: editFeedbackTipo,
                                        idsetor: feedbackEscolhido?.idsetor,
                                        emailusuario: userInfo?.email,
                                        data: new Date().toISOString(),
                                    };
                                    editingFeedback(editedFeedback, feedbackEscolhido?.id ?? 0);
                                }
                            }}
                        >
                            Salvar
                        </button>

                        <button
                            onClick={() => {
                                resetEditFeedbackModalFields();
                                toggleModalEditFeedback();
                            }}
                            className="bg-white text-[#4a71ff] border border-[#4a71ff] rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <HeaderLogado />
            {isModalEditFeedbackOpen && (
                modalEditFeedback()
            )}
            <div className='flex flex-col items-center justify-center mt-10'>
                {feedbacks.length > 0 && (
                    <h1 className='text-2xl font-bold mb-4'>Meus Feedbacks</h1>
                )}
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback.id} className=" w-full max-w-[40%] bg-[#49ffff] rounded-md mt-8 flex flex-col mx-auto mb-4 min-h-fit">
                            <div className=" w-full max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                                <div className="flex flex-col space-y-5 items-center pl-3 mt-2">
                                    <div className="pl-1">
                                        <div className='flex ml-3 items-center'>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{new Date(feedback.data).toLocaleDateString()} </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{feedback.tipo}</span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                            <span className="font-sans text-[#71767B] text-[12px] font-[350] leading-[16.94px] flex">{nomeCampus.get(feedback.idsetor)}</span>
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
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center space-x-4 items-center px-4 py-2'>
                                <button
                                    onClick={() => {
                                        setFeedbackEscolhido(feedback);
                                        setFeedbackEscolhidoTexto(feedback.texto);
                                        setEditFeedbackTipo(feedback.tipo);
                                        findCampusEditFeedback(feedback.idsetor);
                                        toggleModalEditFeedback()
                                    }}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer'>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteFeedback(feedback.id)}
                                    className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer'>
                                    Excluir
                                </button>
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