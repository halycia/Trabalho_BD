
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function header_deslogado() {
    const router = useRouter();
    return (
        <header className="flex justify-between bg-customGreen pb-1 items-center mb-2 min-h-fit ">
            <div className="flex bg-azulUnb pb-1">
                <div className="flex justify-between w-screen bg-green-300 py-3  items-center">
                    <Link
                        href="/feed">
                        <Image
                            src={""||null}
                            alt="Logo da UnB"
                            width={80}
                            height={80}
                            className="w-20 h-10 cursor-pointer ml-5 shadow-md"
                        />
                    </Link>

                    <button
                        className="flex items-center bg-blue-700 text-white rounded-[60px] px-4 py-2 mr-2 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        onClick={() => {
                            router.push('/login');
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </header >
    )
}