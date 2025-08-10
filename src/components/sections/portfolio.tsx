
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CardSwap, { Card } from '@/components/ui/card-swap';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
  aiHint: string;
  status: 'Publicado' | 'Rascunho';
}


const technologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Firebase', 'Node.js'
]

function CardSwapSkeleton() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[500px] h-[400px]">
                <Skeleton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-xl" />
                <Skeleton className="absolute top-1/2 left-1/2 -translate-x-[calc(50%-60px)] -translate-y-[calc(50%+70px)] w-full h-full rounded-xl opacity-50" />
            </div>
        </div>
    )
}

export function PortfolioSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!db) return;
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsData = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as Project))
                    .filter(project => project.status === 'Publicado');
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container flex items-center px-4 md:px-6 h-[600px]">
        <div className="flex flex-col items-start justify-center space-y-4 text-left w-1/2 h-full">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Portfólio de Projetos</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Uma seleção de projetos que demonstram minhas habilidades em desenvolvimento front-end.
            </p>
             <Button asChild>
                <Link href="/admin/projetos">
                    Ver todos os projetos <MoveRight className="ml-2 h-4 w-4" />
                </Link>
             </Button>
          </div>
           <div className="space-y-4 pt-8">
                <h3 className="text-xl font-semibold">Tecnologias que Domino</h3>
                 <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                 </div>
            </div>
        </div>
        <div className="w-1/2 h-full relative">
            {loading ? <CardSwapSkeleton /> : (
                <CardSwap>
                  {projects.map((project) => (
                    <Card key={project.id}>
                        <div className="flex flex-col h-full p-6">
                            <div className="relative h-48 w-full mb-4">
                               <Image src={project.image} alt={project.title} fill objectFit="cover" className="rounded-lg" data-ai-hint={project.aiHint} />
                            </div>
                            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2 text-card-foreground">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                             <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                             </div>
                          <div className="flex justify-between mt-auto">
                            <Button asChild variant="outline">
                              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" /> Ver Projeto
                              </Link>
                            </Button>
                            <Button asChild variant="ghost">
                              <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                                <Code className="mr-2 h-4 w-4" /> Código
                              </Link>
                            </Button>
                          </div>
                        </div>
                    </Card>
                  ))}
                </CardSwap>
            )}
        </div>
      </div>
    </section>
  );
}
