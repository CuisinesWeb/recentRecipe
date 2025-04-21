import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/searchHistory.css';

const SearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        
        const userObj = JSON.parse(userData);
        setUser(userObj);
        fetchSearchHistory(userObj.email);
    }, [navigate]);

    const fetchSearchHistory = async (email) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/user-search-history?email=${email}`);
            setSearchHistory(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch search history');
            setLoading(false);
            console.error('Error fetching search history:', err);
        }
    };

    const handleSearchClick = (query) => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Group searches by date
    const groupSearchesByDate = () => {
        const groupedSearches = {};
        
        searchHistory.forEach(item => {
            const date = new Date(item.timestamp).toLocaleDateString();
            if (!groupedSearches[date]) {
                groupedSearches[date] = [];
            }
            groupedSearches[date].push(item);
        });
        
        return groupedSearches;
    };

    if (loading) return (
        <div className="search-history-container">
            <div className="loading">Loading search history...</div>
        </div>
    );
    
    if (error) return (
        <div className="search-history-container">
            <div className="error">{error}</div>
        </div>
    );

    const groupedSearches = groupSearchesByDate();

    return (
        <div className="search-history-container">
            <div className="search-history-header">
                <h1>Your Search History</h1>
                <p>View and re-run your previous recipe searches</p>
            </div>
            
            {searchHistory.length === 0 ? (
                <div className="no-history">
                    <i className="fa-solid fa-search fa-2x"></i>
                    <p>You haven't searched for any recipes yet</p>
                    <button onClick={() => navigate('/')} className="start-searching-btn">
                        Start Searching
                    </button>
                </div>
            ) : (
                <div className="search-history-content">
                    {Object.keys(groupedSearches).map(date => (
                        <div key={date} className="search-history-group">
                            <h3 className="search-date">{date}</h3>
                            <ul className="search-history-list">
                                {groupedSearches[date].map(item => (
                                    <li key={item.id} className="search-history-item">
                                        <div onClick={() => handleSearchClick(item.query)} className="search-item-content">
                                            <span className="search-query">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                                {item.query}
                                            </span>
                                            <span className="search-time">
                                                {new Date(item.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchHistory;