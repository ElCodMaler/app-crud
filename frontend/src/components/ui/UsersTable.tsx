import { useEffect, useState, type FC, type JSX } from "react";
import type { User, PropAlert } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AuthService } from "../../services/api";
// interfaces
interface PropsList {
    changeSection: React.Dispatch<React.SetStateAction<number>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setAlert: React.Dispatch<React.SetStateAction<PropAlert | undefined>>;
}
// User table component
export const UsersTable:FC<PropsList> = ({ changeSection, setUser, setAlert }): JSX.Element => {
    // template user
    const user: User = {
        id: 0,
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    }
    // State to manage Table
    const [users, setUsers] = useState<User[]>([]);
    // FUNCTIONS
    // handle submit
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,user: User) => {
        event.preventDefault();
        changeSection(1);
        setUser(user);
    };
    // handle delete
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,id: number) => {
        event.preventDefault();
        if(id === 0){ 
            throw console.error('no encontro el usuario...')
        } else {
            AuthService.delete(id)
                .then(res => {
                    setAlert({
                        typeAlert: 'success',
                        message:res.message || 'error:'
                    })
                })
                .catch(err => {
                    setAlert({
                        typeAlert: 'failure',
                        message:err.message
                    });
                });
        }
    };
    // evalue state
    useEffect(() => {
        AuthService.get()
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                setAlert({
                    typeAlert:'failure',
                    message:error.message
                })
            });
    },[handleDelete]);
    // RENDERING
    return (
        <Table className="overflow-x-auto">
            <TableHead className="">
                <TableRow className="text-tercery-50">
                    {(Object.keys(user) as Array<keyof User>).map(key => (
                        <TableHeadCell className="border-tercery-100 bg-secondary-900">{key}</TableHeadCell>
                    ))}
                    <TableHeadCell className="bg-secondary-900">
                        <span className="sr-only">Edit</span>
                    </TableHeadCell>
                    <TableHeadCell className="bg-secondary-900">
                        <span className="sr-only">delete</span>
                    </TableHeadCell>
                </TableRow>
            </TableHead>
            <TableBody className="divide-y">
                {users.map((user) => (
                    <TableRow key={user.id} className="border-gray-700 bg-secondary-800 text-gray-300">
                        <TableCell>
                            {user.id}
                        </TableCell>
                        <TableCell>
                            {user.name}
                        </TableCell>
                        <TableCell>
                            {user.email}
                        </TableCell>
                        <TableCell>
                            {user.password}
                        </TableCell>
                        <TableCell>
                            {user.phone}
                        </TableCell>
                        <TableCell>
                            {user.address}
                        </TableCell>
                        <TableCell>
                            <button 
                                className="font-medium text-tercery-100 hover:text-tercery-50 cursor-pointer"
                                onClick={e => handleEdit(e,user)}
                            >
                                Edit
                            </button>
                        </TableCell>
                        <TableCell>
                            <button 
                                className="font-medium text-red-700 hover:text-red-600 cursor-pointer"
                                onClick={e => handleDelete(e,user.id ? user.id : 0)}
                            >
                                Delete
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}