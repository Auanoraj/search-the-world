import React from 'react';

export const handleCurrency = (currencies) => {
    if (currencies.length !== 0) {
        return currencies.map((currency, i) => {
            return <p key={i}>{currency.name}<span> ({currency.symbol})</span></p>
        })
    }
}

export const handleLanguages = (languages) => {
    if (languages.length !== 0) {
        return languages.map((language, i) => {
            return <p key={i}>{language.name}<span> ({language.nativeName})</span></p>
        })
    }
}