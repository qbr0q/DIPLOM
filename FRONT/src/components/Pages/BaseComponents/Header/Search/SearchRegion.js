import React, {useState} from 'react';

function SearchRegion() {
    const regions = require('../../../../appContans.js').regions

    const [searchedRegion, setSearchedRegion] = useState([]);
    const [region, setRegion] = useState('')
  
    const searchRegion = (region_name) => {
      setRegion(region_name)
      setSearchedRegion([])
    }
  
    const handleSearch = (event) => {
      let value = event.target.value
      setRegion(value)
      if (value) {
        const newSearchedRegions = [];
        for (let i of regions) {
          let j = i.toLowerCase()
          let lenValue = value.length
          if (j.slice(0, lenValue) === value.toLowerCase()) {
            newSearchedRegions.push(i);
          }
        }
        setSearchedRegion(newSearchedRegions);
      } else {
        setSearchedRegion([]);
      }
    };
  
    return (
      <div className='SearchRegionField'>
        <input
          type="text"
          className="searchRegionInput"
          onChange={handleSearch}
          placeholder="Регион"
          value={region}
        />
        <ul className="regions">
          {searchedRegion.map((region) => (
            <li onClick={() => searchRegion(region)}>{region}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default SearchRegion