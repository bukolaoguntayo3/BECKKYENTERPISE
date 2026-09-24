import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { businessSettings, showToast } = useShop();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Your message has been delivered to our concierge team.', 'success');
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubject('');
      setFormMessage('');
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    'Hello BECKKYENTERPRISE, I would like to make an enquiry about your products.'
  );
  const whatsappUrl = `https://wa.me/2348061281910?text=${whatsappMessage}`;

  return (
    <div className="bg-[#F5F6F8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Client Concierge & Inquiries
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#0B1B33] mt-3">
            Contact BECKKYENTERPRISE
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Have questions regarding solid gold hallmarks, custom unisex tailoring, or order dispatch? Our dedicated client advisors are ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-[#0B1B33] to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                      Direct WhatsApp Line
                    </span>
                    <h3 className="text-lg font-bold font-serif-luxury text-white">
                      Instant WhatsApp Concierge
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Chat with our founder and sales team directly on WhatsApp for real-time video consultations, ring sizing, and custom orders.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp: {businessSettings.whatsapp}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Official Contact Directory */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Official Channels
              </h3>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0 border border-amber-200/60">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Email Address</h4>
                  <a
                    href={`mailto:${businessSettings.email}`}
                    className="text-xs text-slate-600 hover:text-amber-700 transition-colors break-all"
                  >
                    {businessSettings.email}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Response within 2–4 hours</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0 border border-amber-200/60">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Telephone Hotline</h4>
                  <a
                    href={`tel:${businessSettings.phone}`}
                    className="text-xs text-slate-600 hover:text-amber-700 transition-colors font-medium"
                  >
                    {businessSettings.phone}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Voice calls & SMS</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0 border border-amber-200/60">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Business Showroom & Logistics Hub</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {businessSettings.address}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Nationwide pickup & insured courier dispatch</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0 border border-amber-200/60">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Operating Hours</h4>
                  <p className="text-xs text-slate-600">
                    {businessSettings.businessHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Presence */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Follow Our Lookbooks & Reels
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://www.tiktok.com/@${businessSettings.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 transition-colors"
                >
                  <span className="text-sm">🎵</span>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-400 uppercase">TikTok</p>
                    <p className="truncate text-xs">@{businessSettings.tiktok}</p>
                  </div>
                </a>

                <a
                  href={`https://www.instagram.com/${businessSettings.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 transition-colors"
                >
                  <span className="text-sm">📸</span>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-400 uppercase">Instagram</p>
                    <p className="truncate text-xs">@{businessSettings.instagram}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
              <h3 className="text-lg font-bold font-serif-luxury text-[#0B1B33] mb-1">
                Send a Written Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the form below and an official BECKKYENTERPRISE client manager will contact you promptly.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">Message Dispatched</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you! Your inquiry has been received. Our team will contact you via email or phone within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Bukola Oguntayo"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. 08061281910"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject of Inquiry
                      </label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                      >
                        <option value="">Select a topic...</option>
                        <option value="Gold Jewelry Inquiry">Gold & Fine Jewelry Customization</option>
                        <option value="Unisex Sizing Guidance">Unisex "Up & Down" Sizing & Stock</option>
                        <option value="Supplements Consultation">Body Glow & Anti-Aging Inquiries</option>
                        <option value="Order Tracking & Logistics">Order Tracking & Delivery Status</option>
                        <option value="Wholesale & Bulk Orders">VIP Wholesale & Corporate Gifting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Please specify your product questions, sizing requirements, or order details..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B33] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
