import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="w-full py-24 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl/none">
              Diego Ruan
            </h1>
            <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Desenvolvedor Front-End & Gestor de Tráfego
            </p>
            <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
              Criando interfaces de usuário de alta performance e otimizando campanhas de tráfego pago para impulsionar seus resultados.
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="#contact">
                Entre em Contato
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
