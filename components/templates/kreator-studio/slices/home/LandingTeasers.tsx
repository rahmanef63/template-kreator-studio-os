"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHead } from "@/components/templates/_shared/ui/section-head";
import { Stagger } from "@/components/templates/_shared/motion";
import {
  cfgNumber,
  parseConfigObject,
} from "@/components/templates/_shared/landing/sections";
import type { LandingSection } from "@/components/templates/_shared/landing/types";
import { fmtDate } from "../../shared/store";
import { PUBLIC_BASE } from "../../shared/nav-config";
import type {
  ContentItem,
  JournalEntry,
  NewsletterIssue,
  ShowcaseItem,
} from "../../shared/types";

const sectionLimit = (section: LandingSection, fallback = 3) =>
  cfgNumber(parseConfigObject(section.config), "limit") ?? fallback;

const cardCls =
  "h-full border-border/60 bg-card/50 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg";

/** Published social posts — backs the "portfolio" landing kind with the
 *  planner contents store (admin CRUD via Planner). */
export function ContentHighlights({ section, items }: { section: LandingSection; items: ContentItem[] }) {
  const published = items
    .filter((c) => c.status === "published")
    .slice(0, sectionLimit(section));
  if (published.length === 0) return null;

  return (
    <>
      <SectionHead eyebrow="Content" title={section.title} subtitle={section.subtitle} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stagger itemClassName="h-full">
          {published.map((c) => (
            <Card key={c.id} className={cardCls}>
              <CardContent className="space-y-2 p-5">
                <Badge variant="outline" className="rounded-full text-[10px] capitalize">
                  {c.channel}
                </Badge>
                <h3 className="text-sm font-medium leading-snug">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.hook}</p>
                <p className="pt-2 text-[11px] text-muted-foreground">
                  {c.views.toLocaleString("id-ID")} views · {c.likes.toLocaleString("id-ID")} likes
                </p>
              </CardContent>
            </Card>
          ))}
        </Stagger>
      </div>
    </>
  );
}

/** Latest sent newsletter issues — backs the "blog" landing kind with the
 *  same store the /posts archive reads (admin CRUD via Newsletter). */
export function PostsTeaser({ section, issues }: { section: LandingSection; issues: NewsletterIssue[] }) {
  const latest = issues
    .filter((n) => n.status === "sent")
    .sort((a, b) => b.scheduledAt - a.scheduledAt)
    .slice(0, sectionLimit(section));
  if (latest.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHead
        eyebrow="Newsletter"
        title={section.title}
        subtitle={section.subtitle}
        cta={{ label: "Semua issue", href: `${PUBLIC_BASE}/posts` }}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stagger itemClassName="h-full">
          {latest.map((n) => (
            <Link key={n.id} href={`${PUBLIC_BASE}/posts`} className="group block h-full">
              <Card className={cardCls}>
                <CardContent className="space-y-2 p-5">
                  <p className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Mail className="size-3" /> {fmtDate(n.scheduledAt)}
                  </p>
                  <h3 className="text-base font-medium leading-snug group-hover:underline">{n.subject}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{n.preview}</p>
                  <p className="pt-1 text-[11px] text-muted-foreground">
                    {n.recipients.toLocaleString("id-ID")} recipients · {n.openRate.toFixed(1)}% open rate
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

/** Latest journal entries — backs the "changelog" landing kind with the
 *  journal slice store (long-form di luar newsletter feed). */
export function JournalTeaser({ section, entries }: { section: LandingSection; entries: JournalEntry[] }) {
  const latest = [...entries]
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, sectionLimit(section));
  if (latest.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHead
        eyebrow="Journal"
        title={section.title}
        subtitle={section.subtitle}
        cta={{ label: "Semua tulisan", href: `${PUBLIC_BASE}/journal` }}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stagger itemClassName="h-full">
          {latest.map((e) => (
            <Link key={e.id} href={`${PUBLIC_BASE}/journal/${e.slug}`} className="group block h-full">
              <Card className={cardCls}>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full text-[10px] capitalize">{e.category}</Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3" /> {e.readMinutes} menit baca
                    </span>
                  </div>
                  <h3 className="font-medium leading-snug group-hover:underline">{e.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{e.excerpt}</p>
                  <p className="inline-flex items-center gap-1 pt-1 text-[11px] text-muted-foreground">
                    <Calendar className="size-3" /> {fmtDate(e.publishedAt)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

/** Strongest showcase pieces — backs the "services" landing kind with the
 *  same store the /showcase gallery reads. Gradient + emoji visuals. */
export function ShowcaseTeaser({ section, items }: { section: LandingSection; items: ShowcaseItem[] }) {
  const latest = [...items]
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, sectionLimit(section));
  if (latest.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHead
        eyebrow="Showcase"
        title={section.title}
        subtitle={section.subtitle}
        cta={{ label: "Lihat semua karya", href: `${PUBLIC_BASE}/showcase` }}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stagger itemClassName="h-full">
          {latest.map((s) => (
            <Link key={s.id} href={`${PUBLIC_BASE}/showcase`} className="group block h-full">
              <Card className={`overflow-hidden ${cardCls}`}>
                <div className={`flex aspect-[5/2] items-center justify-center bg-gradient-to-br ${s.gradient}`}>
                  <span className="text-5xl drop-shadow-md" aria-hidden>{s.emoji}</span>
                </div>
                <CardContent className="space-y-2 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-full text-[10px] capitalize">{s.kind}</Badge>
                    <span className="text-[11px] text-muted-foreground">{s.client}</span>
                  </div>
                  <h3 className="font-medium leading-snug group-hover:underline">{s.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{s.blurb}</p>
                  <p className="pt-1 text-[11px] font-semibold tracking-wide text-foreground/80">{s.metric}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
