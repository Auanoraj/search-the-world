import React from 'react';
import { handleCurrency } from '../utils'

const AllCountryData = ({ addToCompare, allCountries, handleCompare, handleModal, regions, searchClicked, searchResult }) => {

    const handleAllData = () => {

        const handleRegionalCountriesData = (region) => {
    
          return allCountries.map((country, i) => {
            if (country.region === region) {
              return (
                <div 
                  key={i} 
                  className="country-data-inner-container"
                  onClick={() => {
                    handleCompare([country])
                    handleModal(true)
                  }}  
                >
                  <div className="data-container">
                    <p><span>Name: </span>{country.name}</p>
                    <p><span>Capital: </span>{country.capital}</p>
                    <p><span>Population: </span>{country.population}</p>
                  </div>
                  <div className="image-container">
                    <img src={country.flag} />
                  </div>
                </div>
              )
            }
          })
        }
    
        const handleChecked = (country) => {
          if (!!addToCompare) {
            let dummyArray = [...addToCompare], index = addToCompare.indexOf(country);
    
            if (addToCompare.includes(country)) {
              dummyArray.splice(index, 1)
              handleCompare(dummyArray)
            }
    
            else {
              dummyArray.push(country)
              handleCompare(dummyArray)
            }
          }
          else handleCompare([country])
        }
    
        if (!!allCountries && !searchClicked) {
          return regions.map((region, i) => {
            return (
              <div key={i} className="region-data-outer-container">
                <h1>{region}</h1>
                <div className="region-data-inner-container">
                  {handleRegionalCountriesData(region)}
                </div>
              </div>
            )
          })
        }
    
        else if (!!searchClicked) {
          return (
            <div className="search-results-container">
              {
                searchResult.map((country, i) => {
                  return (
                    <div key={i} className="search-results-outer-container">
                      <div className="search-results-inner-container">
                        <div className="data-container">
                          <p><span>Name: </span>{country.name}</p>
                          <p><span>Capital: </span>{country.capital}</p>
                          <p><span>Population: </span>{country.population}</p>
                        </div>
                        <div className="search-results-image-container">
                          <img src={country.flag} />
                          <p>{country.nativeName}</p>
                        </div>
                      </div>
                      <div className="currency-container">
                        <span>Currencies: </span>
                        <div className="handle-currency-div">
                          {handleCurrency(country.currencies)}
                        </div>
                      </div>
                      <div className="compare-container">
                        <input 
                          className="checkbox_input"
                          type="checkbox" 
                          checked={!!addToCompare.includes(country)}
                          disabled={!addToCompare.includes(country) && addToCompare.length === 3 ? true : false}
                          onChange={() => handleChecked(country)}  
                        />
                        <span className={!addToCompare.includes(country) && addToCompare.length >= 3 ? "tooltiptext" : 'hide'}>you can only add 3 for comparision</span>
                        <p>Add to compare</p>
                      </div>
                    </div>
                  )
                }
              )
            }
          </div>
        )
      }
    }

    return (
        <div className="country-data-outer-container">
            {handleAllData()}
            <div 
                onClick={() => handleModal(true)}
                className={!!searchClicked && addToCompare.length !== 0 ? "comparison-modal-container" : "hide"}
            >
                <p>Compare <span>{addToCompare.length}</span></p>
            </div>
        </div>
    )
}

export default AllCountryData;