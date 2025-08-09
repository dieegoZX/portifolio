import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const landingPages = [
  {
    title: 'LP para Lançamento de Curso',
    description: 'Landing page otimizada para conversão, resultando em um aumento de 45% nas inscrições.',
    beforeImage: 'https://placehold.co/600x400.png',
    afterImage: 'https://placehold.co/600x400.png',
    result: '+45% Conversão',
    aiHintBefore: 'simple website',
    aiHintAfter: 'modern website',
  },
  {
    title: 'Página de Vendas de SaaS',
    description: 'Redesign da página de vendas focado em clareza e CTAs, que dobrou a taxa de cliques.',
    beforeImage: 'https://placehold.co/600x400.png',
    afterImage: 'https://placehold.co/600x400.png',
    result: '+100% CTR',
    aiHintBefore: 'corporate website',
    aiHintAfter: 'saas website',
  },
];

export function LandingPagesSection() {
  return (
    <section id="landing-pages" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeria de Landing Pages</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Exemplos de landing pages que criei, com foco em design e performance para conversão.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-1 lg:grid-cols-2">
          {landingPages.map((page) => (
            <Card key={page.title} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
                <Badge className="w-fit bg-secondary hover:bg-secondary/80">{page.result}</Badge>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="after" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="before">Antes</TabsTrigger>
                    <TabsTrigger value="after">Depois</TabsTrigger>
                  </TabsList>
                  <TabsContent value="before">
                    <Image src={page.beforeImage} alt={`Antes - ${page.title}`} width={600} height={400} className="rounded-md object-cover" data-ai-hint={page.aiHintBefore}/>
                  </TabsContent>
                  <TabsContent value="after">
                    <Image src={page.afterImage} alt={`Depois - ${page.title}`} width={600} height={400} className="rounded-md object-cover" data-ai-hint={page.aiHintAfter}/>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
