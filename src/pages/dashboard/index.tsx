import { useContext, useEffect, useState } from 'react';
import DisplayProducts from '../../components/DisplayProducts';
import Services from '../../components/dasboard/Services';
import { useProduct } from '../../components/CommonFunction';
import { getProductData } from '../../api/api';
import { Product } from '../../@core/interfaces/Interface';
import { UserContext } from '../../App';

const Dashboard = () => {
  const contextValue = useContext(UserContext);
  const productData = useProduct('product', getProductData) as Product[];
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    if (contextValue?.searchProduct) {
      setProduct(productData?.filter((item: Product) =>item?.name?.toLowerCase()?.includes(contextValue?.searchProduct?.toLowerCase())));
    } else {
      setProduct(productData);
    }
  }, [contextValue?.searchProduct, productData]);

  return (
    <div className='main-section'>

      <div className='d-flex p-4 first-product w-100'>
        <div className='w-50 d-flex align-items-center dashboard-ad'>
          <div className='w-100'>
            <p className='dashboard-offer-price fw-bold'>Starting At ₹999</p>
            <h2 className='font-bold fs-1 first-product-header'>The best notebook <br/> collection 2024</h2>
            <h3 className='dashboard-offer-title'>Exclusive offer <span className='text-danger'>-10%</span> off this week</h3>

            <button className='shop-now-button border border-0 rounded bg-white py-3 px-4 fw-bold '>Shop now</button>
          </div>
        </div>
        <div className='w-50 text-center dashboard-ad'>
          <img className='dashboard-ad-image' src='https://shopify-xrh7.onrender.com/hero.png' alt='laptop image' />
        </div>
      </div>

      <Services />

      <div className='m-4'>
        <h2 className='fw-bold'>Trending Products</h2>

        <DisplayProducts products= {product?.slice(0, 12)} />
      </div>

    </div>
  )
}

export default Dashboard;
