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
    const [avaliacaoEdit, setAvaliacaoEdit] = useState<Avaliacao | null>(null);
    const [editAvaliacaoTexto, setEditAvaliacaoTexto] = useState<string>('');
    const [editAvaliacaoNota, setEditAvaliacaoNota] = useState<number>(0);
    const [editAvaliacaoDataConsumo, setEditAvaliacaoDataConsumo] = useState<Date | null>(null);
    const [isModalEditAvaliacaoOpen, setIsModalEditAvaliacaoOpen] = useState(false);

    const editingAvaliacao = async (avaliacaoEdit: Partial<Avaliacao>, id: number) => {
    try {
        await axios.patch(`http://localhost:3000/avaliacao/${id}`, avaliacaoEdit);
        toast.success("Avaliação editada com sucesso!", { autoClose: 2000 });
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    } catch (error: any) {
        toast.error("Erro ao editar avaliação.");
    }
}

const handleDeleteAvaliacao = (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta avaliação? Esta ação não pode ser desfeita.");
    if (confirmDelete) {
        deleteAvaliacao(id);
    }
}

const deleteAvaliacao = async (id: number) => {
    try {
        await axios.delete(`http://localhost:3000/avaliacao/${id}`);
        toast.success("Avaliação excluída com sucesso!", { autoClose: 2000 });
        setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== id));
    } catch (error: any) {
        toast.error("Erro ao excluir avaliação.");
    }
};
const toggleModalAvaliacao = () => {
    setIsModalEditAvaliacaoOpen(!isModalEditAvaliacaoOpen);
}
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

    const modalEditAvaliacao = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="h-auto text-black w-[60%] max-w-lg flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center p-6">
            <h2 className="text-white text-xl font-bold mb-4">Editar Avaliação</h2>
            
            <div className="w-full mb-4">
                <label className="text-white block mb-2">Nota:</label>
                <select 
                    value={editAvaliacaoNota}
                    onChange={(event) => setEditAvaliacaoNota(Number(event.target.value))}
                    className="w-full p-2 rounded-md border"
                >
                    <option disabled value="-1">Selecione a nota</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div className="w-full mb-4">
                <label className="text-white block mb-2">Data de Consumo:</label>
                <input
                    type="date"
                    value={editAvaliacaoDataConsumo?.toLocaleDateString('pt-BR')}
                    onChange={(e) => setEditAvaliacaoDataConsumo(new Date(e.target.value))}
                    className="w-full p-2 rounded-md border"
                />
            </div>

            <div className="flex flex-col h-[12rem] w-full bg-[#A4FED3] rounded-md">
                <textarea
                    value={editAvaliacaoTexto}
                    maxLength={500}
                    onChange={(event) => setEditAvaliacaoTexto(event.target.value)}
                    placeholder="Digite seu comentário sobre a avaliação..."
                    className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                />
            </div>
            
            <div className="flex justify-between items-center w-full mt-4">
                <span className="text-white text-base pl-1">
                    {editAvaliacaoTexto.length}/500
                </span>
                <div className="flex justify-end items-center space-x-4">
                    <button
                        className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all"
                        onClick={() => {
                            if (!editAvaliacaoTexto.trim() || editAvaliacaoNota === -1 || !editAvaliacaoDataConsumo) {
                                toast.error("Preencha todos os campos!");
                            } else {
                                const editedAvaliacao: Partial<Avaliacao> = {
                                    texto: editAvaliacaoTexto,
                                    nota: editAvaliacaoNota,
                                    emailusuario: userInfo?.email,
                                    dataconsumo: editAvaliacaoDataConsumo.toISOString(),
                                    dataavaliacao: new Date().toISOString(),
                                };
                                editingAvaliacao(editedAvaliacao, avaliacaoEdit?.id ?? 0);
                                toggleModalAvaliacao();
                                fetchAvaliacoesUser(userInfo?.email ?? '');
                            }
                        }}
                    >
                        Salvar
                    </button>

                    <button
                        onClick={() => toggleModalAvaliacao()}
                        className="bg-white text-[#4a71ff] border border-[#4a71ff] rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
    if (!userInfo) return <div>Carregando...</div>;

    return (
        <div>
            {isModalEditAvaliacaoOpen && modalEditAvaliacao()}
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
                            <div className='flex justify-center space-x-4 items-center px-4 py-2'>
                        <button 
                            onClick={() => { 
                                setAvaliacaoEdit(avaliacao); 
                                setEditAvaliacaoTexto(avaliacao.texto);
                                setEditAvaliacaoNota(avaliacao.nota);
                                setEditAvaliacaoDataConsumo(new Date(avaliacao.dataconsumo));
                                toggleModalAvaliacao();
                            }}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer'>
                            Editar
                        </button>
                        <button 
                            onClick={() => handleDeleteAvaliacao(avaliacao.id)}
                            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer'>
                            Excluir
                        </button>
                    </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}