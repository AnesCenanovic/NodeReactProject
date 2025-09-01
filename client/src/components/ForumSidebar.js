import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchForums } from '../actions'; 

const ForumSidebar = ({ forums, fetchForums }) => {
    useEffect(() => {
        fetchForums();
    }, [fetchForums]);

    return (
        <div>
            <h5>Your Forums</h5>
            <div className="collection">
                {forums.map(forum => (
                    <a href="#!" className="collection-item" key={forum._id}>
                        {forum.title}
                    </a>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = ({ forums }) => ({ forums });
export default connect(mapStateToProps, { fetchForums })(ForumSidebar);