import React from 'react'
import "./Footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className='Footer'>
        <div className='footer-logo'>
           <h1>Bazzar</h1>
           <h4>Bazar is an online e-commerce platform where you can shop for a wide range of products from the comfort of your own home. We offer a diverse selection of products, including electronics, home appliances, fashion, beauty products, and more.  Our mission is to provide our customers with a seamless shopping experience and exceptional customer service. Shop with us today and discover the convenience of online shopping with Bazar.</h4>
           <h3>Follow us on</h3>
           <div className='socialmedia'>
           <FacebookIcon sx={{fontSize:'2rem',margin:"10px"}} />
           <TwitterIcon sx={{fontSize:'2rem',margin:"10px"}}/>
           <GitHubIcon sx={{fontSize:'2rem',margin:"10px"}}/>
           <LinkedInIcon sx={{fontSize:'2rem',margin:"10px"}}/>
           </div>
           <h5>© 2023 Rabin,Nepal. All right reserved</h5>
        </div>
    </div>
  )
}

export default Footer