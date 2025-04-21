import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/searchHistory.css';

const SearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [filterOption, setFilterOption] = useState('all'); // 'all', 'today', 'week', 'month'
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

    const clearHistory = async () => {
        if (window.confirm('Are you sure you want to clear your search history?')) {
            try {
                // Implement the clear history endpoint in your backend
                await axios.delete(`http://localhost:5000/clear-search-history?email=${user.email}`);
                setSearchHistory([]);
            } catch (err) {
                console.error('Error clearing search history:', err);
                alert('Failed to clear search history. Please try again.');
            }
        }
    };

    // Filter search history based on selected option
    const filterSearchHistory = () => {
        if (filterOption === 'all') return searchHistory;
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        
        return searchHistory.filter(item => {
            const itemDate = new Date(item.timestamp);
            if (filterOption === 'today') {
                return itemDate >= today;
            } else if (filterOption === 'week') {
                return itemDate >= weekAgo;
            } else if (filterOption === 'month') {
                return itemDate >= monthAgo;
            }
            return true;
        });
    };

    // Group searches by date
    const groupSearchesByDate = () => {
        const filteredSearches = filterSearchHistory();
        const groupedSearches = {};
        
        filteredSearches.forEach(item => {
            const date = new Date(item.timestamp).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
            
            if (!groupedSearches[date]) {
                groupedSearches[date] = [];
            }
            groupedSearches[date].push(item);
        });
        
        return groupedSearches;
    };

    if (loading) return (
        <div className="search-history-container">
            <div className="loading">Loading your search history</div>
        </div>
    );
    
    if (error) return (
        <div className="search-history-container">
            <div className="error">{error}</div>
        </div>
    );

    const groupedSearches = groupSearchesByDate();
    const hasSearches = Object.keys(groupedSearches).length > 0;

    return (
        <div className="search-history-container">
            <div className="search-history-header">
                <h1>Your Search History</h1>
                <p>View and revisit your previous recipe searches</p>
            </div>
            
            {hasSearches && (
                <div className="filter-section">
                    <div>
                        <span className="filter-label">Filter by:</span>
                        <div className="filter-options">
                            <div 
                                className={`filter-option ${filterOption === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterOption('all')}
                            >
                                All Time
                            </div>
                            <div 
                                className={`filter-option ${filterOption === 'today' ? 'active' : ''}`}
                                onClick={() => setFilterOption('today')}
                            >
                                Today
                            </div>
                            <div 
                                className={`filter-option ${filterOption === 'week' ? 'active' : ''}`}
                                onClick={() => setFilterOption('week')}
                            >
                                This Week
                            </div>
                            <div 
                                className={`filter-option ${filterOption === 'month' ? 'active' : ''}`}
                                onClick={() => setFilterOption('month')}
                            >
                                This Month
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {!hasSearches ? (
                <div className="no-history">
                    <div className="empty-state-illustration">
                        {/* SVG illustration or icon could go here */}
                    </div>
                    <p>You haven't searched for any recipes yet. Start exploring our recipe collection!</p>
                    <button onClick={() => navigate('/')} className="start-searching-btn">
                        Explore Recipes
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
                                                {item.query}
                                            </span>
                                            <span className="search-time">
                                                {new Date(item.timestamp).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    
                    {hasSearches && (
                        <button onClick={clearHistory} className="clear-history-btn">
                            Clear Search History
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchHistory;