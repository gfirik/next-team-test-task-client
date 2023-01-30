"use client";
import MainPage from "@/components/MainPage";
import { useState, useEffect } from "react";
import getConfig from "next/config";

const BACKEND_API = getConfig()?.publicRuntimeConfig?.BACKEND_API;

export type Data = {
  data: { messages: Message[]; numbers: string[] };
};
export interface Message {
  message: string;
  author: string;
}

export default function Home() {
  const [data, setData] = useState<Data>({
    data: { messages: [], numbers: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch(`${BACKEND_API}`);
        const res = await fetch(`http://localhost:3333`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <main>
      <MainPage data={data} />
    </main>
  );
}
