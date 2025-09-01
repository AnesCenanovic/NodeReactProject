import React, { useEffect, useState } from 'react'; 
import { connect } from 'react-redux';
import { fetchForums } from '../actions';
import ForumCard from './ForumCard';
import Pagination from './Pagination';
import ContentFilter from './ContentFilter'; 

const ForumList = ({ forumsData, fetchForums }) => {
    const { data: forums, currentPage, totalPages } = forumsData;

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all'); 

    useEffect(() => {
        fetchForums(1);
    }, [fetchForums]);

    const handlePageChange = (pageNumber) => {
        fetchForums(pageNumber);
    };

    const filteredForums = forums.filter(forum => {
        const matchesType = typeFilter === 'all' || forum.type === typeFilter;
        const matchesSearch = forum.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const forumFilterOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'workshop', label: 'Workshop' },
        { value: 'event', label: 'Event' },
        { value: 'seminar', label: 'Seminar' }
    ];

    const renderForums = () => {
        if (!forums) return null;
        if (filteredForums.length === 0) return <p>No forums match the criteria.</p>;
        return filteredForums.map(forum => (
            <ForumCard key={forum._id} forum={forum} />
        ));
    };

    return (
        <div>
            <h4 className="center-align">Your Collaborative Forums</h4>
            <ContentFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search forums by title..."
                filterValue={typeFilter}
                onFilterChange={setTypeFilter}
                filterOptions={forumFilterOptions}
                filterLabel="Filter by Type"
            />
            {renderForums()}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

const mapStateToProps = ({ forums }) => {
    return { forumsData: forums };
};

export default connect(mapStateToProps, { fetchForums })(ForumList);