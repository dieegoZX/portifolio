
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { revalidateAboutPaths } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

const aboutInfoSchema = z.object({
    mainParagraph: z.string().min(10, "O parágrafo principal deve ter pelo menos 10 caracteres."),
    paragraph1: z.string().min(10, "O primeiro parágrafo deve ter pelo menos 10 caracteres."),
    paragraph2: z.string().min(10, "O segundo parágrafo deve ter pelo menos 10 caracteres."),
    paragraph3: z.string().min(10, "O terceiro parágrafo deve ter pelo menos 10 caracteres."),
    profilePictureUrl: z.string().url("Por favor, insira um URL válido.").min(1, "A URL da foto é obrigatória."),
});

type AboutFormValues = z.infer<typeof aboutInfoSchema>;

// Este componente foi reescrito do zero para garantir a funcionalidade correta.
function AboutForm() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    // Acessa os métodos do formulário (fornecidos pelo FormProvider)
    const { register, handleSubmit, watch, formState: { errors } } = useFormContext<AboutFormValues>();

    // 'watch' observa o campo em tempo real. Esta é a única fonte de verdade para a URL.
    const previewUrl = watch("profilePictureUrl");

    const onSubmit: SubmitHandler<AboutFormValues> = (data) => {
        startTransition(async () => {
            try {
                if (!db) {
                    throw new Error("Conexão com o banco de dados não estabelecida.");
                }
                const aboutDocRef = doc(db, 'about', 'main');
                await setDoc(aboutDocRef, data, { merge: true });

                const revalidationResult = await revalidateAboutPaths();

                if (revalidationResult.success) {
                    toast({
                        title: "Sucesso!",
                        description: "Informações da página 'Sobre' atualizadas com sucesso!",
                    });
                } else {
                    throw new Error(revalidationResult.message);
                }

            } catch (error) {
                console.error("Firebase save error:", error);
                const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: `Ocorreu um erro ao salvar as informações: ${errorMessage}`,
                });
            }
        });
    };

    // Efeito para mostrar erros de validação
    useEffect(() => {
        const errorMessages = Object.values(errors).map(e => e.message);
        const uniqueErrorMessages = [...new Set(errorMessages)];
        uniqueErrorMessages.forEach((message) => {
            if (message) {
                toast({
                    variant: "destructive",
                    title: "Erro de Validação",
                    description: message,
                });
            }
        });
    }, [errors, toast]);
    
    const placeholderImage = "https://placehold.co/600x800.png";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="profile-picture-url">URL da Foto de Perfil</Label>
                <div className="flex items-start gap-4">
                    <Image
                        // A 'key' é crucial. Ela força o React a recarregar o componente
                        // quando a URL muda, garantindo a atualização da pré-visualização.
                        key={previewUrl}
                        src={previewUrl || placeholderImage}
                        alt="Pré-visualização da foto de perfil"
                        width={80}
                        height={80}
                        className="rounded-full object-cover border"
                        data-ai-hint="man developer portrait"
                    />
                    <div className="flex-grow space-y-2">
                        <Input
                            id="profile-picture-url"
                            type="url"
                            placeholder="https://exemplo.com/sua-foto.png"
                            // 'register' conecta o input ao react-hook-form
                            {...register("profilePictureUrl")}
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
                    {...register("mainParagraph")}
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="paragraph-1">Primeiro Parágrafo</Label>
                <Textarea
                    id="paragraph-1"
                    {...register("paragraph1")}
                    rows={5}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="paragraph-2">Segundo Parágrafo</Label>
                <Textarea
                    id="paragraph-2"
                    {...register("paragraph2")}
                    rows={5}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="paragraph-3">Terceiro Parágrafo</Label>
                <Textarea
                    id="paragraph-3"
                    {...register("paragraph3")}
                    rows={3}
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Alterações
                </Button>
            </div>
        </form>
    );
}


function AboutPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full max-w-lg" />
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
            <div className="flex justify-end">
                <Skeleton className="h-10 w-36" />
            </div>
        </div>
    )
}

export default function SobreAdminPage() {
    const { user, loading: authLoading } = useAuth();
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useForm agora é chamado no componente pai, que gerencia o estado.
    const methods = useForm<AboutFormValues>({
        resolver: zodResolver(aboutInfoSchema),
        defaultValues: {
            mainParagraph: "",
            paragraph1: "",
            paragraph2: "",
            paragraph3: "",
            profilePictureUrl: "",
        },
    });

    useEffect(() => {
        if (authLoading) {
            setLoadingData(true);
            return;
        }
        if (!user) {
            setLoadingData(false);
            return;
        }

        async function fetchData() {
            setLoadingData(true);
            setError(null);
            try {
                const docRef = doc(db, 'about', 'main');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // 'reset' atualiza os valores do formulário com os dados do Firebase
                    methods.reset(data as AboutFormValues);
                }
            } catch (err) {
                console.error("Firebase read error:", err);
                const errorMessage = err instanceof Error ? err.message : 'Falha ao carregar os dados.';
                setError(errorMessage);
            } finally {
                setLoadingData(false);
            }
        }

        fetchData();
    }, [user, authLoading, methods]);

    const isLoading = authLoading || loadingData;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Página Sobre</CardTitle>
                <CardDescription>Atualize as informações da sua página "Sobre Mim".</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <AboutPageSkeleton />
                ) : error ? (
                    <p className="text-destructive text-center py-8">{error}</p>
                ) : (
                    // FormProvider passa a instância do formulário para os componentes filhos
                    <FormProvider {...methods}>
                        <AboutForm />
                    </FormProvider>
                )}
            </CardContent>
        </Card>
    )
}
