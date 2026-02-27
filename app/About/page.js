import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import About from '../Components/About'

function page() {
  return (
    <div className="font-serif">
          <Navbar/>
          <Hero/>
          <About/>
          <Footer/>
    </div>
  )
}

export default page