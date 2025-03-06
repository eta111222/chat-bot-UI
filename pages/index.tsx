import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatbot UI</title>
        <meta name="description" content="A simple chatbot using Next.js, TypeScript, and Tailwind CSS." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            <Chat />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
