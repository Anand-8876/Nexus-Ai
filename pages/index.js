import { useState } from 'react';
import { useRouter } from 'next/router';
import { MessageSquare, Loader, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/chat');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="text-center">
            <div className="flex justify-center mb-4">
                 <MessageSquare size={48} className="text-indigo-400" />
            </div>
          
          <p className="mt-2 text-gray-400">Please sign in to continue.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <input
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              type="email"
              required
            />
          </div>
          <div className="relative">
             <input
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Signing In...</span>
              </>
            ) : (
                <>
                <KeyRound size={20} />
                <span>Sign In</span>
                </>
            )}
          </button>
        </form>
         <p className="text-xs text-center text-gray-500">
            This is a demo application. Any credentials will work.
        </p>
      </div>
    </div>
  );
}
