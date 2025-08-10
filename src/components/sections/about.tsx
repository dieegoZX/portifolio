import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Um Pouco Sobre Mim</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Sou um desenvolvedor front-end e gestor de tráfego apaixonado por criar soluções digitais que unem design, performance e resultados.
                </p>
                <Button asChild>
                    <Link href="/sobre">
                        Saber Mais <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
             <div className="flex justify-center">
                 <Card className="w-full max-w-sm overflow-hidden rounded-xl shadow-lg">
                    <CardContent className="p-0">
                        <Image
                        src="https://placehold.co/600x800.png"
                        alt="Foto de Diego Ruan"
                        width={600}
                        height={800}
                        className="h-full w-full object-cover"
                        data-ai-hint="man developer portrait"
                        />
                    </CardContent>
                 </Card>
              </div>
        </div>
      </div>
    </section>
  );
}
