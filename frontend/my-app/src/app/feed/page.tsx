'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderLogado from '../../components/headers/logado';
import HeaderDeslogado from '@/components/headers/deslogado';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Campus, Feedback, Setor, User } from '@/utils/types';

export default function FeedPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [campus, setCampus] = useState<Campus[]>([]);
    const [setores, setSetores] = useState<Setor[]>([]);
    const [campusSelected, setCampusSelected] = useState("-1");
    const [setorSelected, setSetorSelected] = useState("-1");
    const [textoFeedback, setTextoFeedback] = useState("");
    const [tipo, setTipo] = useState("-1");

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
        const getCampus = async () => {
            try {
                const response = await axios.get("http://localhost:3000/campus");
                setCampus(response.data);
            } catch {
                toast.error("Erro ao buscar campus");
            }
        };

        getCampus();
    }, []);

    const findSetoresForCampus = async (campusNome: string) => {
        try {
            if (campusNome !== "-1") {
                const response = await axios.get(`http://localhost:3000/setor/campus/${campusNome}`);
                setSetores(response.data as Setor[]); 
            } else {
                setSetores([]); 
            }
        } catch {
            toast.error("Erro ao procurar setores do campus");
            setSetores([]); 
        }
    };

    const creatingFeedback = async (feedback: Partial<Feedback>) => {
        try {
            if (!feedback.texto || feedback.idsetor === -1 || !feedback.tipo) {
                toast.error("Preencha todos os campos!");
                return;
            }
            await axios.post("http://localhost:3000/feedback", feedback);
            toast.success("Feedback criado com sucesso!", { autoClose: 2200 });
            resetFeedbackModalFields();
            setTimeout(() => {
                toggleFeedbackModal();
            }, 500);
        } catch {
            toast.error("Erro ao criar feedback. Por favor, tente novamente.");
        }
    };

    const toggleFeedbackModal = () => setIsFeedbackModalOpen(!isFeedbackModalOpen);

    const resetFeedbackModalFields = () => {
        setTextoFeedback("");
        setCampusSelected("-1"); 
        setSetorSelected("-1"); 
        setTipo("-1"); 
        setSetores([]); 
    };

    const modalFeedback = () => (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="h-screen text-black w-[60%] max-h-[60%] flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center">
                
                <select
                    value={campusSelected} 
                    className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    onChange={(event) => {
                        setCampusSelected(event.target.value); 
                        findSetoresForCampus(event.target.value);
                        setSetorSelected("-1"); 
                    }}
                >
                    <option value="-1" disabled>Selecione o campus</option>
                    {campus.map((campusItem) => ( 
                        <option key={campusItem.nome} value={campusItem.nome}>
                            {campusItem.nome}
                        </option>
                    ))}
                </select>

                {campusSelected !== "-1" && setores.length === 0 && ( 
                    <select
                        disabled
                        value={setorSelected} 
                        className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    >
                        <option value="-1" disabled>Não há setores cadastrados para este campus</option>
                    </select>
                )}

                {campusSelected !== "-1" && setores.length > 0 && ( 
                    <select
                        value={setorSelected} 
                        className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                        onChange={(event) => {
                            setSetorSelected(event.target.value); 
                        }}
                    >
                        <option value="-1" disabled>Selecione o setor</option>
                        {setores.map((setor) => ( 
                            <option key={setor.id} value={setor.id}>
                                {setor.nome}
                            </option>
                        ))}
                    </select>
                )}

                {campusSelected === "-1" && ( 
                    <select
                        disabled
                        value={setorSelected} 
                        className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    >
                        <option value="-1" disabled>Selecione um setor </option>
                    </select>
                )}
                
                <select
                    value={tipo} 
                    className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    onChange={(event) => {
                        setTipo(event.target.value); 
                    }}
                >
                    <option value="-1" disabled>Selecione o tipo</option>
                    <option value="Reclamação">Reclamação</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Elogio">Elogio</option>
                </select>

                <div className="flex flex-col h-[12rem] w-[90%] bg-[#A4FED3] mt-[2rem] rounded-md">
                    <textarea
                        value={textoFeedback}
                        maxLength={500}
                        placeholder="Digite seu feedback"
                        onChange={(event) => setTextoFeedback(event.target.value)}
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>
                
                <div className="flex justify-between items-center w-[90%] mt-6">
                    <span className="text-white text-base pl-1">
                        {textoFeedback.length}/500
                    </span>
                    <div className="flex mr-6 items-center justify-center">
                        <button
                            onClick={() => { resetFeedbackModalFields(); toggleFeedbackModal(); }}
                            className="bg-transparent text-white rounded-lg hover:scale-110 duration-200 w-20 h-10 text-xl text-[23px] font-400 leading-[54.46px] mr-9 flex items-center justify-center"
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] ml-1 font-400 text-[20px] rounded-lg hover:scale-110 duration-200 w-32 h-10 text-xl leading-[42.36px] flex items-center justify-center"
                            onClick={() => {
                                if (!textoFeedback.trim() || campusSelected === "-1" || setorSelected === "-1" || tipo === "-1") {
                                    toast.error("Preencha todos os campos!");
                                } else {
                                    const dataFeedback = new Date().toISOString();
                                    try{
                                    creatingFeedback({
                                        texto: textoFeedback,
                                        tipo: tipo,
                                        data: dataFeedback,
                                        idsetor: parseInt(setorSelected, 10),
                                        emailusuario: userInfo?.email,
                                    })}
                                    catch (error) {
                                        console.error("Erro ao criar feedback. Por favor, tente novamente.");
                                }
                            }}}
                        >
                            Enviar Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, [router]);

    if (!isAuth) {
        return (
            <HeaderDeslogado/>
        )
    }
    else {
        return (
            <div className="min-h-screen bg-gray-100">
                <HeaderLogado />
                {isFeedbackModalOpen && modalFeedback()}
                <div className='flex items-center justify-center'>
                <button
                    onClick={toggleFeedbackModal}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Fazer feedback
                </button>
                </div>
            </div>
        );
    }
}