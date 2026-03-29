export const runtime = 'edge';
import { db } from "@/db";
import { projects, posts } from "@/db/schema";
import { GlassCard } from "@/components/glass-card";

export default async function AdminDashboard() {
  // Fetch from Neon via Drizzle directly on Server
  const allProjects = await db.select().from(projects);
  const allPosts = await db.select().from(posts);

  return (
    <div className="min-h-screen pt-24 px-6 max-w-6xl mx-auto flex flex-col gap-10">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Painel de Controle
        </h1>
        <button className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform">
          + Criar Novo
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-white/90">Projetos ({allProjects.length})</h2>
          {allProjects.length === 0 ? (
            <GlassCard className="text-center py-10 opacity-60">Nenhum projeto cadastrado.</GlassCard>
          ) : (
            <div className="space-y-4">
              {allProjects.map((p) => (
                <GlassCard key={p.id} className="p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="text-sm text-white/50 line-clamp-2">{p.description}</p>
                </GlassCard>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-white/90">Blog Posts I.A. ({allPosts.length})</h2>
          {allPosts.length === 0 ? (
            <GlassCard className="text-center py-10 opacity-60">Nenhum post publicado.</GlassCard>
          ) : (
            <div className="space-y-4">
              {allPosts.map((p) => (
                <GlassCard key={p.id} className="p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 w-fit">
                    {p.published ? "Público" : "Rascunho"}
                  </span>
                </GlassCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
