import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import AdSpace from '../Components/Adspace'
import Trending from '../Components/Trending'
import Catweek from '../Components/Catweek'
import Social from '../Components/Social'
import Footer from '../Components/Footer'

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black font-serif dark:bg-black">
      <Navbar />
      <main>
        <section>
          <Hero />
          <AdSpace />
          <Trending />
          <Catweek/>
          <AdSpace />
          <Social/>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Homepage