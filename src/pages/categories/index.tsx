import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useSearchParams } from 'react-router-dom';
import DisplayProducts from '../../components/DisplayProducts';
import { useProduct } from '../../components/CommonFunction';
import { getProductData } from '../../api/api';
import { Product } from '../../@core/interfaces/Interface';
import { UserContext } from '../../App';

const Categories = () => {
  const navigate: NavigateFunction = useNavigate();
  const contextValue = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const productCategory: string | null = searchParams.get('category');
  const productData = useProduct('product', getProductData) as Product[];
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    let categoryFilteredProducts: Product[] = productData;

    if (productCategory) {
      categoryFilteredProducts = productData?.filter((product: Product) =>
        product?.category === productCategory
      );
    }

    if (contextValue?.searchProduct) {
      categoryFilteredProducts = categoryFilteredProducts?.filter((item: Product) =>
        item?.name?.toLowerCase()?.includes(contextValue?.searchProduct?.toLowerCase())
      );
    }

    setFilteredProducts(categoryFilteredProducts);
  }, [contextValue?.searchProduct, productCategory, productData]);

  const handleCategoryProduct = (value: string): void => {
    navigate(`/categories?category=${value}`);
  }

  return (
    <div className='p-4 main-section'>
      <div className='p-2'>
        <p className='fs-5 m-0'>Categories <span className='fw-bolder'>{productCategory ? ` > ${productCategory}` : ''}</span></p>
      </div>

      {
        productCategory ?
          <DisplayProducts products={filteredProducts} />
          :
          <div className='display-categories'>
            <div className='bg-body-secondary p-3'>
              <p className='m-0 fs-5 font-monospace'>Furniture</p>
              <p className='m-0 text-primary view-product' onClick={() => handleCategoryProduct('furniture')}>View products</p>
            </div>

            <div className='bg-body-secondary p-3'>
              <p className='m-0 fs-5 font-monospace'>Laptop</p>
              <p className='m-0 text-primary view-product' onClick={() => handleCategoryProduct('laptops')}>View products</p>
            </div>

            <div className='bg-body-secondary p-3'>
              <p className='m-0 fs-5 font-monospace'>Mens watches</p>
              <p className='m-0 text-primary view-product' onClick={() => handleCategoryProduct('mens-watches')}>View products</p>
            </div>

            <div className='bg-body-secondary p-3'>
              <p className='m-0 fs-5 font-monospace'>Motorcycle</p>
              <p className='m-0 text-primary view-product' onClick={() => handleCategoryProduct('motorcycle')}>View products</p>
            </div>

            <div className='bg-body-secondary p-3'>
              <p className='m-0 fs-5 font-monospace'>Vehicle</p>
              <p className='m-0 text-primary view-product' onClick={() => handleCategoryProduct('vehicle')}>View products</p>
            </div>
          </div>
      }
    </div>
  )
}

export default Categories;
