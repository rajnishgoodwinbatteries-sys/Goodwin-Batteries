"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Lock, Sparkles, Loader2 } from "lucide-react";

function CustomerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account/orders";

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const cleanPhone = phone.replace(/\D/g, "");
      localStorage.setItem("goodwin_customer_phone", cleanPhone);
      if (name.trim()) {
        localStorage.setItem("goodwin_customer_name", name.trim());
      }
      setLoading(false);
      router.push(redirectTo);
    }, 700);
  };

  const handleQuickDemoLogin = (demoPhone: string, demoName: string) => {
    setLoading(true);
    localStorage.setItem("goodwin_customer_phone", demoPhone);
    localStorage.setItem("goodwin_customer_name", demoName);
    setTimeout(() => {
      setLoading(false);
      router.push(redirectTo);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12 md:py-20 text-slate-900">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header / Brand Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-[#00843D] to-teal-700 p-8 text-white text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2.5 mx-auto mb-4 flex items-center justify-center border border-white/20 shadow-inner">
            <Image
              src="/assets/logo/Goodwin.png"
              alt="Goodwin Batteries"
              width={56}
              height={56}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="font-heading font-black text-2xl tracking-tight">
            Customer Account
          </h1>
          <p className="text-emerald-100 text-xs mt-1 font-medium">
            Login to track live orders, download GST invoices & manage warranty
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold">
              {error}
            </div>
          )}

          {step === "phone" ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Your Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajnish Chauhan"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#00843D] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  10-Digit Mobile Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter mobile number"
                    autoFocus
                    required
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold tracking-wider focus:border-[#00843D] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  We will identify all orders associated with this mobile number.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full py-3.5 bg-[#00843D] hover:bg-[#006830] text-white rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <>Continue &rarr;</>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center mb-2">
                <span className="text-xs text-slate-500 font-medium">OTP sent to </span>
                <strong className="text-xs text-slate-900">+91 {phone}</strong>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-[11px] text-[#00843D] font-bold ml-2 hover:underline"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 text-center mb-3">
                  Enter 4-Digit Verification Code
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const next = [...otp];
                        next[idx] = val;
                        setOtp(next);
                        if (val && idx < 3) {
                          document.getElementById(`otp-input-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                          document.getElementById(`otp-input-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-12 h-14 bg-slate-50 border-2 border-slate-200 focus:border-[#00843D] rounded-xl text-center text-xl font-black text-slate-900 focus:outline-none"
                    />
                  ))}
                </div>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  (Test Mode: You can enter any 4 numbers, e.g. 1 2 3 4)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#00843D] hover:bg-[#006830] text-white rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <>Verify & View My Orders &rarr;</>}
              </button>
            </form>
          )}

          {/* Quick Demo Logins for Testing */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block text-center mb-3">
              Fast Test Access (Click to Login Instantly)
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("8097728851", "Goodwin Grow")}
                className="w-full p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left text-xs flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-900 block">Goodwin Grow</span>
                  <span className="text-[11px] text-slate-500">+91 8097728851 (2 Live Orders)</span>
                </div>
                <span className="text-[10px] font-black text-[#00843D] bg-emerald-100 px-2 py-0.5 rounded">
                  Login &rarr;
                </span>
              </button>
            </div>
          </div>

          {/* Goodwin Trust Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
            <ShieldCheck size={14} className="text-[#00843D]" />
            <span>100% Safe & Secure Goodwin Customer Portal</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs">
          <Link href="/track-order" className="text-[#00843D] font-bold hover:underline">
            Don&apos;t want to login? Track by Order ID directly &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="animate-spin text-[#00843D]" size={36} />
      </div>
    }>
      <CustomerLoginForm />
    </Suspense>
  );
}
