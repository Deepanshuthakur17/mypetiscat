import React from 'react'
import BlogHero from '../Components/Bloghero'
import Navbar from '../Components/Navbar'
import AdSpace from '../Components/Adspace'
import Footer from '../Components/Footer'

function page() {
  return (
    <div className='font-serif'>
      <Navbar />
      <BlogHero />
      <AdSpace/>
      <Footer/>
    </div>
  )
}

export default page