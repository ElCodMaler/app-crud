import type { User, PropAlert } from '../types';
import type { JSX, FC } from 'react';
import { UsersTable } from '../components';
// Interfaces
interface PropsTable{
    changeSection: React.Dispatch<React.SetStateAction<number>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setAlert: React.Dispatch<React.SetStateAction<PropAlert | undefined>>;
}
// File component (Tables)
export const Tables:FC<PropsTable> = ({changeSection, setUser, setAlert}): JSX.Element => {
    return (
        <>
            <header className="text-center pb-3 text-2xl font-bold text-white">
                Users
            </header>
            <UsersTable changeSection={changeSection} setUser={setUser} setAlert={setAlert}/>
        </>
    );
}
