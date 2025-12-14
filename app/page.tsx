import Hero from "@/components/landing/hero";
import LandingNavBar from "@/components/landing/navbar";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black">
        <LandingNavBar/>
        <Hero/>
      </main>
    </div>
  );
}
