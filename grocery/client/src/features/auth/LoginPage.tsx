import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, ShoppingCart, Chrome, ArrowLeft, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

type AuthMethod = 'google' | 'email' | 'phone';
type AuthStep = 'choose' | 'otp';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [method, setMethod] = useState<AuthMethod>('google');
  const [step, setStep] = useState<AuthStep>('choose');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailOtp = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      toast.success(t('auth.otp_sent', { destination: email }));
      setStep('otp');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneOtp = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith('+91') ? phone : `+91${phone}`,
      });
      if (error) throw error;
      toast.success(t('auth.otp_sent', { destination: phone }));
      setStep('otp');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) return;
    setLoading(true);
    try {
      const verifyPayload =
        method === 'email'
          ? { email, token: otp, type: 'email' as const }
          : { phone: phone.startsWith('+91') ? phone : `+91${phone}`, token: otp, type: 'sms' as const };

      const { error } = await supabase.auth.verifyOtp(verifyPayload);
      if (error) throw error;
      toast.success('Welcome! 🎉');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - PriceKart Karnataka</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-surface-50 dark:bg-surface-950">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/2 gradient-hero opacity-5" />
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary-400/10 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent-400/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-elevated p-8 md:p-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                {t('auth.welcome')}
              </h1>
              <p className="text-sm text-surface-500 mt-1 text-center">
                {t('auth.login_subtitle')}
              </p>
            </div>

            {step === 'choose' ? (
              <>
                {/* Google Sign In */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 mb-4 border-2 border-surface-200 dark:border-surface-600 rounded-xl text-sm font-semibold text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {t('auth.google')}
                </button>

                <div className="flex items-center gap-3 my-5">
                  <hr className="flex-1 border-surface-200 dark:border-surface-700" />
                  <span className="text-xs text-surface-400 font-medium">{t('auth.or')}</span>
                  <hr className="flex-1 border-surface-200 dark:border-surface-700" />
                </div>

                {/* Tabs: Email / Phone */}
                <Tabs
                  tabs={[
                    { id: 'email', label: t('auth.email'), icon: <Mail className="w-4 h-4" /> },
                    { id: 'phone', label: t('auth.phone'), icon: <Phone className="w-4 h-4" /> },
                  ]}
                  activeTab={method === 'phone' ? 'phone' : 'email'}
                  onChange={(id) => setMethod(id as AuthMethod)}
                  className="w-full mb-5"
                />

                {method === 'email' || method === 'google' ? (
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder={t('auth.email_placeholder')}
                      icon={<Mail className="w-4 h-4" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      onClick={handleEmailOtp}
                      loading={loading}
                      className="w-full"
                      size="lg"
                    >
                      {t('common.next')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      type="tel"
                      placeholder={t('auth.phone_placeholder')}
                      icon={<Phone className="w-4 h-4" />}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                      onClick={handlePhoneOtp}
                      loading={loading}
                      className="w-full"
                      size="lg"
                    >
                      {t('common.next')}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* OTP Verification Step */
              <div className="space-y-5">
                <button
                  onClick={() => setStep('choose')}
                  className="flex items-center gap-1 text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('common.back')}
                </button>

                <div className="text-center">
                  <p className="text-sm text-surface-500 mb-1">{t('auth.enter_otp')}</p>
                  <p className="text-xs text-surface-400">
                    {t('auth.otp_sent', {
                      destination: method === 'email' ? email : phone,
                    })}
                  </p>
                </div>

                {/* OTP Input */}
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-11 h-13 text-center text-lg font-bold border-2 border-surface-200 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!/^\d?$/.test(val)) return;
                        const newOtp = otp.split('');
                        newOtp[i] = val;
                        setOtp(newOtp.join(''));
                        // Auto-focus next
                        if (val && e.target.nextElementSibling) {
                          (e.target.nextElementSibling as HTMLInputElement).focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[i] && e.currentTarget.previousElementSibling) {
                          (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  loading={loading}
                  className="w-full"
                  size="lg"
                >
                  {t('auth.verify')}
                </Button>

                <button className="w-full text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  {t('auth.resend_otp')}
                </button>
              </div>
            )}

            {/* Terms */}
            <p className="text-[11px] text-surface-400 text-center mt-6 leading-relaxed">
              {t('auth.terms')}
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
