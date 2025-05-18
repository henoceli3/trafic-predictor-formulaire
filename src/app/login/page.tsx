"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenue</h1>
          <p className="text-gray-500 mt-2">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-primary-100 rounded border-gray-300 focus:ring-primary-100"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Se souvenir de moi
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-primary-100 hover:text-primary-200"
            >
              Mot de passe oublié?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-primary-100 to-primary-200 text-white rounded-lg hover:from-primary-200 hover:to-primary-300 focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 transition-all duration-200"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte?{" "}
            <a href="#" className="text-primary-100 hover:text-primary-200">
              S&apos;inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
