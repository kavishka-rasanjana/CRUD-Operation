import React, { useState, useEffect } from 'react';
import api from './api';
import UserForm from './components/UserForm';

function App() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', age: '' });
    const [isUpdate, setIsUpdate] = useState(false);

    // සියලුම පරිශීලකයින් ලබා ගැනීම
    const getUsers = () => {
        api.get("/getusers")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users:", err));
    };

    useEffect(() => { 
        getUsers(); 
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // අලුත් පරිශීලකයෙකු ඇතුළත් කිරීම (Add)
    const saveUser = () => {
        // වැදගත්: ID එක නැතිව නම සහ වයස පමණක් යවන්න
        const payload = {
            name: formData.name,
            age: parseInt(formData.age)
        };

        api.post("/adduser", payload)
            .then(() => {
                getUsers();
                setFormData({ id: '', name: '', age: '' });
                alert("User Added Successfully!");
            })
            .catch(err => {
                console.error("Add Error:", err);
                alert("Failed to add user. Check console for details.");
            });
    };

    // පවතින පරිශීලකයෙකු යාවත්කාලීන කිරීම (Update)
    const updateUser = () => {
        // මෙතනදී අනිවාර්යයෙන්ම ID එක තිබිය යුතුයි
        const payload = {
            id: parseInt(formData.id),
            name: formData.name,
            age: parseInt(formData.age)
        };

        api.put("/updateuser", payload)
            .then(() => {
                getUsers();
                setFormData({ id: '', name: '', age: '' });
                setIsUpdate(false);
                alert("User Updated Successfully!");
            })
            .catch(err => {
                console.error("Update Error:", err);
                alert("Failed to update user. Check console for details.");
            });
    };

    // පරිශීලකයෙකු මැකීම (Delete)
    const deleteUser = (user) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            api.delete("/deleteuser", { data: user })
                .then(() => {
                    getUsers();
                    alert("User Deleted!");
                })
                .catch(err => console.error("Delete Error:", err));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Management System</h2>
            
            <UserForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                saveUser={saveUser} 
                updateUser={updateUser} 
                isUpdate={isUpdate} 
            />

            <table className="table table-bordered shadow-sm bg-white">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.age}</td>
                                <td className="text-center">
                                    <button 
                                        className="btn btn-sm btn-info me-2" 
                                        onClick={() => {
                                            setFormData(u); 
                                            setIsUpdate(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger" 
                                        onClick={() => deleteUser(u)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No Users Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;