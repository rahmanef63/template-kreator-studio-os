"use client";

import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  CountUp,
  Marquee,
  Reveal,
  Stagger,
} from "@/features/_shared/motion";
import { PUBLIC_BASE } from "@/features/_app/nav-config";
import { useFeaturedClients, useTestimonials } from "@/features/_app/store";
import type { Testimonial } from "@/features/_app/types";
import {
  FeaturedTestimonialCard,
  TestimonialCard,
} from "./TestimonialsCard";

type Filter = "all" | "client" | "audience" | "newsletter";

const FILTER_LABEL: Record<Filter, string> = {
  all: "Semua",
  client: "Klien & brand",
  audience: "Audience",
  newsletter: "Newsletter readers",
};

function matchFilter(t: Testimonial, f: Filter): boolean {
  if (f === "all") return true;
  if (f === "client") return t.channel === "client";
  if (f === "newsletter") return t.channel === "newsletter";
  return t.channel !== "client" && t.channel !== "newsletter";
}

/**
 * Wall-of-love. Featured quotes spotlight + masonry grid + client logo strip.
 * 8-12 testimonials seeded, filter chips (client / audience / newsletter).
 */
export function TestimonialsPage() {
  const testimonials = useTestimonials();
  const clients = useFeaturedClients();
  const [filter, setFilter] = React.useState<Filter>("all");
  const filtered = testimonials.filter((t) => matchFilter(t, filter));
  const featured = testimonials.filter((t) => t.featured).slice(0, 2);
  const filters: Filter[] = ["all", "client", "audience", "newsletter"];
  const avgRating =
    testimonials.length === 0
      ? 0
      : testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <header className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Testimonials
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Apa kata klien & audience.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Wall-of-love dari brand yang pernah kerja sama dan reader yang konsisten
            baca tiap minggu. Real words, real outcomes.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{avgRating.toFixed(1)}</span>
              <span className="text-muted-foreground">avg rating</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-muted-foreground">
              <CountUp value={testimonials.length} /> testimoni ·{" "}
              <CountUp value={clients.length} /> brand
            </span>
          </div>
        </header>
      </Reveal>

      {/* Featured client logos strip — infinite marquee, pauses on hover */}
      <Reveal className="mt-12" delay={120}>
        <p className="mb-4 text-[11px] uppercase tracking-wider text-muted-foreground">
          Trusted by
        </p>
        <Marquee speed={30}>
          {clients.map((c) => (
            <div
              key={c.id}
              className={`flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-gradient-to-br ${c.gradient} backdrop-blur transition hover:scale-[1.02]`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold tracking-tight text-foreground/85">
                  {c.initial}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {c.name}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </Reveal>

      {/* Featured spotlight quotes */}
      {featured.length > 0 && (
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Stagger variant="zoom" itemClassName="h-full">
            {featured.map((t) => (
              <FeaturedTestimonialCard key={t.id} t={t} />
            ))}
          </Stagger>
        </div>
      )}

      {/* Filter chips */}
      <div className="mt-12 mb-6 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setFilter(f)}
          >
            {FILTER_LABEL[f]}
          </Button>
        ))}
      </div>

      {/* Quote carousel — autoplays, pauses once the reader interacts */}
      {filtered.length === 0 ? (
        <Card className="border-dashed bg-muted/10 p-10 text-center text-sm text-muted-foreground">
          Belum ada testimoni di filter ini.
        </Card>
      ) : (
        <Carousel
          opts={{ align: "start", loop: filtered.length > 3 }}
          plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
        >
          <div className="mb-4 flex items-center justify-end gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <CarouselContent>
            {filtered.map((t) => (
              <CarouselItem key={t.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <TestimonialCard t={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      <Separator className="my-16 opacity-60" />

      {/* CTA */}
      <Reveal variant="zoom">
      <Card className="border-border/60 bg-gradient-to-br from-card via-card to-muted/40">
        <CardContent className="flex flex-col items-start gap-3 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Mau jadi case study berikutnya?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Lihat paket kerja sama atau langsung book brief call gratis.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`${PUBLIC_BASE}/pricing`}>Lihat pricing</Link>
            </Button>
            <Button asChild>
              <Link href={`${PUBLIC_BASE}/about`}>
                Brief call <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      </Reveal>
    </section>
  );
}
