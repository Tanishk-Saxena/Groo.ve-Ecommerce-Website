import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home  = ({products_query_req, banner_query_req}) => {
  return (
    <>
      <HeroBanner heroBanner = {banner_query_req.length && banner_query_req[0]}/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products_query_req?.map((product)=>(<Product key={product._id} product={product}/>))}
      </div>

      <FooterBanner footerBanner={banner_query_req && banner_query_req[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const products_query = '*[_type == "product"]';
  const products_query_req = await client.fetch(products_query);

  const bannerQuery = '*[_type == "banner"]';
  const banner_query_req = await client.fetch(bannerQuery);

  return {
    props: {
      products_query_req,
      banner_query_req
    }
  }
}

export default Home