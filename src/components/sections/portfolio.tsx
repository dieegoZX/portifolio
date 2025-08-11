
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CardSwap, { Card } from '@/components/ui/card-swap';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[]; // Alterado para aceitar diretamente um array de strings
  liveUrl: string;
  codeUrl: string;
  aiHint: string;
  status: 'Publicado' | 'Rascunho';
}

const technologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Firebase', 'Node.js'
];

async function fetchProjects(): Promise<Project[]> {
    try {
        if (!db) {
            console.error("Firestore DB connection not available.");
            return [];
        }
        const projectsCollection = collection(db, "projects");
        const q = query(projectsCollection, where("status", "==", "Publicado"));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            console.log("No published projects found in Firestore.");
            return [];
        }

        const projectsData = querySnapshot.docs
          .map(doc => ({ 
              id: doc.id, 
              ...doc.data() 
          } as Project))
          .filter(project => project.image && project.image.trim() !== '');
        
        return projectsData;
    } catch (error) {
        console.error("Error fetching projects from Firestore: ", error);
        return [];
    }
}

async function PortfolioSection() {
  const projects = await fetchProjects();

  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container flex items-center px-4 md:px-6 h-[600px]">
        <div className="flex flex-col items-start justify-center space-y-4 text-left w-1/2 h-full">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Portfólio de Projetos</h2>
            <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Uma seleção de projetos que demonstram minhas habilidades em desenvolvimento front-end.
            </p>
             <Button asChild>
                <Link href="#contact">
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
            {projects.length > 0 ? (
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
                                {Array.isArray(project.tags) && project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
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
             ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Nenhum projeto publicado encontrado.</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}

export { PortfolioSection };
