import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import PostCard from './PostCard';
import Pagination from './Pagination'; 

const PostList = ({ postsData, fetchPosts }) => { 
    console.log('PostList received postsData prop:', postsData);
    const { data, currentPage, totalPages } = postsData;

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);
    const handlePageChange = (pageNumber) => {
        fetchPosts(pageNumber);
    };

    const renderPosts = () => {
        return data.map(post => (
            <PostCard key={post._id} post={post} />
        ));
    };

    return (
        <div>
            {renderPosts()}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

const mapStateToProps = ({ posts }) => {
    return { postsData: posts }; // Pass the whole object
};

export default connect(mapStateToProps, { fetchPosts })(PostList);