import React from 'react'
import SideBar from "Common/SideBar/SideBar";
import SearchBar from 'Common/SearchBar/SearchBar';
import DefaultPage from 'Pages/Chat/DefaultPage/DefaultPage'

function SearchSingleContact() {
    return (
        <div className="main-container">
          <section className="sidebar">
            <SideBar />
          </section>
          <section className="contact-list">
             <SearchBar/>
          </section>
        
            <seciton className="default-page">
              <DefaultPage />
            </seciton>

        </div>
      );
}

export default SearchSingleContact