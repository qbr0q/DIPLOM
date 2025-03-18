import React, {useState} from 'react';

function SearchProduct() {
  const [productMenuStyle, setProductMenuStyle] = useState(false)
  const [product, setProduct] = useState('Вакансии')

  const toggleProducts = () => {
    setProductMenuStyle(!productMenuStyle)
  }

  const searchedproduct = (productName) => {
    setProduct(productName)
    toggleProducts()
  } 

  return (
          <div className="searchProduct">
            <button className="productBtn" onClick={toggleProducts}>{product}</button>
            <ul className="products" style={{display: productMenuStyle ? 'block' : 'none'}}>
              <li onClick={() => searchedproduct('Вакансии')}>Вакансии</li>
              <li onClick={() => searchedproduct('Резюме')}>Резюме</li>
              <li onClick={() => searchedproduct('Компании')}>Компании</li>
              <li onClick={() => searchedproduct('Резюме')}>Резюме</li>
             </ul>
          </div>
  )
}

export default SearchProduct