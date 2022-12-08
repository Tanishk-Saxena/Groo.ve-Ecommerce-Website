import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {

  const { type, product } = heroBanner;

  let slug1 = type.toLowerCase();
  let slug2 = product.toLowerCase();
  console.log(slug1 + '/' + slug2);
  slug1 = slug1.replaceAll(' ', '-');
  slug1 = slug1.replaceAll('.', '-');
  slug2 = slug2.replaceAll(' ', '-');
  slug2 = slug2.replaceAll('.', '-');
  console.log(slug1 + '/' + slug2);

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1 style={{display: 'inline'}}>{heroBanner.largeText1} </h1>
        <h1 style={{display: 'inline', color: 'black'}}>{heroBanner.largeText2}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image' />
        <div>
          <Link href={`/product/${slug1}/${slug2}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className='desc' style={{'textAlign': 'right'}}>
            <h5>{heroBanner.desc}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner