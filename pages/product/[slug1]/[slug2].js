import React, { useState } from 'react';
import { client, urlFor } from '../../../lib/client';
import { AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../../components';
import { useStateContext } from '../../../context/StateContext';
import Head from 'next/head';

const ProductDetails = ({ product_query_req, similar_products_query_req }) => {

  const { onAdd, setShowCart } = useStateContext();

  const products = similar_products_query_req;
  const product = product_query_req;
  const { image, name, type, details, price, rating, no_of_ratings } = product;
  const roundOffRating = Math.round(rating);

  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  
  const incQty = () => {
      setQty((prevQty) => (prevQty + 1));
  }

  const decQty = () => {
      setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
          return prevQty - 1;
      });
  }

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])} className='product-detail-image' />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i)=>(
              <img src={urlFor(item)} key={i} className={i===index?'small-image selected-image':'small-image'} onMouseEnter={()=>{setIndex(i)}} />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <h3>{type}</h3>
          <div className='reviews'>
            <div>
              {
                [...Array(5)].map((item, index) => {
                  if(index+1 <= roundOffRating) {
                    return <span key={index}><AiFillStar /></span>
                  } else {
                    return <span key={index}><AiOutlineStar /></span>
                  }
                })
              }
            </div>
            <p>
              ({no_of_ratings})
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>₹{price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className='add-to-cart' onClick={()=>{onAdd(product, qty)}}>Add to Cart</button>
            <button type="button" className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper' style={{textAlign: 'center'}}>
          <h2 className='text-animation' style={{width: 'fit-content', margin: '50px auto', cursor: 'default'}}>You may also like</h2>
          <div className='marquee'>
            <div className="maylike-products-container track">
              {products.map((product)=>(<Product key={product._id} product={product} />))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params: { slug1, slug2 } }) => {
  const product_query = `*[_type == "product" && slug2.current == "${slug2}"][0]`;
  const product_query_req = await client.fetch(product_query);

  const similar_products_query = `*[_type == "product" && slug.current != "${slug2}"]`;
  const similar_products_query_req = await client.fetch(similar_products_query);

  return {
    props: {
      product_query_req,
      similar_products_query_req
    }
  }
}

export const getStaticPaths = async ({}) => {
  const query = `*[_type == "product"] {
    slug1 {
      current
    },
    slug2 {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product)=>({
    params: {
      slug1: product.slug1.current,
      slug2: product.slug2.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export default ProductDetails