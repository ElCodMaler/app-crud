import type { User, PropAlert } from '../types';
import type { JSX, FC } from 'react';
import { useEffect,useState } from 'react';
import { AuthService } from '../utils/api';
import { UsersTable } from '../components';
// Interfaces
interface PropsTable{
    changeSection: React.Dispatch<React.SetStateAction<number>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setAlert: React.Dispatch<React.SetStateAction<PropAlert | undefined>>;
}
// File component (Tables)
export const Tables:FC<PropsTable> = ({changeSection, setUser, setAlert}): JSX.Element => {
    const [data, setData] = useState<User[]>([]);
    // evaluar estado
    useEffect(() => {
        AuthService.get()
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                setAlert({
                    typeAlert: "error",
                    message: error.message
                });
            });
    },[]);
    // RENDERING
    return (
        <>
            <header className="text-center pb-3 text-2xl font-bold text-white">
                Users
            </header>
            <UsersTable users={data} changeSection={changeSection} setUser={setUser} setAlert={setAlert}/>
        </>
    );
}
