import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1 style={{display: 'inline'}}>{heroBanner.largeText1} </h1>
        <h1 style={{display: 'inline', color: 'black'}}>{heroBanner.largeText2}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image' />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
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