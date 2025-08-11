import type { JSX } from 'react';

export const Terminal = (): JSX.Element => {
    return (
        <>
            <header className="text-center pb-3 text-2xl font-bold text-white">
                Terminal
            </header>
            <section className="bg-gray-800 text-white p-4 rounded-lg w-full h-4/5 overflow-auto">
                <p>Welcome to the terminal interface!</p>
                <p>Type your commands below:</p>
            </section>
        </>
    );
}
