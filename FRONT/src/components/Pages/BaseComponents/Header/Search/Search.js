import React from 'react';
import '../../../../../css/BaseCss/search.css';
import SearchJobs from './SearchJobs';
import SearchProduct from './SeacrhProduct';
import SearchRegion from './SearchRegion';
import SearchBtn from './SearchBtn';

class Search extends React.Component {
  render() {
    return (
      <div className='search'>
        <SearchJobs/>
        <SearchProduct/>
        <SearchRegion/>
        <SearchBtn/>
      </div>
    );
  }
}

export default Search