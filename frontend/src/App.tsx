import type { JSX } from 'react';
import { useState } from 'react';
import { Card } from 'flowbite-react';
import { Terminal, Form } from './components';

// Tab menu items
const tabs = [
    { title: "Terminal", content: <Terminal /> },
    { title: "Form", content: <Form /> }
];

export const App = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <main className="flex-grow p-6 flex flex-col items-center min-h-screen bg-primary-50 text-gray-400 font-bold">
            <Card className="w-2xl h-[640px] bg-primary-700 text-white border-none rounded-xl shadow-2xl flex flex-col relative overflow-hidden">
                {/* Tabs menu */}
                <nav className="flex border-b border-primary-900 bg-primary-700 sticky top-0 z-10">
                    {tabs.map((tab, id) => (
                        <button
                            key={tab.title}
                            className={`flex-1 py-3 text-lg font-semibold transition-colors
                                ${activeTab === id ? 'border-b-4 border-blue-400 text-blue-200' : 'text-white hover:text-blue-300'}
                                bg-transparent`}
                            onClick={() => setActiveTab(id)}
                            type="button"
                        >
                            {tab.title}
                        </button>
                    ))}
                </nav>
                {/* Tab content area */}
                <section className="flex-1 overflow-auto px-4">
                    {tabs[activeTab].content}
                </section>
            </Card>
        </main>
    );
}