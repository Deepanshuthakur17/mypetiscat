import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import TermsAndConditions from '../Components/TermsAndConditions'

function page() {
  return (
    <div className="font-serif">
              <Navbar/>
              <Hero/>
              <TermsAndConditions/>
              <Footer/>
        </div>
  )
}

export default page