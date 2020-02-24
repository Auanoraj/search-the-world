import React from 'react';
import { handleCurrency, handleLanguages } from '../utils';

const CompareCountries = ({ addToCompare, handleCompare, handleModal, searchClicked, showModal }) => {

    const handleAddToCompareItems = () => {

      const handleRemoveItem = (country) => {
        let dummyArray = [...addToCompare], index = addToCompare.indexOf(country);
    
        if (addToCompare.includes(country)) {
          dummyArray.splice(index, 1)
          handleCompare(dummyArray)
        }
      }

      if (addToCompare.length !== 0) {
        return addToCompare.map((country, i) => {
          return (
            <div key={i} className="comparison-item">
              <span 
                className={!!searchClicked ? "show" : "hide"}
                onClick={() => handleRemoveItem(country)}
              >
                &times;
              </span>
              <div className="comparison-item-image-container">
                <img src={country.flag} />
                <p>{country.name}</p>
              </div>
              <div className="comparison-item-data-container">
                <p>{country.name}</p>
                <p>{country.nativeName}</p>
                <p>{country.capital}</p>
                <p>{country.region}</p>
                <p>{country.subregion}</p>
                <p>{!!country.area ? `${country.area} sq. km` : "Not available"}</p>
                <p>{country.population}</p>
                <p>{country.latlng[0]}</p>
                <p>{country.latlng[1]}</p>
                <div className="comparison-currency">{handleCurrency(country.currencies)}</div>
                <div className="comparison-language">{handleLanguages(country.languages)}</div>
              </div>
            </div>
          )
        })
      }

      else handleModal(false)
    }

    return (
        <div className={showModal ? "modal-container" : "hide"}>
            <div className="modal-content">
              <div className="modal-content-inner-container">
                <span 
                    className="close"
                    onClick={() => {
                      if(!!searchClicked) handleModal(false)
                      else {
                        handleCompare([])
                        handleModal(false)
                      }
                    }}
                >
                    &times;
                </span>
              
                <div className="comparison-item-fields-container">
                  <p>Name: </p>
                  <p>Native Name: </p>
                  <p>Capital: </p>
                  <p>Region: </p>
                  <p>Sub-region: </p>
                  <p>Area: </p>
                  <p>Population: </p>
                  <p>Latitude: </p>
                  <p>Longitude: </p>
                  <p>Currencies: </p>
                  <p>Languages: </p>
                </div>
                <div className="comparison-items-container">
                    {handleAddToCompareItems()}
                </div>
              </div>
            </div>
        </div>
    )
}

export default CompareCountries;