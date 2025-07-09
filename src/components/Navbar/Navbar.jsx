import React, { useState } from 'react';
import ProfileInfo from '../cards/ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import noteLogo from "../../assets/images/note.png"; 

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // 👇 Hide SearchBar on login and signup routes
  const hideSearchBar = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className='bg-blue-500 flex items-center justify-between px-3 py-2 drop-shadow'>
      <div className='flex items-center'>
        <img src={noteLogo} alt="logo" className="h-9 w-9 mr-2" />
        <h2 className='text-xl font-bold text-amber-50 py-1'>Keep Notes</h2>
      </div>

      {/* 👇 Conditionally render SearchBar */}
      {!hideSearchBar && (
        <SearchBar 
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;

