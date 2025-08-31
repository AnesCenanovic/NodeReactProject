import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchForums } from '../actions';
import ForumCard from './ForumCard'; 
import Pagination from './Pagination'; 

const ForumList = ({ forumsData, fetchForums }) => { 
    const { data, currentPage, totalPages } = forumsData;

    useEffect(() => {
        fetchForums(1);
    }, [fetchForums]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            fetchForums(pageNumber);
        }
    };

    const renderForums = () => {
        if (!data || data.length === 0) {
             return (
                <div className="center-align">
                    <h5>No forums to display.</h5>
                    <p>Create a new forum to get started!</p>
                </div>
            );
        }
        return data.map(forum => (
            <ForumCard key={forum._id} forum={forum} />
        ));
    };

    return (
        <div>
            <h4 className="center-align">Your Collaborative Forums</h4>
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