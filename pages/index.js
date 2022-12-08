import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import Head from 'next/head';

const Home  = ({products_query_req, banner_query_req}) => {
  return (
    <>
      <Head>
        <title>Groo.ve | Your online store for wearable accessories</title>
      </Head>

      <HeroBanner heroBanner = {banner_query_req.length && banner_query_req[0]}/>

      <div className='products-heading'>
        <h2 className='text-animation' style={{display: 'inline', cursor: 'pointer'}}>Best Selling Products</h2>
        <p style={{fontWeight: '400', fontSize: '17px', lineHeight: '30px'}}>Speakers of many variations</p>
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