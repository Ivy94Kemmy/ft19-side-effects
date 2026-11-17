import { useState, useEffect } from 'react';
import { BASE_URL } from '../../lib/utils';

const emptyUser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
};

export default function UserForm({ onUserAdded, userToEdit, onCancel }) {
    const [user, setUser] = useState(emptyUser);

    useEffect(() => {
        if (userToEdit) {
            setUser({
                firstName: userToEdit.firstName,
                lastName: userToEdit.lastName,
                email: userToEdit.email,
                phone: userToEdit.phone,
                dob: userToEdit.dob,
            });
        } else {
            setUser(emptyUser);
        }
    }, [userToEdit]);

    function handleSubmit(event) {
        event.preventDefault();

        const isEditing = Boolean(userToEdit);

        fetch(
            isEditing
                ? `${BASE_URL}/users/${userToEdit.id}`
                : `${BASE_URL}/users`,
            {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Saving user failed');
                }

                return response.json();
            })
            .then(() => {
                setUser(emptyUser);
                onUserAdded();
            })
            .catch((error) => console.error(error));
    }

    return (
        <form
            className="border px-5 py-8 min-w-3xs flex flex-col gap-3 rounded-2xl shadow-lg overflow-clip shadow-slate-200 border-gray-800/10"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <h2 className="font-bold text-2xl font-barlow">
                    {userToEdit ? 'Edit User Details' : 'User Details'}
                </h2>

                <p className="text-slate-500 text-sm font-sans">
                    {userToEdit
                        ? 'Update your information below'
                        : 'Enter your information below'}
                </p>
            </div>

            <div className="flex items-center gap-5 w-full">
                <input
                    type="text"
                    className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
                    placeholder="Firstname"
                    value={user.firstName}
                    onChange={(event) =>
                        setUser({ ...user, firstName: event.target.value })
                    }
                />

                <input
                    type="text"
                    className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
                    placeholder="Lastname"
                    value={user.lastName}
                    onChange={(event) =>
                        setUser({ ...user, lastName: event.target.value })
                    }
                />
            </div>

            <input
                type="email"
                className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
                placeholder="Email"
                value={user.email}
                onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                }
            />

            <input
                type="tel"
                className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
                placeholder="Phone number"
                value={user.phone}
                onChange={(event) =>
                    setUser({ ...user, phone: event.target.value })
                }
            />

            <label className="flex flex-col text-slate-900 gap-1">
                Date of Birth

                <input
                    type="date"
                    className="border border-slate-300 w-full outline-blue-500 rounded-md p-3 font-sans"
                    value={user.dob}
                    onChange={(event) =>
                        setUser({ ...user, dob: event.target.value })
                    }
                />
            </label>

            <button
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-md mt-5 cursor-pointer"
            >
                {userToEdit ? 'Update' : 'Submit'}
            </button>

            {userToEdit && (
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-3 bg-gray-200 text-gray-700 rounded-md cursor-pointer"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

