import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product_query_req, similar_products_query_req }) => {

  const { qty, incQty, decQty, onAdd } = useStateContext();

  const products = similar_products_query_req;
  const product = product_query_req;
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  return (
    <div>
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
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
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
            <button type="button" className='buy-now'>Buy Now</button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='marquee'>
            <div className="maylike-products-container track">
              {products.map((product)=>(<Product key={product._id} product={product} />))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params: { slug } }) => {
  const product_query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const product_query_req = await client.fetch(product_query);

  const similar_products_query = `*[_type == "product" && slug.current != "${slug}"]`;
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
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product)=>({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export default ProductDetails