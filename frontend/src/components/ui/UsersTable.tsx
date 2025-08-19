import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { FC, JSX } from "react";
import type { User } from "../../types";

interface PropsList {
    users: User[]
}

export const UsersTable:FC<PropsList> = ({ users }): JSX.Element =>{
    const user: User = {
        id: 0,
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    }
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
                {users.map(user => (
                    <TableRow className="border-gray-700 bg-secondary-800 text-gray-300">
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
                            <a href="#" className="font-medium text-tercery-100 hover:underline">
                                Edit
                            </a>
                        </TableCell>
                        <TableCell>
                            <a href="#" className="font-medium text-red-700 hover:underline">
                                Delete
                            </a>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}