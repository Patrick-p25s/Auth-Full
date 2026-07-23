import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-16">
        <span className="inline-block px-3.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          Gestion de tâches simplifiée
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Gagne en productivité avec{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Organise tes projets personnels et professionnels au même endroit.
          Suis ton avancement au quotidien sans prise de tête.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all text-center"
          >
            Créer un compte gratuitement
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 transition-all text-center"
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
            ✓
          </div>
          <h3 className="font-bold text-slate-900">Organisation intuitive</h3>
          <p className="text-sm text-slate-600">
            Crée, valide et supprime tes tâches en un clic pour garder un esprit
            clair.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
            🏷️
          </div>
          <h3 className="font-bold text-slate-900">Catégorisation</h3>
          <p className="text-sm text-slate-600">
            Classe tes tâches par catégories (Pro, Perso, Autre) pour mieux
            structurer ta journée.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
            🔒
          </div>
          <h3 className="font-bold text-slate-900">Espace sécurisé</h3>
          <p className="text-sm text-slate-600">
            Tes données sont protégées derrière ton compte personnel et
            synchronisées.
          </p>
        </div>
      </section>
    </div>
  );
}
