import Image from "next/image";
import Homepage from "./Pages/Homepage";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-serif dark:bg-black">
      <Homepage/>
    </div>
  );
}
