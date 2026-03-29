import { GlassCard } from "@/components/glass-card";
import { ArrowRight, Code, Terminal, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6 sm:px-12 flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Next.js App Router + Neon DB
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
          Construindo Ideias com <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Código e Desempenho</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Desenvolvedor Full-Stack focado em criar experiências incríveis na web através de designs futuristas e alta performance utilizando Cloudflare + Neon Postgres.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center gap-2 group">
            Ver Projetos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors font-medium text-white">
            Contato
          </button>
        </div>
      </section>

      {/* Feature Grid / Cards */}
      <section className="mt-32 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="hover:-translate-y-2 transition-transform duration-300">
          <Terminal className="w-10 h-10 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Engenharia de Software</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Arquiteturas limpas e escaláveis utilizando a stack mais moderna e veloz do ecossistema React.
          </p>
        </GlassCard>

        <GlassCard className="hover:-translate-y-2 transition-transform duration-300 transition-delay-100">
          <Zap className="w-10 h-10 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Performance Extrema</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Hospedagem Serverless na Edge, banco Neon (Postgres) e renderizações estáticas para LCP na casa dos milisegundos.
          </p>
        </GlassCard>

        <GlassCard className="hover:-translate-y-2 transition-transform duration-300 transition-delay-200">
          <Code className="w-10 h-10 text-pink-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Inteligência Artificial</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Automações integradas nos bastidores com Cloudflare Workers e APIs do Google Genkit.
          </p>
        </GlassCard>
      </section>

    </main>
  );
}
