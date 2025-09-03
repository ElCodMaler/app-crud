import type { JSX } from 'react';
import type { User, PropAlert } from './types';
import { useState } from 'react';
import { Card } from 'flowbite-react';
import { Tables, Form } from './sections';
import { Alerts } from './components';
// App component
export const App = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [alert, setAlert] = useState<PropAlert | undefined>(undefined);
    // Tab menu items
    const tabs = [
        { title: "Data", content: <Tables changeSection={setActiveTab} setUser={setUser} setAlert={setAlert} /> },
        { title: "Form", content: <Form user={user} setAlert={setAlert} setUser={setUser}/> }
    ];
    // RENDERING
    return (
        <main className="flex-grow p-6 flex flex-col items-center min-h-screen bg-primary-50 text-gray-400 font-bold">
            <Card className="w-11/12 h-[655px] bg-primary-700 text-white border-none rounded-xl shadow-2xl flex flex-col relative overflow-hidden">
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
            <Alerts variant={alert?.typeAlert} visible={alert ? true : false} duration={3000}>
                {alert?.message}
            </Alerts>
        </main>
    );
}