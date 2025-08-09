import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'E-commerce Moderno',
    description: 'Plataforma de e-commerce completa com Next.js, com foco em performance e experiência do usuário.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
    liveUrl: '#',
    codeUrl: '#',
    aiHint: 'ecommerce website',
  },
  {
    title: 'Dashboard Analítico',
    description: 'Painel de controle interativo para visualização de dados, construído com React e Recharts.',
    image: 'https://placehold.co/600x400.png',
    tags: ['React', 'TypeScript', 'Recharts'],
    liveUrl: '#',
    codeUrl: '#',
    aiHint: 'dashboard data',
  },
  {
    title: 'Sistema de Reservas',
    description: 'Aplicação web para agendamento de serviços, com integração de calendário e pagamentos.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Vue.js', 'Firebase', 'Node.js'],
    liveUrl: '#',
    codeUrl: '#',
    aiHint: 'booking system',
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Portfólio de Projetos</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Uma seleção de projetos que demonstram minhas habilidades em desenvolvimento front-end.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <CardHeader>
                <div className="relative h-48 w-full">
                   <Image src={project.image} alt={project.title} fill objectFit="cover" className="rounded-t-lg" data-ai-hint={project.aiHint} />
                </div>
                <CardTitle className="mt-4">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                 </div>
              </CardContent>
              <CardFooter className="flex justify-between">
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
