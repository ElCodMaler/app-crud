import type { User } from '../types';
import { AuthService } from '../utils/api';
import {type JSX, useEffect,useState } from 'react';

export const Terminal = (): JSX.Element => {
    const [data, setData] = useState<User[]>([]);

    const fetchData = async () => await AuthService.get();

    useEffect(() => {

        const value = fetchData();
        setData([value]);

        // Configurar polling cada 5 segundos (5000ms)
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    },[])


    return (
        <>
            <header className="text-center pb-3 text-2xl font-bold text-white">
                Terminal
            </header>
            <section className="bg-gray-800 text-white p-4 rounded-lg w-full h-4/5 overflow-auto">
                <ul>
                {data.map((d, index) => (
                    <li key={index}>
                        name: {d.name}
                        email: {d.email}
                    </li>
                ))}   
                </ul>
            </section>
        </>
    );
}
