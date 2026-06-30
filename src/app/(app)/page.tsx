'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ghost, Heart, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="flex-grow pb-10 pt-6 sm:pb-14 sm:pt-8">
        <div className="page-shell">
          <section className="neo-panel overflow-hidden">
            <div className="grid grid-cols-1 gap-8 px-4 py-6 sm:px-6 sm:py-8 md:gap-10 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10">
              <div className="max-w-2xl">
                <p className="section-kicker">your link, your vibe</p>
                <h1 className="mt-4 break-words text-4xl font-black leading-[0.95] tracking-[-0.08em] text-[#201a28] sm:text-5xl md:text-6xl lg:text-7xl">
                  your space for
                  <span className="hero-word"> unsaid </span>
                  things
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#5f566e] sm:text-lg sm:leading-8">
                  Share your link. People send anonymous messages. You read them in a space that feels expressive, personal, and yours.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sign-up">
                    <Button className="neo-button h-11 w-full border-[#26222c] px-5 text-sm font-bold text-[#201a28] hover:bg-[#a977ff] sm:h-[52px] sm:w-auto sm:px-6 sm:text-base">
                      Create your link
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#201a28]">
                  <div className="flex -space-x-3">
                    {["#c4a1ff", "#eefb95", "#ffd9d8", "#d6c8ff"].map((color, index) => (
                      <span
                        key={index}
                        className="flex size-12 items-center justify-center rounded-full border-[2.5px] border-[#26222c] text-[#201a28]"
                        style={{ backgroundColor: color }}
                      >
                        <Ghost className="size-5" />
                      </span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base">
                    Loved by people who want honest messages.
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="neo-card bg-[#b687ff] px-4 py-4 sm:min-h-[420px] sm:px-5 sm:py-5">
                  <div className="flex h-full flex-col justify-between gap-5">
                    <div className="flex justify-between text-[#201a28]">
                      <span className="text-3xl font-black sm:text-4xl">*</span>
                      <span className="soft-note flex size-14 items-center justify-center rounded-full border-[#26222c] bg-[#eefb95] shadow-[0_5px_0_0_rgba(38,34,44,0.18)] sm:size-16">
                        <Smile className="size-7 sm:size-8" />
                      </span>
                    </div>

                    <Carousel plugins={[Autoplay({ delay: 2600 })]} className="w-full">
                      <CarouselContent>
                        {messages.map((message, index) => (
                          <CarouselItem key={index} className="basis-full">
                            <Card className="neo-card rotate-[-2deg] bg-[#fffdf8]">
                              <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                  <span className="flex size-11 items-center justify-center rounded-[1rem] border-[2.5px] border-[#26222c] bg-[#eefb95] text-[#201a28] shadow-[0_4px_0_0_rgba(38,34,44,0.12)]">
                                    <Heart className="size-4 fill-current" />
                                  </span>
                                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a8099]">
                                    {message.title}
                                  </p>
                                </div>
                                <CardTitle className="pt-2 text-xl font-black tracking-[-0.04em] text-[#201a28]">
                                  messages that feel personal, not performative
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-base leading-7 text-[#3d3649]">
                                  {message.content}
                                </p>
                                <p className="mt-4 text-sm font-medium text-[#6f667e]">
                                  {message.received}
                                </p>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-0 border-t-[2.5px] border-[#26222c] bg-[#eefb95] sm:grid-cols-3">
              <div className="flex items-start gap-4 px-4 py-5 sm:px-6 md:px-8">
                <span className="ghost-mark size-11 bg-white shadow-[0_4px_0_0_rgba(38,34,44,0.14)]">
                  <Ghost className="size-5" />
                </span>
                <div>
                  <p className="text-lg font-black tracking-[-0.04em] text-[#201a28]">100% anonymous</p>
                  <p className="mt-1 text-sm leading-6 text-[#4d4659]">No names. No handles. Just honest messages.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t-[2.5px] border-[#26222c] px-4 py-5 sm:border-l sm:border-t-0 sm:px-6 md:px-8">
                <span className="ghost-mark size-11 bg-[#fff3ba] shadow-[0_4px_0_0_rgba(38,34,44,0.14)]">
                  <ArrowRight className="size-5" />
                </span>
                <div>
                  <p className="text-lg font-black tracking-[-0.04em] text-[#201a28]">Easy to share</p>
                  <p className="mt-1 text-sm leading-6 text-[#4d4659]">One link is all it takes. Share anywhere.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t-[2.5px] border-[#26222c] px-4 py-5 sm:border-l sm:border-t-0 sm:px-6 md:px-8">
                <span className="ghost-mark size-11 bg-[#ffd9d8] shadow-[0_4px_0_0_rgba(38,34,44,0.14)]">
                  <Smile className="size-5" />
                </span>
                <div>
                  <p className="text-lg font-black tracking-[-0.04em] text-[#201a28]">Made for you</p>
                  <p className="mt-1 text-sm leading-6 text-[#4d4659]">Read, pause, and manage your inbox your way.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="px-4 pb-8 text-center text-sm font-medium text-[#6f667e]">
        © 2026 Unsaid. All rights reserved.
      </footer>
    </>
  );
}
