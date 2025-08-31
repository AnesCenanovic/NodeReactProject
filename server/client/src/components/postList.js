import React, { useEffect, useState } from 'react'; 
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import PostCard from './PostCard';
import Pagination from './Pagination';
import ContentFilter from './ContentFilter'; 

const PostList = ({ postsData, fetchPosts }) => {
    const { data: posts, currentPage, totalPages } = postsData;

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);

    const handlePageChange = (pageNumber) => {
        fetchPosts(pageNumber);
    };

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderPosts = () => {
        if (!posts) return null; 
        if (filteredPosts.length === 0) {
            return <p>No posts found.</p>;
        }
        return filteredPosts.map(post => (
            <PostCard key={post._id} post={post} />
        ));
    };

    return (
        <div>
            <ContentFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search posts by title..."
            />
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
    return { postsData: posts };
};

export default connect(mapStateToProps, { fetchPosts })(PostList);