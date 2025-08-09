import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Silva',
    title: 'CEO, Tech Inova',
    avatar: 'https://placehold.co/100x100.png',
    testimonial: 'O Diego transformou nossa landing page. O novo design aumentou nossas conversões em 30% na primeira semana. Profissionalismo e talento incríveis!',
    aiHint: 'woman portrait',
  },
  {
    name: 'Carlos Pereira',
    title: 'Gerente de Marketing, Vende+',
    avatar: 'https://placehold.co/100x100.png',
    testimonial: 'As campanhas de tráfego que o Diego gerencia para nós trouxeram um ROI de 5x. Sua expertise em otimização é fundamental para nosso sucesso.',
    aiHint: 'man portrait',
  },
  {
    name: 'Juliana Costa',
    title: 'Empreendedora',
    avatar: 'https://placehold.co/100x100.png',
    testimonial: 'O trabalho de front-end no meu site ficou impecável. Rápido, responsivo e exatamente como eu imaginei. Recomendo fortemente!',
    aiHint: 'business woman',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">O Que Dizem os Clientes</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A satisfação dos meus clientes é a minha maior prioridade.
            </p>
          </div>
        </div>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="mx-auto w-full max-w-4xl pt-12"
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                       <Avatar className="h-12 w-12">
                         <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.aiHint}/>
                         <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-semibold">{item.name}</p>
                         <p className="text-sm text-muted-foreground">{item.title}</p>
                       </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary"/>)}
                        </div>
                      <p className="text-foreground/80">&ldquo;{item.testimonial}&rdquo;</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
