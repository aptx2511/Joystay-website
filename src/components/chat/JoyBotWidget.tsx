"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  loading?: boolean;
}

const SESSION_KEY = "joybot_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

const JOYBOT_API = process.env.NEXT_PUBLIC_JOYBOT_URL ?? "https://joystay-joybot-production.up.railway.app";

const GREETING = "Chào bạn! 👋 Mình là JoyBot — trợ lý của Joystay.\nBạn muốn tìm phòng, hỏi giá, hay cần tư vấn gì thì cứ nhắn mình nha! 🏡";

export default function JoyBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    const loadingMsg: Message = { id: "loading", role: "assistant", text: "", loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${JOYBOT_API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: getSessionId(), message: text }),
      });

      const data = await res.json();
      const reply = data.reply ?? "Xin lỗi, mình gặp sự cố. Bạn thử lại nhé!";

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "loading"),
        { id: Date.now().toString(), role: "assistant", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "loading"),
        {
          id: Date.now().toString(),
          role: "assistant",
          text: "Mình đang gặp sự cố kết nối. Bạn thử lại sau nhé! 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat với JoyBot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-joy-green text-white shadow-lg
                   flex items-center justify-center hover:bg-joy-charcoal transition-colors duration-300
                   focus:outline-none focus:ring-2 focus:ring-joy-green focus:ring-offset-2"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}

        {/* Unread dot when closed */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
                    bg-white rounded-2xl shadow-2xl border border-joy-border
                    flex flex-col overflow-hidden
                    transition-all duration-300 ease-joy origin-bottom-right
                    ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-joy-green text-white shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans font-semibold text-sm leading-tight">JoyBot</p>
            <p className="font-sans text-xs text-white/75 leading-tight">Trợ lý Joystay • Online 24/7</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-joy-cream/40">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-joy-green/15 flex items-center justify-center text-sm mr-2 mt-0.5 shrink-0">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed font-sans
                  ${msg.role === "user"
                    ? "bg-joy-green text-white rounded-br-sm"
                    : "bg-white text-joy-ink border border-joy-border rounded-bl-sm shadow-sm"
                  }`}
              >
                {msg.loading ? (
                  <TypingDots />
                ) : (
                  <FormattedText text={msg.text} />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-joy-border bg-white shrink-0">
          <div className="flex items-center gap-2 bg-joy-cream rounded-xl px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhắn tin với JoyBot..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm font-sans text-joy-ink placeholder:text-joy-muted
                         outline-none disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg bg-joy-green text-white flex items-center justify-center
                         hover:bg-joy-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-joy-muted/60 font-sans mt-1.5">
            Powered by Claude AI · Joystay Vietnam
          </p>
        </div>
      </div>
    </>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-joy-muted/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

// ── Markdown-lite renderer (bold + line breaks) ───────────────────────────
function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        // Bold: **text**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}
