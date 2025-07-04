'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import HeaderLogado from "@/components/headers/logado";
import { Avaliacao, Comentario, User, Prato } from "@/types";

export default function AvaliacaoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [textoNovoComentario, setTextoNovoComentario] = useState<string>('');
    const [textoEditComentario, setTextoEditComentario] = useState<string>('');
    const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
    const [isModalCreateComentarioOpen, setIsModalCreateComentarioOpen] = useState(false);
    const [isModalEditComentarioOpen, setIsModalEditComentarioOpen] = useState(false);
    const [userAval, setUserAval] = useState<User | null>(null);
    const [userComentarios, setUserComentarios] = useState<Map<number, User>>(new Map());
    const [pratoAval, setPratoAval] = useState<Prato | null>(null);
    const avaliacaoId = params.id as string;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded: { sub: number } = jwtDecode(token);
                    const id = decoded.sub;
                    const userResponse: User = (await axios.get(`http://localhost:3000/user/${id}`)).data;
                    setUserInfo(userResponse);
                }
            } catch (error) {
                toast.error("Erro ao buscar informações do usuário");
            }
        };

        fetchUserInfo();
        fetchAvaliacaoAndComentarios();
    }, [avaliacaoId]);

    const fetchAvaliacaoAndComentarios = async () => {
        try {
            const avaliacaoResponse = (await axios.get(`http://localhost:3000/avaliacao/${avaliacaoId}`)).data;
            setAvaliacao(avaliacaoResponse);

            const comentariosResponse = (await axios.get(`http://localhost:3000/comentario/avaliacao/${avaliacaoId}`)).data;
            setComentarios(comentariosResponse);
        } catch (error: any) {
            toast.error("Erro ao carregar avaliação.");
        }
    };

    useEffect(() => {
        const findUserPratoAval = async () => {
            try {
                if (avaliacao && avaliacao.idUsuario) {
                    const userResponse: User = (await axios.get(`http://localhost:3000/user/${avaliacao.idUsuario}`)).data;
                    const pratoAvalResponse: Prato = (await axios.get(`http://localhost:3000/prato/${avaliacao.idPrato}`)).data;
                    setUserAval(userResponse);
                    setPratoAval(pratoAvalResponse);
                }
            } catch (error: any) {
                toast.error("Erro ao buscar informações do usuário da avaliação.");
            }
        };
        findUserPratoAval();
    }, [avaliacao]);

    const toggleModalNovoComentario = () => {
        setIsModalCreateComentarioOpen(!isModalCreateComentarioOpen);
        setTextoNovoComentario('');
    };

    const toggleModalEditComentario = () => {
        setIsModalEditComentarioOpen(!isModalEditComentarioOpen);
        setTextoEditComentario('');
    }

    const handleCreateComentario = async () => {
        if (textoNovoComentario.trim() == '') {
            toast.error("O texto do comentário não pode estar vazio.");
        }

        try {
            if (avaliacao && userInfo) {
                const createComment = {
                    texto: textoNovoComentario,
                    idAvaliacao: avaliacao.id,
                    idUsuario: userInfo.id
                };

                await axios.post('http://localhost:3000/comentario', createComment);
                toast.success("Comentário feito com sucesso!");
                toggleModalNovoComentario();
                window.location.reload();
            }
        } catch (error: any) {
            toast.error("Erro ao fazer comentário.");
        }
    };

    useEffect(() => {
        const fetchUserComentarios = async () => {
            for (const comentario of comentarios) {
                try {
                    const userResponse: User = (await axios.get(`http://localhost:3000/user/${comentario.idUsuario}`)).data;
                    setUserComentarios(prev => new Map(prev).set(comentario.id, userResponse));
                } catch (error: any) {
                    toast.error("Erro ao buscar informações do usuário do comentário.");
                }
            }
        }
        fetchUserComentarios();
    }, [comentarios]);

    const handleDeleteComentario = async (comentarioId: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este comentário?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/comentario/${comentarioId}`);
                toast.success("Comentário excluído com sucesso!");
                window.location.reload();
            } catch (error: any) {
                toast.error("Erro ao excluir comentário.");
            }
        }
    };

    const modalCreateComentario = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2B895C] p-6 rounded-lg w-96 max-w-[90%]">
                <div className="flex flex-col h-[12rem] w-full bg-[#A4FED3] rounded-md">
                    <textarea
                        maxLength={500}
                        onChange={(event) => setTextoNovoComentario(event.target.value)}
                        placeholder="Digite seu comentário..."
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>

                <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-white text-base pl-1">
                        {textoNovoComentario.length}/500
                    </span>
                    <div className="flex justify-end items-center space-x-4">
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all"
                            onClick={handleCreateComentario}
                        >
                            Comentar
                        </button>

                        <button
                            onClick={toggleModalNovoComentario}
                            className="bg-white text-[#4a71ff] border border-[#4a71ff] rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!avaliacao || !userInfo) {
        return <div className="h-screen bg-gray-100"></div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {isModalCreateComentarioOpen && modalCreateComentario()}
            <HeaderLogado />

            <div className="container mx-auto px-4 py-8">
                <div className="w-full max-w-[45%] bg-[#49ffff] rounded-md mt-8 flex flex-col mx-auto mb-8 min-h-fit">
                    <div className="w-full max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                        <div className="flex flex-col justify-center items-center pl-3 space-y-4 mt-2">
                            <div className='flex ml-3 items-center'>
                                <span className="font-sans text-[#71767B] text-sm font-[350] leading-[16.94px] flex">Usuário: {userAval?.username}</span>
                                <span className="font-sans text-[#71767B] text-sm font-[350] leading-[16.94px] flex">Data da avaliação: {avaliacao.dataavaliacao.toLocaleString()}</span>
                                <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                <span className="font-sans text-[#71767B] text-sm font-[350] leading-[16.94px] flex"> Data de consumo: {avaliacao.dataconsumo.toLocaleString()}</span>
                                <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                <span className="font-sans text-[#71767B] text-sm font-[350] leading-[16.94px] flex">Refeição: {avaliacao.refeicao}</span>
                                <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                <span className="font-sans text-[#71767B] text-sm font-[350] leading-[16.94px] flex">Nota: {avaliacao.nota}</span>
                                <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] flex ml-[3px] mr-[3px]"> · </span>
                                <span className="font-sans text-[#71767B] text-sm font-[350] leading-[16.94px] flex">Prato: {pratoAval?.nome}</span>
                            </div>
                            <div className='flex flex-col ml-[4.25rem]'>
                                <p className="text-[#222E50] text-[15px] font-[500] leading-[18.15px] pb-2 pr-4 whitespace-pre-wrap break-words max-w-full">{avaliacao.texto}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[45%] bg-white rounded-md shadow-md p-6 mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={toggleModalNovoComentario}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Comentar
                        </button>
                    </div>

                    {comentarios.length === 0 ? (
                        <div> </div>
                    ) : (
                        <div className="space-y-4">
                            {comentarios.map((comentario) => (
                                <div key={comentario.id} className="border-b border-gray-200 pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center space-x-4">
                                            <span className="font-medium text-gray-800">
                                                {userComentarios.get(comentario.id)?.username || ''}
                                            </span>                            <span className="text-gray-500 text-sm">
                                                {comentario.data.toLocaleString()}
                                            </span>
                                        </div>

                                        {userInfo?.id === comentario.idUsuario && (
                                            <div className="flex space-x-4">
                                                <button
                                                    onClick={() => {
                                                        setTextoEditComentario(comentario.texto);
                                                        setIsModalEditComentarioOpen(true);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComentario(comentario.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-700">{comentario.texto}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}