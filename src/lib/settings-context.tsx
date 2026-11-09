"use client";

import { createContext, useContext } from "react";

// Thông tin "Cài Đặt Website" từ Sanity — fetch 1 lần ở layout, dùng ở mọi component.
export type SiteContact = {
  phone?: string;
  email?: string;
  address?: string;
  zaloLink?: string;
  messengerLink?: string;
  googleMapsUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  airbnbUrl?: string;
};

// Giá trị dự phòng khi Sanity lỗi / field để trống
const DEFAULTS = {
  phone: "(+84) 0898 888 457",
  email: "booking@joystay.vn",
  address: "382/23 Nguyễn Thị Minh Khai, Phường Bàn Cờ, Quận 3, TP. Hồ Chí Minh",
  zaloLink: "https://zalo.me/0898888457",
};

const SettingsContext = createContext<SiteContact | null>(null);

export function SettingsProvider({ value, children }: { value: SiteContact | null; children: React.ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/** "(+84) 0898 888 457" → "tel:+84898888457" */
export function telHref(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("840")) d = "84" + d.slice(3);
  else if (d.startsWith("0")) d = "84" + d.slice(1);
  return `tel:+${d}`;
}

export function useSettings() {
  const s = useContext(SettingsContext) ?? {};
  const pick = (v?: string | null) => (v && v.trim() ? v.trim() : undefined);
  const phone = pick(s.phone) ?? DEFAULTS.phone;
  const address = pick(s.address) ?? DEFAULTS.address;
  return {
    phone,
    phoneHref: telHref(phone),
    email: pick(s.email) ?? DEFAULTS.email,
    address,
    zaloLink: pick(s.zaloLink) ?? DEFAULTS.zaloLink,
    messengerLink: pick(s.messengerLink),
    googleMapsUrl: pick(s.googleMapsUrl) ?? `https://maps.google.com/?q=${encodeURIComponent(address)}`,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
    facebookUrl: pick(s.facebookUrl),
    instagramUrl: pick(s.instagramUrl),
    airbnbUrl: pick(s.airbnbUrl),
  };
}
