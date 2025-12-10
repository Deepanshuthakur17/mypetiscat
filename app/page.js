import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import AdSpace from "./Components/Adspace";
import Shorts from "./Components/Shorts";
import Trending from "./Components/Trending";
import Catweek from "./Components/Catweek";
import Footer from "./Components/Footer";
import Social from "./Components/Social";



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black font-serif dark:bg-black">
          <Navbar />
          <main>
            <section>
              <Hero />
              <AdSpace />
              <Shorts/>
              <Trending />
              <Catweek/>
              <AdSpace />
              <Social/>
            </section>
          </main>
          <Footer/>
        </div>
  );
}
