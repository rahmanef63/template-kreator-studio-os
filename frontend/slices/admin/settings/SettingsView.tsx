"use client";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHead } from "@/features/_shared/ui/section-head";
import { parseSocials } from "@/features/_shared/ui/site-footer";
import { UpdateCard } from "@/components/admin/update-card";
import { BackupCard } from "@/components/admin/backup-card";
import { ThemePresetSwitcher } from "@/features/theme-presets";
import { ImagePickerButton, imageRef } from "@/features/image-picker";
import { DEFAULT_SITE_CONFIG } from "@/features/_app/site-config";

export function SettingsView() {
  const c = DEFAULT_SITE_CONFIG;
  const settings = useQuery(api.settings.get);
  const upsert = useMutation(api.settings.upsert);
  const genUploadUrl = useMutation(api.files.generateUploadUrl);
  const getFileUrl = useMutation(api.files.getUrl);
  const [siteName, setSiteName] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [logoUrl, setLogoUrl] = React.useState("");
  const [socialX, setSocialX] = React.useState("");
  const [socialLinkedin, setSocialLinkedin] = React.useState("");
  const [socialGithub, setSocialGithub] = React.useState("");
  const [socialYoutube, setSocialYoutube] = React.useState("");
  const [aboutHeadline, setAboutHeadline] = React.useState("");
  const [aboutBody, setAboutBody] = React.useState("");
  const [aboutImageUrl, setAboutImageUrl] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (settings === undefined) return;
    setSiteName(settings?.siteName ?? c.brandName);
    setOwnerName(settings?.ownerName ?? c.ownerName);
    setContactEmail(settings?.contactEmail ?? c.email);
    setLogoUrl(settings?.logoUrl ?? "");
    const sc = parseSocials(settings?.socials);
    setSocialX(sc.x ?? "");
    setSocialLinkedin(sc.linkedin ?? "");
    setSocialGithub(sc.github ?? "");
    setSocialYoutube(sc.youtube ?? "");
    setAboutHeadline(settings?.aboutHeadline ?? "");
    setAboutBody(settings?.seoDescription ?? "");
    setAboutImageUrl(settings?.aboutImageUrl ?? "");
  }, [settings, c.brandName, c.ownerName, c.email]);

  const onUpload = async (file: File): Promise<string> => {
    const uploadUrl = await genUploadUrl();
    const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = (await res.json()) as { storageId: string };
    return ((await getFileUrl({ storageId: storageId as never })) as string) ?? "";
  };

  const save = async () => {
    setSaving(true);
    try {
      const socialsMap = Object.fromEntries(
        ([["x", socialX], ["linkedin", socialLinkedin], ["github", socialGithub], ["youtube", socialYoutube]] as const)
          .filter(([, v]) => v.trim()),
      );
      await upsert({
        siteName,
        ownerName,
        contactEmail,
        logoUrl,
        socials: Object.keys(socialsMap).length ? JSON.stringify(socialsMap) : undefined,
        aboutHeadline: aboutHeadline || undefined,
        seoDescription: aboutBody || undefined,
        aboutImageUrl: aboutImageUrl || undefined,
      });
      toast.success("Settings tersimpan");
    } catch {
      toast.error("Gagal menyimpan settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <SectionHead eyebrow="Pengaturan" title="Settings" subtitle="Konfigurasi creator workspace. Identitas situs disimpan di Convex (diisi lewat wizard onboarding)." />

      <Card className="border-border/60 bg-card/60">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-base font-medium">Brand</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label className="text-xs">Brand name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Owner</Label>
              <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Domain</Label>
              <Input defaultValue={c.baseUrl} readOnly className="mt-1" />
            </div>
          </div>
          <div>
            <Label className="text-xs">Logo</Label>
            <div className="mt-1 flex items-center gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo" className="h-9 w-auto rounded-md border border-border/60 object-contain" />
              ) : (
                <span className="text-xs text-muted-foreground">Belum ada logo — header pakai wordmark.</span>
              )}
              <ImagePickerButton
                label={logoUrl ? "Ganti logo" : "Upload logo"}
                title="Logo"
                onUpload={onUpload}
                searchUnsplash={undefined}
                onChange={(img) => setLogoUrl(imageRef(img) ?? "")}
              />
              {logoUrl && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setLogoUrl("")}>
                  Hapus
                </Button>
              )}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label className="text-xs">X / Twitter URL</Label>
              <Input value={socialX} onChange={(e) => setSocialX(e.target.value)} placeholder="https://x.com/username" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">LinkedIn URL</Label>
              <Input value={socialLinkedin} onChange={(e) => setSocialLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">GitHub URL</Label>
              <Input value={socialGithub} onChange={(e) => setSocialGithub(e.target.value)} placeholder="https://github.com/username" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">YouTube URL</Label>
              <Input value={socialYoutube} onChange={(e) => setSocialYoutube(e.target.value)} placeholder="https://youtube.com/@username" className="mt-1" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="gap-1" onClick={save} disabled={saving}>
              <Save className="size-4" /> {saving ? "Menyimpan…" : "Simpan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/60">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-base font-medium">About page</h3>
          <div>
            <Label className="text-xs">Judul / headline</Label>
            <Input value={aboutHeadline} onChange={(e) => setAboutHeadline(e.target.value)} placeholder="Lorem Kreator — full-time creator dari Indonesia." className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Bio / intro</Label>
            <Textarea value={aboutBody} onChange={(e) => setAboutBody(e.target.value)} rows={3} placeholder="Ceritakan tentang dirimu…" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Foto</Label>
            <div className="mt-1 flex items-center gap-3">
              {aboutImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={aboutImageUrl} alt="About" className="size-16 rounded-lg border border-border/60 object-cover" />
              ) : (
                <span className="text-xs text-muted-foreground">Belum ada foto.</span>
              )}
              <ImagePickerButton
                label={aboutImageUrl ? "Ganti foto" : "Upload foto"}
                title="Foto About"
                onUpload={onUpload}
                searchUnsplash={undefined}
                onChange={(img) => setAboutImageUrl(imageRef(img) ?? "")}
              />
              {aboutImageUrl && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setAboutImageUrl("")}>
                  Hapus
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="gap-1" onClick={save} disabled={saving}>
              <Save className="size-4" /> {saving ? "Menyimpan…" : "Simpan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/60">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-base font-medium">Channel integrations</h3>
          <p className="text-sm text-muted-foreground">
            IG, TikTok, YouTube, LinkedIn — connect API token untuk auto-publish dan pull metrik.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/60">
        <CardContent className="flex items-center justify-between gap-4 p-5 text-sm">
          <div>
            <p className="font-medium text-foreground">Appearance</p>
            <p className="text-muted-foreground">
              Pilih display mode (light/dark/system) + color preset. Tersimpan
              di browser, berlaku ke seluruh dashboard & situs publik.
            </p>
          </div>
          <ThemePresetSwitcher />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <UpdateCard />
        <BackupCard />
      </div>
    </div>
  );
}
