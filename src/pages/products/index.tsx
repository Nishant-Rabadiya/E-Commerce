import React, { useContext, useEffect, useState } from 'react';
import DisplayProducts from '../../components/DisplayProducts';
import { useProduct } from '../../components/CommonFunction';
import { UserContext } from '../../App';
import { getProductData } from '../../api/api';
import { Product } from '../../@core/interfaces/Interface';

const Products = () => {
  const contextValue = useContext(UserContext);

  const productData = useProduct('product', getProductData) as Product[];
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);

  useEffect(() => {
    setFilterProduct(productData?.filter((item: Product) =>item.name.toLowerCase().includes(contextValue.searchProduct.toLowerCase())));
  }, [contextValue?.searchProduct, productData]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let sortedProducts: Product[] = [...productData];
    switch (event?.target?.value) {
      case 'PriceLowToHigh':
        sortedProducts?.sort((a: Product, b: Product) => a?.price - b?.price);
        break;
      case 'PriceHighToLow':
        sortedProducts?.sort((a: Product, b: Product) => b?.price - a?.price);
        break;
      default:
        sortedProducts = productData;
        break;
    }
    setFilterProduct(sortedProducts);
  };
  

  return (
    <div className='p-3 main-section'>
      <div className='d-flex justify-content-between p-2'>
        <p className='fs-5 m-0'>Products</p>

        <div className='dropdown'>
        <select
            className='form-select'
            onChange={handleSortChange}
          >
            <option value='Default'>Default</option>
            <option value='PriceLowToHigh'>Price (low to high)</option>
            <option value='PriceHighToLow'>Price (high to low)</option>
          </select>
        </div>
      </div>

      <div className='p-2'>
        <DisplayProducts products={filterProduct} />
      </div>
    </div>
  )
}

export default Products;
