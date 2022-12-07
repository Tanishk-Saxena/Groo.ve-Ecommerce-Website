import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Groo<span style={{color: '#949417'}}>.</span>ve Pvt. Ltd.</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
      <p>All rights reserved</p>
    </div>
  )
}

export default Footer