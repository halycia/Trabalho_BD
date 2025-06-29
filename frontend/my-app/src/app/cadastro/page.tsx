'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Cadastro() {
    const [formCadastro, setFormCadastro] = useState({ email: '', senha: '', username: '', nome: '', telefone: '' });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormCadastro({ ...formCadastro, [e.target.name]: e.target.value });

    }; 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/user`, {
                email: formCadastro.email,
                senha: formCadastro.senha,
                username: formCadastro.username,
                nome: formCadastro.nome,
                telefone: formCadastro.telefone || null,
            });

            const signUp = await axios.post(`http://localhost:3000/auth/login`, {
                email: formCadastro.email,
                senha: formCadastro.senha
            });
            const { token } = signUp.data;
            
            localStorage.setItem('token', token); toast.success("Cadastro realizado com sucesso!", {
                autoClose: 2000,
            });

            router.push('/feed');
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                if (error.response.data.message === 'Email já cadastrado') {
                    toast.error("Este email já está cadastrado!", {
                        autoClose: 3000,
                    });
                } else if (error.response.data.message === 'Nome de usuário em uso') {
                    toast.error("Este nome de usuário já está em uso!", {
                        autoClose: 3000,
                    });
                } 
            } 
            else {
                toast.error("Erro ao realizar cadastro.", {
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="flex min-h-screen">
            <div
                className="w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://live.staticflickr.com/917/28432452267_1d19db2568_b.jpg')`,
                }}
            />
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
                <div className="w-3/4 max-w-md p-10 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">AvaliaRU</h1>

                    <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

                <form onSubmit={handleSubmit} >
                    <label className=" mb-2 text-sm font-medium text-gray-700">Nome</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="text"
                            name="nome"
                            value={formCadastro.nome}
                            onChange={handleChange}
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Email</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="email"
                            name="email"
                            value={formCadastro.email}
                            onChange={handleChange}
                            className= "pl-2 pb-1 w-full"
                            required
                        />

                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Senha</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="password"
                            name="senha"
                            value={formCadastro.senha}
                            onChange={handleChange}
                            placeholder="********"
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Nome de usuário</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="text"
                            name="username"
                            value={formCadastro.username}
                            onChange={handleChange}
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Telefone (opcional)</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="phone"
                            name="telefone"
                            value={formCadastro.telefone || ""}
                            onChange={handleChange}
                            className="pl-2 pb-1 w-full"
                        />
                    </div>
                    <div className='flex pt-2 flex-col justify-center items-center'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Cadastrar
                        </button>
                    </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            <Link href="/login" className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}