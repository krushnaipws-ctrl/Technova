import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Lock, Mail, User, ShieldCheck } from 'lucide-react';

export const Register: React.FC = () => {
  const { navigate } = useRouter();
  const { signInWithGoogle, signInDemoUser, user } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/account');
  }

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      addToast('Account created and authenticated via Google!', 'success');
      navigate('/account');
    } catch (err: any) {
      console.error(err);
      addToast(err?.message || 'Failed to authenticate with Google.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill out all registration fields.', 'error');
      return;
    }
    if (!terms) {
      addToast('Please agree to the Terms of Service to continue.', 'error');
      return;
    }

    signInDemoUser('customer');
    addToast('Account created successfully! Welcome to TECHNOVA.', 'success');
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
              TN
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">TECHNOVA</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Create Your TECHNOVA Account</h1>
          <p className="text-xs text-slate-500">
            Enjoy expedited dispatch, VIP member discounts, and multi-device cart synchronization.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-5">
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignUp}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign Up with Google (Firebase)</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Or register with email
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Legal Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms-check"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 w-3.5 h-3.5"
              />
              <label htmlFor="terms-check" className="text-xs text-slate-600 select-none">
                I agree to TECHNOVA&rsquo;s{' '}
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-blue-600 hover:underline"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-bold text-blue-600 hover:underline"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
