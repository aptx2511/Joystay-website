"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, Facebook } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to API route or email service
    setSent(true);
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-joy-charcoal pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag text-joy-green-light mb-4 block">Get In Touch</span>
          <h1 className="font-serif text-display-xl text-white font-light">
            Liên Hệ{" "}
            <em className="italic text-joy-green-light">Với Chúng Tôi</em>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-base max-w-xl leading-relaxed">
            Đặt phòng, hỏi về thuê dài hạn, hoặc chỉ muốn hỏi thăm — chúng tôi
            luôn sẵn sàng trả lời trong vòng 1 giờ.
          </p>
        </div>
      </section>

      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left: Map + Quick Actions ──────────────────────────── */}
          <div className="space-y-8">

            {/* Google Map embed */}
            <div className="rounded-2xl overflow-hidden border border-joy-border shadow-sm h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6!2d106.6903!3d10.7657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ1JzU2LjUiTiAxMDbCsDQxJzI1LjEiRQ!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Joystay Vietnam location"
              />
            </div>

            {/* Address */}
            <div className="flex gap-3 items-start bg-white border border-joy-border rounded-xl p-4">
              <MapPin size={18} className="text-joy-green shrink-0 mt-0.5" />
              <div>
                <p className="font-sans font-semibold text-sm text-joy-ink">245 Nguyễn Trãi</p>
                <p className="font-sans text-sm text-joy-muted">
                  Phường Nguyễn Cư Trinh, Quận 1<br />
                  TP. Hồ Chí Minh, Việt Nam
                </p>
                <a
                  href="https://maps.google.com/?q=245+Nguyen+Trai,+District+1,+Ho+Chi+Minh+City"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-joy-green font-semibold hover:underline mt-1 inline-block"
                >
                  Mở Google Maps →
                </a>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase
                             text-joy-muted mb-4">
                Liên hệ nhanh
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+84909000000"
                  className="flex items-center gap-3 bg-white border border-joy-border
                             rounded-xl p-4 hover:border-joy-green hover:shadow-sm
                             transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full bg-joy-warm flex items-center justify-center
                                  group-hover:bg-joy-green/10 transition-colors">
                    <Phone size={16} className="text-joy-green" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-joy-ink">Gọi điện</p>
                    <p className="font-sans text-xs text-joy-muted">+84 909 000 000</p>
                  </div>
                </a>

                <a
                  href="https://zalo.me/0909000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-joy-border
                             rounded-xl p-4 hover:border-joy-green hover:shadow-sm
                             transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full bg-joy-warm flex items-center justify-center
                                  group-hover:bg-joy-green/10 transition-colors">
                    <MessageCircle size={16} className="text-joy-green" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-joy-ink">Zalo</p>
                    <p className="font-sans text-xs text-joy-muted">Chat ngay</p>
                  </div>
                </a>

                <a
                  href="https://m.me/joystay"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-joy-border
                             rounded-xl p-4 hover:border-joy-green hover:shadow-sm
                             transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full bg-joy-warm flex items-center justify-center
                                  group-hover:bg-joy-green/10 transition-colors">
                    <Facebook size={16} className="text-joy-green" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-joy-ink">Messenger</p>
                    <p className="font-sans text-xs text-joy-muted">Facebook chat</p>
                  </div>
                </a>

                <a
                  href="mailto:hello@joystay.vn"
                  className="flex items-center gap-3 bg-white border border-joy-border
                             rounded-xl p-4 hover:border-joy-green hover:shadow-sm
                             transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full bg-joy-warm flex items-center justify-center
                                  group-hover:bg-joy-green/10 transition-colors">
                    <Mail size={16} className="text-joy-green" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-joy-ink">Email</p>
                    <p className="font-sans text-xs text-joy-muted">hello@joystay.vn</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Inquiry Form ────────────────────────────────── */}
          <div className="bg-white border border-joy-border rounded-2xl p-8">
            <h2 className="font-serif text-2xl text-joy-ink font-light mb-2">
              Gửi yêu cầu
            </h2>
            <p className="font-sans text-sm text-joy-muted mb-7 leading-relaxed">
              Dành cho khách muốn hỏi về thuê dài hạn hoặc có yêu cầu đặc biệt.
              Chúng tôi phản hồi trong vòng <strong className="text-joy-ink">1–2 giờ</strong>.
            </p>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-joy-green/10 flex items-center
                                justify-center mx-auto mb-4">
                  <Send size={22} className="text-joy-green" />
                </div>
                <h3 className="font-serif text-xl text-joy-ink mb-2">Đã gửi thành công!</h3>
                <p className="font-sans text-sm text-joy-muted">
                  Cảm ơn bạn. Chúng tôi sẽ liên hệ sớm nhất có thể.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs font-semibold tracking-[0.12em]
                                       uppercase text-joy-muted mb-1.5">
                      Họ tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-2.5 border border-joy-border rounded-xl
                                 font-sans text-sm text-joy-ink placeholder:text-joy-muted/50
                                 focus:outline-none focus:border-joy-green transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs font-semibold tracking-[0.12em]
                                       uppercase text-joy-muted mb-1.5">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0909 000 000"
                      className="w-full px-4 py-2.5 border border-joy-border rounded-xl
                                 font-sans text-sm text-joy-ink placeholder:text-joy-muted/50
                                 focus:outline-none focus:border-joy-green transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold tracking-[0.12em]
                                     uppercase text-joy-muted mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 border border-joy-border rounded-xl
                               font-sans text-sm text-joy-ink placeholder:text-joy-muted/50
                               focus:outline-none focus:border-joy-green transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold tracking-[0.12em]
                                     uppercase text-joy-muted mb-1.5">
                    Nội dung yêu cầu *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tôi muốn hỏi về thuê phòng tháng, có bếp, cho 2 người..."
                    className="w-full px-4 py-2.5 border border-joy-border rounded-xl
                               font-sans text-sm text-joy-ink placeholder:text-joy-muted/50
                               focus:outline-none focus:border-joy-green transition-colors
                               resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3.5"
                >
                  <Send size={15} />
                  Gửi yêu cầu
                </button>

                <p className="font-sans text-xs text-joy-muted text-center">
                  Hoặc nhắn tin nhanh qua{" "}
                  <a href="https://zalo.me/0909000000" className="text-joy-green hover:underline">
                    Zalo
                  </a>{" "}
                  để được phản hồi ngay lập tức.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
