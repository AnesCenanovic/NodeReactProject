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

    // --- 4. THE FILTERING LOGIC ---
    // We apply the filters before we map and render the cards.
    const filteredUsers = users.filter(user => {
        // Role filter logic
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        // Search term logic (case-insensitive)
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // A user is shown only if they match BOTH the role and search filters
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
    return { users };
};

export default connect(mapStateToProps, { fetchUsers })(Sidebar);