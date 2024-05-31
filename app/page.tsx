import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    
    <div id="main-section" className="h-screen p-4 sticky top-0 left-0 flex flex-col space-y-16 justify-center items-center container mx-auto max-w-5xl">
  <div className="space-y-12" >
    <h1 className="text-xl font-bold text-zinc-900">Hurudza</h1>
    <small className="text-sm italic">noun</small>
    <ol className="text-zinc-900 list-decimal font-medium list-inside">
      <li>
        The product partner for companies who build things that make everyday life easier.
      </li>
      <li>referring to someone who has big harvests.</li>
    </ol>
    <div className="space-y-1">
      <p className="text-sm text-zinc-500">
        English translation
      </p>
      <p className="text-zinc-900">
        Master farmer
      </p>
    </div>
    <p className="text-balance text-zinc-900">
      At Hurudza we are helping startups, founders and institutions realize their full potential through our 
      unparalleled design and engineering services. We are a small team of bright-minded people who deeply care 
      about building products that make everyday life more convenient.
    </p>

    <div>
      <ButtonWithDisclosure backgroundColor="#0588F0" color="#fff" accentColor="#fff" text="Book an introductory call" icon={<PhoneIcon className="w-6 h-6" />}>
        <h1 className="text-3xl font-bold mb-2">
          Let's talk about your next project
        </h1>
        <p className="max-w-2xl text-balance">
          We are always excited to work with new people and help them bring their ideas to life. 
          Book a call with us to discuss your project and how we can help you.
        </p>
      </ButtonWithDisclosure>
      <p className="text-sm text-zinc-500 mt-8">
        Due to limited availability, we only partner with select startups  
      </p>
    </div>

    
  </div>
  
</div>
    </>
  );
}
