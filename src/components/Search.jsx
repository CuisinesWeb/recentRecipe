import React, { useState,useEffect } from 'react';
import Typewriter from "./Typewriter";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get the user data from localStorage on component mount
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const saveSearchHistory = async (query, email) => {
        try {
            await axios.post('http://localhost:5000/save-search-history', {
                email: email,
                search_query: query
            });
            console.log('Search history saved successfully');
        } catch (error) {
            console.error('Error saving search history:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        // Check if search query is not empty
        if (!searchQuery.trim()) return;

        const userData = localStorage.getItem('user');

        if (!userData) {
            alert("Please log in to search recipes.");
            navigate('/login');
            return;
        }

        // Parse user data from localStorage
        const userObj = JSON.parse(userData);

        // Save search history
        await saveSearchHistory(searchQuery, userObj.email);

        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    // const handleSearch =  (e) => {
    //     e.preventDefault();

    //     const isLoggedIn = localStorage.getItem('user'); // Check if user is logged in

    //     if (!isLoggedIn) {
    //         alert("Please log in to search recipes.");
    //         navigate('/login'); // Redirect to signup page
    //         return;
    //     }

    //     if (searchQuery.trim()) {
    //         navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    //     }
    // };

    return (
        <div>
            <div className="typewriter-container">
                <Typewriter />
            </div>
            <form onSubmit={handleSearch} className="search-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Search
