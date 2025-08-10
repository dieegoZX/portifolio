import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function SobreAdminPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Página Sobre</CardTitle>
                <CardDescription>Atualize as informações da sua página "Sobre Mim".</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="profile-picture">Foto de Perfil</Label>
                    <div className="flex items-center gap-4">
                        <Image src="https://placehold.co/600x800.png" alt="Foto de perfil atual" width={80} height={80} className="rounded-full object-cover" data-ai-hint="man developer portrait" />
                        <Input id="profile-picture" type="file" className="max-w-sm" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="main-paragraph">Parágrafo Principal</Label>
                    <Textarea 
                        id="main-paragraph" 
                        defaultValue="Olá! Sou Diego Ruan, um apaixonado por tecnologia, especialista em desenvolvimento front-end e otimização de campanhas de tráfego pago."
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="paragraph-1">Primeiro Parágrafo</Label>
                    <Textarea 
                        id="paragraph-1" 
                        defaultValue="Minha jornada no mundo da programação começou com o desejo de criar interfaces que não fossem apenas bonitas, mas também intuitivas e de alta performance. Acredito que a experiência do usuário é a chave para o sucesso de qualquer produto digital. Por isso, me dedico a construir aplicações rápidas, responsivas e acessíveis."
                        rows={5}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="paragraph-2">Segundo Parágrafo</Label>
                    <Textarea 
                        id="paragraph-2" 
                        defaultValue="Além do desenvolvimento, sou fascinado pelo marketing digital, o que me levou a me especializar em gestão de tráfego. Utilizo uma abordagem analítica para criar e otimizar campanhas que não apenas atraem o público certo, mas também geram resultados concretos e mensuráveis para os meus clientes."
                        rows={5}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="paragraph-3">Terceiro Parágrafo</Label>
                    <Textarea 
                        id="paragraph-3" 
                        defaultValue="Quando não estou programando ou analisando métricas, gosto de explorar novas tecnologias, contribuir para projetos de código aberto e tomar um bom café."
                        rows={3}
                    />
                </div>

                <div className="flex justify-end">
                    <Button>Salvar Alterações</Button>
                </div>

            </CardContent>
        </Card>
    )
}
