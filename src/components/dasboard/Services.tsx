import React from 'react';

const Services = () => {
  return (
    <div className='services d-flex mt-4 mx-3'>

      <div className='d-flex mx-1 p-3 w-25 service-section'>
        <span className='service-title fs-4'><i className='fa-solid fa-truck-fast'></i></span>
        <div className='px-2'>
            <p className='service-title m-0 fs-4 '>Free Delivery</p>
            <p className='m-0 text-secondary'>Orders from all items</p>
        </div>
      </div>

      <div className='d-flex mx-1 p-3 w-25 service-section'>
        <span className='service-title fs-4'><i className='fa-solid fa-arrow-rotate-left'></i></span>
        <div className='px-2'>
            <p className='service-title m-0 fs-4 '>Return & Refund</p>
            <p className='m-0 text-secondary'>Money back guarantee</p>
        </div>
      </div>

      <div className='d-flex mx-1 p-3 w-25 service-section'>
        <span className='service-title fs-4'><i className='fa-solid fa-tags'></i></span>
        <div className='px-2'>
            <p className='service-title m-0 fs-4 '>Member Discount</p>
            <p className='m-0 text-secondary'>On order over ₹99</p>
        </div>
      </div>

      <div className='d-flex mx-1 p-3 w-25 service-section'>
        <span className='service-title fs-4'><i className='fa-solid fa-headset'></i></span>
        <div className='px-2'>
            <p className='service-title m-0 fs-4 '>Support 24/7</p>
            <p className='m-0 text-secondary'>Contact us 24 hours a day</p>
        </div>
      </div>

    </div>
  )
}

export default Services;
