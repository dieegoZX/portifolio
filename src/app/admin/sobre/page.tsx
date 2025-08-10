
'use client';

import { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import Image from "next/image";

import { updateAboutInfo } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { getAboutData, AboutData } from '@/services/about';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Salvar Alterações
    </Button>
  );
}

function AboutForm({ initialData }: { initialData: AboutData }) {
    const [state, formAction] = useActionState(updateAboutInfo, null);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(initialData.profilePictureUrl || null);

    useEffect(() => {
        if (state?.success === true) {
            toast({
                title: "Sucesso!",
                description: state.message,
            });
        } else if (state?.success === false && state.message) {
            toast({
                variant: "destructive",
                title: "Erro!",
                description: state.message,
            });
        }
    }, [state, toast]);
    
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreviewImage(event.target.value);
    };


    return (
        <form ref={formRef} action={formAction} className="space-y-6">
             <div className="space-y-2">
                <Label htmlFor="profile-picture-url">URL da Foto de Perfil</Label>
                 <div className="flex items-start gap-4">
                    <Image 
                        src={previewImage || "https://placehold.co/600x800.png"} 
                        alt="Pré-visualização da foto de perfil" 
                        width={80} 
                        height={80} 
                        className="rounded-full object-cover border" 
                        data-ai-hint="man developer portrait"
                        onError={() => setPreviewImage("https://placehold.co/600x800.png")}
                    />
                    <div className="flex-grow space-y-2">
                        <Input 
                            id="profile-picture-url" 
                            name="profilePictureUrl" 
                            type="url"
                            placeholder="https://exemplo.com/sua-foto.png"
                            defaultValue={initialData.profilePictureUrl}
                            onChange={handleUrlChange}
                            className="max-w-lg"
                        />
                         <p className="text-sm text-muted-foreground">Cole o link de uma imagem hospedada publicamente.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="main-paragraph">Parágrafo Principal</Label>
                <Textarea 
                    id="main-paragraph" 
                    name="mainParagraph"
                    defaultValue={initialData.mainParagraph}
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="paragraph-1">Primeiro Parágrafo</Label>
                <Textarea 
                    id="paragraph-1" 
                    name="paragraph1"
                    defaultValue={initialData.paragraph1}
                    rows={5}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="paragraph-2">Segundo Parágrafo</Label>
                <Textarea 
                    id="paragraph-2" 
                    name="paragraph2"
                    defaultValue={initialData.paragraph2}
                    rows={5}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="paragraph-3">Terceiro Parágrafo</Label>
                <Textarea 
                    id="paragraph-3" 
                    name="paragraph3"
                    defaultValue={initialData.paragraph3}
                    rows={3}
                />
            </div>

            <div className="flex justify-end">
                <SubmitButton />
            </div>
        </form>
    );
}

export default function SobreAdminPage() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await getAboutData();
                setAboutData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Falha ao carregar os dados.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Página Sobre</CardTitle>
                <CardDescription>Atualize as informações da sua página "Sobre Mim".</CardDescription>
            </CardHeader>
            <CardContent>
                {loading && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-20 w-20 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-[400px]" />
                                <Skeleton className="h-4 w-[300px]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {!loading && !error && aboutData && <AboutForm initialData={aboutData} />}
            </CardContent>
        </Card>
    )
}
