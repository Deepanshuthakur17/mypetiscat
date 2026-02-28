import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import PrivacyPolicy from '../Components/Privacy-Policy'

function page() {
  return (
    <div className="font-serif">
              <Navbar/>
              <Hero/>
              <PrivacyPolicy/>
              <Footer/>
        </div>
  )
}

export default page