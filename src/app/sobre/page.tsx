import Image from 'next/image';
import { AppHeader } from '@/components/common/header';
import { AppFooter } from '@/components/common/footer';
import LetterGlitch from '@/components/common/letter-glitch';
import { Card, CardContent } from '@/components/ui/card';

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
       <div className="fixed inset-0 -z-10">
        <LetterGlitch />
      </div>
      <AppHeader />
      <main className="flex-1">
        <section id="about-page" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex justify-center">
                 <Card className="w-full max-w-sm overflow-hidden">
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
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre Mim</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Olá! Sou Diego Ruan, um apaixonado por tecnologia, especialista em desenvolvimento front-end e otimização de campanhas de tráfego pago.
                  </p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                    <p>
                        Minha jornada no mundo da programação começou com o desejo de criar interfaces que não fossem apenas bonitas, mas também intuitivas e de alta performance. Acredito que a experiência do usuário é a chave para o sucesso de qualquer produto digital. Por isso, me dedico a construir aplicações rápidas, responsivas e acessíveis.
                    </p>
                    <p>
                        Além do desenvolvimento, sou fascinado pelo marketing digital, o que me levou a me especializar em gestão de tráfego. Utilizo uma abordagem analítica para criar e otimizar campanhas que não apenas atraem o público certo, mas também geram resultados concretos e mensuráveis para os meus clientes.
                    </p>
                    <p>
                        Quando não estou programando ou analisando métricas, gosto de explorar novas tecnologias, contribuir para projetos de código aberto e tomar um bom café.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
