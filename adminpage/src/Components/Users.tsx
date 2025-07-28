import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  profilePhotoUrl?: string;
  createdAt: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>('');

  useEffect(() => {
    fetch('https://foodapp-backend-a3ew.onrender.com/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://foodapp-backend-a3ew.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
        alert('User deleted successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`https://foodapp-backend-a3ew.onrender.com/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        alert('Role updated successfully!');
        setEditingUser(null);
        // Optional: refresh list
        const updatedUsers = users.map((u) =>
          u._id === editingUser._id ? { ...u, role: newRole } : u
        );
        setUsers(updatedUsers);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update role');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow p-4 rounded-lg flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
              {user.profilePhotoUrl ? (
                <img
                  src={`https://foodapp-backend-a3ew.onrender.com${user.profilePhotoUrl}`}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  N/A
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>Role: {user.role}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(user)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Role
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Role for {editingUser.username}</h3>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
