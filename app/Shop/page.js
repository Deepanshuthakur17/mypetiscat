import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";

export default function Page() {
  return (
    <div className="font-serif">
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  );
}
