import React from 'react';

const ContentFilter = ({ 
    searchTerm, 
    onSearchChange, 
    placeholder, 
    filterValue, 
    onFilterChange, 
    filterOptions,
    filterLabel
}) => {
    return (
        <div className="themed-filter">
            <div className="input-field">
                <input 
                    id="content_search" 
                    type="text" 
                    placeholder={placeholder || 'Search...'} 
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)} 
                />
            </div>

            {filterOptions && filterOptions.length > 0 && (
                <div className="input-field">
                    {filterLabel && <label style={{ position: 'relative' }}>{filterLabel}</label>}
                    <select 
                        className="browser-default"
                        value={filterValue}
                        onChange={e => onFilterChange(e.target.value)}
                    >
                        {filterOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default ContentFilter;