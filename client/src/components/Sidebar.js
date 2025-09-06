import React, { useEffect, useState } from 'react'; // <-- 1. Import useState
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import UserCard from './UserCard';
import UserFilter from './UserFilter'; // <-- 2. Import the filter component

const Sidebar = ({ users, fetchUsers }) => {
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // --- 3. ADD LOCAL STATE FOR FILTERS ---
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all'); // 'all' is the default

     if (!users) {
        return <div>Loading users...</div>;
    }

    const filteredUsers = users.filter(user => {

        if (!user || !user.role || !user.name) {
            return false; 
        }
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesRole && matchesSearch;
    });


    return (
        <div>
            {/* --- 5. RENDER THE FILTER CONTROLS --- */}
            {/* We pass the state and the functions to change the state down as props */}
            <UserFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                roleFilter={roleFilter}
                onRoleChange={setRoleFilter}
            />
            
            {/* --- 6. MAP OVER THE FILTERED ARRAY --- */}
            {/* Instead of mapping over `users`, we map over `filteredUsers` */}
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => <UserCard key={user._id} user={user} />)
            ) : (
                <p style={{ textAlign: 'center' }}>No users match the criteria.</p>
            )}
        </div>
    );
};

const mapStateToProps = ({ users }) => {
    return { users: users };
};

export default connect(mapStateToProps, { fetchUsers })(Sidebar);