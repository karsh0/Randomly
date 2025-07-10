"use client"
import { SliderCard } from "@/components/SliderCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen bg-black text-white font-['Poppins']">
      <header className="w-full px-8 md:px-20 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anonymous</h1>
        <Button className="rounded-2xl px-6 py-2" variant="secondary" onClick={()=> router.push('/signin')}>
          Login
        </Button>
      </header>

      <main className="flex flex-col items-center justify-center h-1/2 text-center px-6">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Dive into the world of anonymous messages.
          </h2>
          <p className="text-lg text-white/70">
            Where your identity remains secret.
          </p>
          <Button variant="secondary" className="px-7 py-5" onClick={()=> router.push('/signup')}>
            Get Started
          </Button>
        </div>
      </main>

      <div className="w-full flex justify-center gap-10">
           {[...Array(1)].flatMap((_, duplicateIndex) =>
            Array.from({ length: 4 }).map((_, i) => (
              <SliderCard key={`${duplicateIndex}-${i}`} />
            ))
          )}
      </div>
    </div>
  );
}
