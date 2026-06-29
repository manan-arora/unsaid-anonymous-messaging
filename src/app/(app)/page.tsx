'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
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
      <main className="flex-grow py-12 sm:py-16">
        <div className="page-shell">
          <section className="panel-glass panel-grid overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-center">
              <div className="max-w-2xl">
                <p className="mb-5 text-xs uppercase tracking-[0.28em] text-violet-200/70">
                  Speak without the social tax
                </p>
                <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl">
                  A calmer place for
                  <span className="violet-text"> unsaid </span>
                  thoughts.
                </h1>
                <p className="section-copy mt-6 max-w-xl text-base sm:text-lg">
                  Share honestly, receive openly, and let the conversation stay focused on what matters instead of who said it first.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sign-up">
                    <Button size="lg" className="w-full sm:w-auto">
                      Create your link
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white/12 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                    >
                      Open dashboard
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="panel-muted p-4">
                    <p className="text-sm font-medium text-white">Anonymous by design</p>
                    <p className="mt-2 text-sm text-white/55">No public replies, no performative threads.</p>
                  </div>
                  <div className="panel-muted p-4">
                    <p className="text-sm font-medium text-white">Built for sharing</p>
                    <p className="mt-2 text-sm text-white/55">A link-first flow that is easy to send anywhere.</p>
                  </div>
                  <div className="panel-muted p-4">
                    <p className="text-sm font-medium text-white">Private feeling</p>
                    <p className="mt-2 text-sm text-white/55">Quiet contrast, generous spacing, and no visual noise.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="panel-muted p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">Inbox preview</p>
                      <p className="mt-1 text-sm text-white/48">A small look at how messages land inside Unsaid.</p>
                    </div>
                    <Sparkles className="mt-1 size-4 text-violet-300" />
                  </div>
                </div>

                <Carousel
                  plugins={[Autoplay({ delay: 2600 })]}
                  className="w-full"
                >
                  <CarouselContent>
                    {messages.map((message, index) => (
                      <CarouselItem key={index}>
                        <Card className="panel-glass min-h-[240px] border-white/10 bg-white/[0.04]">
                          <CardHeader className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                              {message.title}
                            </p>
                            <CardTitle className="text-xl text-white">
                              Anonymous, without feeling disposable.
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                              <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 text-violet-300" />
                                <div>
                                  <p className="text-sm leading-6 text-white/80">{message.content}</p>
                                  <p className="mt-3 text-xs text-white/40">{message.received}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/48">
                              <Lock className="size-4" />
                              <span>Messages stay one-way and identity stays out of the room.</span>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/8 py-6 text-center text-sm text-white/45">
        © 2026 Unsaid. All rights reserved.
      </footer>
    </>
  );
}
