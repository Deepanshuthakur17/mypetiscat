import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import Contact from '../Components/Contact'

function page() {
  return (
    <div className="font-serif">
        <Navbar/>
        <Hero/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default page