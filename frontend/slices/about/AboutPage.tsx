"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, Stagger } from "@/features/_shared/motion";
import { PUBLIC_BASE } from "@/features/_app/nav-config";

const DEFAULT_HEADLINE = "Lorem Kreator — full-time creator dari Indonesia.";
const DEFAULT_INTRO =
  "Saya bantu creator dan small business build audience yang berarti — bukan vanity metrics. Newsletter ini adalah catatan apa yang saya pelajari minggu ini.";

const PRINCIPLES = [
  "Konsistensi > sempurna — ship tiap minggu, refine seiring jalan.",
  "Voice unik > algoritma chasing — algoritma reward kreator yang otentik.",
  "Repurpose dulu, baru tambah platform — leverage konten yang ada.",
  "Newsletter > follower count — owned audience yang nilainya beda.",
  "Bahasa Indonesia bukan handicap — itu kekuatan untuk niche kamu.",
];

const TIMELINE = [
  { year: "2026", milestone: "100K cross-platform followers, 12K newsletter subs." },
  { year: "2024", milestone: "Pivot full-time content creation. First 1K subs newsletter." },
  { year: "2022", milestone: "Mulai posting konsisten — IG + TikTok harian selama 1 tahun." },
];

export function AboutPage() {
  const settings = useQuery(api.settings.get);
  const headline = settings?.aboutHeadline || DEFAULT_HEADLINE;
  const intro = settings?.seoDescription || DEFAULT_INTRO;
  const photo = settings?.aboutImageUrl;
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <header>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt={headline}
              className="mb-6 h-40 w-40 rounded-2xl border border-border/60 object-cover"
            />
          )}
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">About</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{headline}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{intro}</p>
          <Button asChild className="mt-6">
            <Link href={`${PUBLIC_BASE}/posts`}>Baca arsip <ArrowRight className="size-4" /></Link>
          </Button>
        </header>
      </Reveal>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Prinsip kerja</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Stagger itemClassName="h-full">
            {PRINCIPLES.map((p) => (
              <Card
                key={p}
                className="h-full border-border/60 bg-card/60 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="flex items-start gap-3 p-4 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 text-foreground/70" />
                  <span className="text-foreground/85">{p}</span>
                </CardContent>
              </Card>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Timeline</h2>
        <ol className="mt-6 space-y-3 border-l border-border/60 pl-6">
          {TIMELINE.map((t, i) => (
            <li key={t.year} className="relative">
              <Reveal variant="fade-left" delay={Math.min(i * 60, 360)}>
                <span className="absolute -left-[29px] top-1.5 grid size-3 place-items-center rounded-full border border-border bg-background">
                  <span className="size-1 rounded-full bg-foreground" />
                </span>
                <p className="text-xs font-mono text-muted-foreground">{t.year}</p>
                <p className="text-sm text-foreground/85">{t.milestone}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
