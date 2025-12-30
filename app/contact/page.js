import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'

function page() {
  return (
    <div className="font-serif">
        <Navbar/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default page