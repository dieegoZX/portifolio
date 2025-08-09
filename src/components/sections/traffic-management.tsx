import { Target, TrendingUp, BarChart, Facebook, Bot } from 'lucide-react';

const services = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'Estratégia Personalizada',
    description: 'Desenvolvimento de estratégias de tráfego pago alinhadas aos seus objetivos de negócio.',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Gestão de Campanhas',
    description: 'Criação e gerenciamento de campanhas no Google Ads, Meta Ads e outras plataformas.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Otimização e Análise',
    description: 'Monitoramento contínuo e otimização de campanhas para maximizar o ROI.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Resultados Mensuráveis',
    description: 'Relatórios detalhados para acompanhar o desempenho e o impacto das campanhas.',
  }
];

export function TrafficManagementSection() {
  return (
    <section id="traffic" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Gerenciamento de Tráfego Pago</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Atraia o público certo e converta visitantes em clientes com campanhas de tráfego pago eficientes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="grid gap-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  {service.icon}
                </div>
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
