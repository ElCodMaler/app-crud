import type { User } from '../types';
import { AuthService } from '../utils/api';
import {type JSX, useEffect,useState } from 'react';
import { Alerts, UsersTable } from '../components';

export const Tables = (): JSX.Element => {
    const [data, setData] = useState<User[]>([]);
    const [error, setError] = useState({visible: false, value:''});

    useEffect(() => {
        AuthService.get()
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                setError(prev => ({
                    ...prev,
                    value: error,
                    visible: true
                }));
            });
    },[]);

    return (
        <>
            <header className="text-center pb-3 text-2xl font-bold text-white">
                Users
            </header>
            <UsersTable users={data} />
            <Alerts variant='error' visible={error.visible} className='fixed bottom-3 text-center'>
                {error.value}
            </Alerts>
        </>
    );
}
