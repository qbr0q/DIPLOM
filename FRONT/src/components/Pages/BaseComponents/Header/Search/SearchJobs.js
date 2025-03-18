import React, { useState } from 'react';

function SearchField() {
  const professions = require('../../../../appContans.js').professions

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [profession, setProfession] = useState('')

  const searchProfession = (product) => {
    setProfession(product)
    setSearchedProducts([])
  }

  const handleSearch = (event) => {
    let value = event.target.value
    setProfession(value)
    if (value) {
      const newSearchedProducts = [];
      for (let i of professions) {
        let j = i.toLowerCase()
        let lenValue = value.length
        if (j.slice(0, lenValue) === value.toLowerCase()) {
          newSearchedProducts.push(i);
        }
      }
      setSearchedProducts(newSearchedProducts);
    } else {
      setSearchedProducts([]);
    }
  };

  return (
    <div className='SearchJobField'>
      <input
        type="text"
        className="searchJobInput"
        onChange={handleSearch}
        placeholder="Должность или компания"
        value={profession}
      />
      <ul className="jobs">
        {searchedProducts.map((product) => (
          <li onClick={() => searchProfession(product)}>{product}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchField