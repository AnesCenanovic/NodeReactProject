import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpecialists } from '../actions'; 
import SpecialistCard from './SpecialistCard'; 

const SpecialistsPage = ({ auth, specialists, fetchSpecialists }) => {
    console.log('SpecialistsPage is rendering with props.specialists:', specialists);
    useEffect(() => {
        fetchSpecialists();
    }, [fetchSpecialists]);

    // ONLY visible to admins
    const renderAdminButton = () => {
        if (auth && auth.role === 'admin') {
            return (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Link to="/admin/specialists/new" className="btn-large green">
                        Add New Specialist
                    </Link>
                </div>
            );
        }
    };

    return (
        <div>
            <h2 className="center-align">Our Specialists</h2>
            {renderAdminButton()}
            <div className="specialist-grid">
                {specialists.map((specialist, index) => {
                    return <SpecialistCard key={specialist._id} specialist={specialist} />
                })}
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth, specialists }) => ({ auth, specialists });
export default connect(mapStateToProps, { fetchSpecialists })(SpecialistsPage);