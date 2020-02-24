import React, { useState, useEffect } from 'react';

import AllCountryData from './components/allCountryData';
import CompareCountries from './components/compareCountries';

import { SearchIcon, LogoIcon } from './assets/Icons';
import './App.css';

function App() {
  const [ allCountries, setAllCountries ] = useState(null);
  const [ searchResult, setSearchResult ] = useState(null);
  const [ searchClicked, setSearchClicked ] = useState(false);
  const [ addToCompare, setAddToCompare ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ cursor, setCursor ] = useState(null);

  const regions = [ "Africa", "Americas", "Asia", "Europe", "Oceania" ];

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/all`)
    .then(res => res.json())
    .then(result => {
      setAllCountries(result.flat())
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    console.log(cursor);
  }, [cursor])

  const handleChange = (val) => {
    if (!!val) {
      const filteredArray = allCountries.filter(country => country.name.toLowerCase().substr(0, val.length) === val.toLowerCase());
      
      setSearchResult(filteredArray)
    }

    else setSearchResult(null)
  }

  const handleSearchResult = () => {
    if(!!searchResult && !searchClicked) {
      return searchResult.map((country, i) => {
        return (
          <div 
            key={i} 
            className={cursor === i ? "search-list-item-active" : "search-list-item"}
            onClick={() => {
              setSearchResult([country])
              setSearchClicked(true)
            }}
          >
            <p>{country.name}</p>
            <img style={{ height: "2em", width: "3em" }} src={country.flag} alt={country.name} />
          </div>
        )
      })
    }
  }

  const handleModal = (show) => {
    if (show) setShowModal(true)
    else setShowModal(false)
  }

  const handleCompare = (array) => {
    setAddToCompare(array)
  }

  return (
    <div className="App">
      <div className="search-container">
        <div className="search-input-container">
          <div 
            className="logo-container"
            onClick={() => window.location.reload()}
          >
            <LogoIcon />
          </div>
          <input 
            type='text'
            placeholder='Search country by name here ...'
            onBlur={() => setSearchClicked(true)}
            onChange={(e) => {
              handleChange(e.target.value)
              setSearchClicked(false)
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 40) {
                if ((!!cursor || cursor === 0) && cursor < searchResult.length - 1) setCursor(cursor + 1)
                else setCursor(0)
              }
              else if (e.keyCode === 38 && cursor > 0) setCursor(cursor - 1);
              else if (e.keyCode === 13) {
                setSearchClicked(true)
                setSearchResult([searchResult[cursor]])
              };
            }}
          />
          <button
            onClick={() => setSearchClicked(true)}
          >
            <SearchIcon />
            Search
          </button>
        </div>
        <div className={!!searchResult && !searchClicked ? "search-list-container" : "hide"}>
          {handleSearchResult()}
        </div>
      </div>
      <AllCountryData 
        addToCompare={addToCompare}
        regions={regions}
        allCountries={allCountries}
        handleCompare={handleCompare}
        handleModal={handleModal}
        searchClicked={searchClicked}
        searchResult={searchResult}  
      />
      <CompareCountries 
        addToCompare={addToCompare}
        handleCompare={handleCompare}
        handleModal={handleModal}
        searchClicked={searchClicked}
        showModal={showModal} 
      />
    </div>
  );
}

export default App;