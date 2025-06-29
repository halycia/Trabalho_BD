'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function LoginPage() {
    const [formLogin, setFormLogin] = useState({ email: '', senha: '' });
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push('/feed');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value });}; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, {
                email: formLogin.email,
                senha: formLogin.senha
            });

            const { token } = response.data;
            console.log("Token recebido:", token);
            localStorage.setItem('token', token);

            toast.success("Login realizado com sucesso!", {
                autoClose: 2000,
            });

            router.push('/feed');
        } catch (error: any) {
            if (error.response.status === 401) {
                toast.error("Email ou senha inválidos!", {
                    autoClose: 3000,
                });
            }
            else {
                toast.error("Erro ao realizar login.", {
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
                <div className="w-3/4 p-10 rounded-lg shadow-lg">
                    <h1 className='text-4xl font-bold mb-6 text-center'>
                        AvaliaRU
                    </h1>
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                    <label className=" mb-2 text-sm font-medium text-gray-700">Email</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="email"
                            name="email"
                            value={formLogin.email}
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
                            value={formLogin.senha}
                            onChange={handleChange}
                            placeholder="********"
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>

                        </div>
                        <div className='flex pt-2 flex-col justify-center items-center'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Entrar
                        </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        
                        <p className="text-sm text-gray-600">
                            <Link href="/cadastro" className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer">
                                Cadastro
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}