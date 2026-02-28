import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import Disclaimer from '../Components/Disclaimer'

function page() {
  return (
    <div className="font-serif">
              <Navbar/>
              <Hero/>
              <Disclaimer/>
              <Footer/>
        </div>
  )
}

export default page