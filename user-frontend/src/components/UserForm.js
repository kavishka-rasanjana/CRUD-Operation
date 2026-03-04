import React from 'react';

const UserForm = ({ formData, handleInputChange, saveUser, updateUser, isUpdate }) => {
    return (
        <div className="card p-4 mb-4 bg-light shadow-sm">
            <div className="row g-3">
                {/* ID Input */}
                <div className="col-md-3">
                    <input 
                        type="text" name="id" className="form-control" placeholder="User ID"
                        value={formData.id} onChange={handleInputChange} disabled={isUpdate}
                    />
                </div>

                {/* Name Input */}
                <div className="col-md-4">
                    <input 
                        type="text" name="name" className="form-control" placeholder="User Name"
                        value={formData.name} onChange={handleInputChange}
                    />
                </div>

                {/* Age Input - මෙන්න මේක තමයි ඔයා ඇහුවේ */}
                <div className="col-md-3">
                    <input 
                        type="number" 
                        name="age" 
                        className="form-control" 
                        placeholder="Age"
                        value={formData.age} 
                        onChange={handleInputChange} 
                    />
                </div>

                {/* Buttons */}
                <div className="col-md-2 d-grid">
                    <button 
                        onClick={isUpdate ? updateUser : saveUser} 
                        className={`btn ${isUpdate ? 'btn-warning' : 'btn-primary'}`}
                    >
                        {isUpdate ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;