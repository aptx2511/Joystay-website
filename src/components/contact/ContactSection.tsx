"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, Facebook } from "lucide-react";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";
import { useSettings } from "@/lib/settings-context";

export default function ContactSection() {
  const { lang } = useLang();
  const site = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-joy-charcoal pt-28 sm:pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag text-joy-green-light mb-4 block">{tx(T.contact.tag, lang)}</span>
          <h1 className="font-serif text-display-xl text-white font-light">
            {tx(T.contact.title, lang)}{" "}
            <em className="italic text-joy-green-light">{tx(T.contact.italic, lang)}</em>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-base max-w-xl leading-relaxed">
            {tx(T.contact.subtitle, lang)}
          </p>
        </div>
      </section>

      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left */}
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden border border-joy-border shadow-sm h-72">
              <iframe
                src={site.mapEmbedUrl}
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Joystay Vietnam location" />
            </div>

            <div className="flex gap-3 items-start bg-white border border-joy-border rounded-xl p-4">
              <MapPin size={18} className="text-joy-green shrink-0 mt-0.5" />
              <div>
                <p className="font-sans font-semibold text-sm text-joy-ink whitespace-pre-line">{site.address}</p>
                <a href={site.googleMapsUrl}
                  target="_blank" rel="noreferrer"
                  className="text-xs text-joy-green font-semibold hover:underline mt-1 inline-block">
                  {tx(T.contact.openMap, lang)}
                </a>
              </div>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-joy-muted mb-4">
                {tx(T.contact.quickContact, lang)}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: site.phoneHref, icon: <Phone size={16} className="text-joy-green" />, label: tx(T.contact.call, lang), sub: site.phone },
                  { href: site.zaloLink, icon: <MessageCircle size={16} className="text-joy-green" />, label: tx(T.contact.zalo, lang), sub: tx(T.contact.zaloSub, lang) },
                  ...(site.messengerLink
                    ? [{ href: site.messengerLink, icon: <Facebook size={16} className="text-joy-green" />, label: tx(T.contact.messenger, lang), sub: tx(T.contact.messengerSub, lang) }]
                    : []),
                  { href: `mailto:${site.email}`, icon: <Mail size={16} className="text-joy-green" />, label: tx(T.contact.email, lang), sub: site.email },
                ].map((item) => (
                  <a key={item.href} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="flex items-center gap-3 bg-white border border-joy-border rounded-xl p-4 hover:border-joy-green hover:shadow-sm transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-full bg-joy-warm flex items-center justify-center group-hover:bg-joy-green/10 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-joy-ink">{item.label}</p>
                      <p className="font-sans text-xs text-joy-muted">{item.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-joy-border rounded-2xl p-8">
            <h2 className="font-serif text-2xl text-joy-ink font-light mb-2">{tx(T.contact.formTitle, lang)}</h2>
            <p className="font-sans text-sm text-joy-muted mb-7 leading-relaxed">
              {tx(T.contact.formDesc, lang)}
            </p>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-joy-green/10 flex items-center justify-center mx-auto mb-4">
                  <Send size={22} className="text-joy-green" />
                </div>
                <h3 className="font-serif text-xl text-joy-ink mb-2">{tx(T.contact.successTitle, lang)}</h3>
                <p className="font-sans text-sm text-joy-muted">{tx(T.contact.successDesc, lang)}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-joy-muted mb-1.5">
                      {tx(T.contact.nameLbl, lang)}
                    </label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder={tx(T.contact.namePh, lang)}
                      className="w-full px-4 py-2.5 border border-joy-border rounded-xl font-sans text-sm text-joy-ink placeholder:text-joy-muted/50 focus:outline-none focus:border-joy-green transition-colors" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-joy-muted mb-1.5">
                      {tx(T.contact.phoneLbl, lang)}
                    </label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                      placeholder={tx(T.contact.phonePh, lang)}
                      className="w-full px-4 py-2.5 border border-joy-border rounded-xl font-sans text-sm text-joy-ink placeholder:text-joy-muted/50 focus:outline-none focus:border-joy-green transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-joy-muted mb-1.5">
                    {tx(T.contact.emailLbl, lang)}
                  </label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 border border-joy-border rounded-xl font-sans text-sm text-joy-ink placeholder:text-joy-muted/50 focus:outline-none focus:border-joy-green transition-colors" />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-joy-muted mb-1.5">
                    {tx(T.contact.msgLbl, lang)}
                  </label>
                  <textarea name="message" required rows={4} value={form.message} onChange={handleChange}
                    placeholder={tx(T.contact.msgPh, lang)}
                    className="w-full px-4 py-2.5 border border-joy-border rounded-xl font-sans text-sm text-joy-ink placeholder:text-joy-muted/50 focus:outline-none focus:border-joy-green transition-colors resize-none" />
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3.5">
                  <Send size={15} /> {tx(T.contact.submitBtn, lang)}
                </button>

                <p className="font-sans text-xs text-joy-muted text-center">
                  {tx(T.contact.orContact, lang)}{" "}
                  <a href={site.zaloLink} target="_blank" rel="noreferrer" className="text-joy-green hover:underline">Zalo</a>{" "}
                  {tx(T.contact.forInstant, lang)}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
