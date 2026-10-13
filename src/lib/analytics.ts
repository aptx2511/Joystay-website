/**
 * Joystay Analytics — unified helper for GA4 + Facebook Pixel events
 * Usage: import { trackEvent, trackPurchase } from "@/lib/analytics"
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── GA4 ──────────────────────────────────────────────────────────────────────

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params ?? {});
  }
}

// ─── Facebook Pixel ───────────────────────────────────────────────────────────

export function fbEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params ?? {});
  }
}

// ─── Conversion events ───────────────────────────────────────────────────────

/** Fired when user views a room detail page */
export function trackViewRoom(roomName: string, price: number) {
  trackEvent("view_item", {
    item_name: roomName,
    value: price,
    currency: "VND",
  });
  fbEvent("ViewContent", {
    content_name: roomName,
    content_type: "hotel_room",
    value: price,
    currency: "VND",
  });
}

/** Fired when user reaches the checkout form (step 1) */
export function trackBeginCheckout(roomName: string, value: number, nights: number) {
  trackEvent("begin_checkout", {
    item_name: roomName,
    value,
    currency: "VND",
    nights,
  });
  fbEvent("InitiateCheckout", {
    content_name: roomName,
    value,
    currency: "VND",
  });
}

/** Fired when booking is confirmed (step 2 — payment shown) */
export function trackPurchase(
  bookingId: string,
  roomName: string,
  value: number,
  nights: number
) {
  trackEvent("purchase", {
    transaction_id: bookingId,
    item_name: roomName,
    value,
    currency: "VND",
    nights,
  });
  fbEvent("Purchase", {
    content_name: roomName,
    value,
    currency: "VND",
  });
}

/** Fired when user opens JoyBot chat */
export function trackOpenChat() {
  trackEvent("open_chat", { source: "joybot_widget" });
  fbEvent("Contact");
}
