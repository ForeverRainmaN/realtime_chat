"use client"
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = ["wolf", "hawk", "bear", "shark"]
const STORAGE_KEY = "chat_username"

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `anonymous-${word}-${nanoid(5)}`
}

export default function Home() {

  const [userName, setUsername] = useState<string>("");

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY)

        if(stored) {
          setUsername(stored)
          return;
        }

        const generated = generateUsername()
        localStorage.setItem(STORAGE_KEY, generated)
        setUsername(generated)
    }

    main()
  }, [])

  return <main className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            {`>`}private_chat
          </h1>

          <p className="text-zinc-500 text-sm">
            A private, self-destructuring chat room.
          </p>
      </div>
      <div className="border border-zinc-800 bg-zinc-900/50 p-6 backround-blur-md">
        <div className="space-y-5">
          <div className="space-y-5">
              <label className="flex items-center text-zinc-500">Your Identity</label>
              <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {userName}
            </div>
          </div>
        </div>

        <button className="w-full bg-zinc-100 p-3 text-sm font-bold hover:hover: text-black transition-colors mt-2 cursor-pointer disabled:opacit-50">
          CREATE SECURE ROOM
        </button>
      </div>
    </div>
  </main>;
}
