
import { useState, useEffect } from 'react';
import { BASE_URL } from '../lib/utils';
import UserForm from '../components/user/user-form';
import UserCard from '../components/user/user-card';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    function fetchAllUsers() {
        fetch(`${BASE_URL}/users`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fetching users failed');
                }

                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    function handleEdit(user) {
        setSelectedUser(user);
    }

    function handleUserSaved() {
        setSelectedUser(null);
        fetchAllUsers();
    }

    function handleDelete(id) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        );

        if (!confirmDelete) return;

        fetch(`${BASE_URL}/users/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Deleting user failed');
                }

                if (selectedUser?.id === id) {
                    setSelectedUser(null);
                }

                fetchAllUsers();
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-2">
                    <UserForm
                        onUserAdded={handleUserSaved}
                        userToEdit={selectedUser}
                        onCancel={() => setSelectedUser(null)}
                    />
                </div>

                <div className="col-span-3 flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-5">
                        {users.map((user) => (
                            <UserCard
                                key={user.id}
                                {...user}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

