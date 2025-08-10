
'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  testimonial: string;
  aiHint: string;
  status: 'Publicado' | 'Rascunho';
}

function TestimonialSkeleton() {
    return (
        <div className="p-1">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-4 w-4" />)}
                    </div>
                    <div className="space-y-2">
                       <Skeleton className="h-4 w-full" />
                       <Skeleton className="h-4 w-full" />
                       <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            if (!db) return;
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "testimonials"));
                const testimonialsData = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as Testimonial))
                    .filter(testimonial => testimonial.status === 'Publicado');
                setTestimonials(testimonialsData);
            } catch (error) {
                console.error("Error fetching testimonials: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">O Que Dizem os Clientes</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A satisfação dos meus clientes é a minha maior prioridade.
            </p>
          </div>
        </div>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="mx-auto w-full max-w-4xl pt-12"
        >
          <CarouselContent>
            {loading ? (
                <>
                    <CarouselItem className="md:basis-1/2"><TestimonialSkeleton/></CarouselItem>
                    <CarouselItem className="md:basis-1/2"><TestimonialSkeleton/></CarouselItem>
                    <CarouselItem className="md:basis-1/2"><TestimonialSkeleton/></CarouselItem>
                </>
            ) : (
                testimonials.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2">
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
                ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
