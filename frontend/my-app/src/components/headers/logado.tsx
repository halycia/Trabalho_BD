
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import logoUnb from '@/components/logo unb.png';

export default function header_logado() {
    return (
        <header className="flex justify-between pb-1 items-center mb-2 min-h-fit ">
            <div className="flex pb-1">
                <div className="flex justify-between w-screen bg-green-300 py-3  items-center">
                    <Link
                        href="/feed">
                        <Image
                            src={logoUnb}
                            alt="Logo da UnB"
                            width={80}
                            height={80}
                            className="w-20 h-10 cursor-pointer ml-5 shadow-md"
                        />
                    </Link>
                    <button>
                        <Link
                            href="/perfil"
                            className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Ver avaliações
                        </Link>
                    </button>
                                        <button>
                        <Link
                            href="/feedback"
                            className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Ver feedbacks
                        </Link>
                    </button>


                    <button>
                        <Link
                            href="/perfil"
                            className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Editar perfil
                        </Link>
                    </button>
                    <button
                        className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                    >
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-black cursor-pointer" />
                    </button>
                </div>
            </div>
        </header >
    )
}