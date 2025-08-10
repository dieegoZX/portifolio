
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

function AboutForm({ initialData }: { initialData: AboutFormValues }) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AboutFormValues>({
        resolver: zodResolver(aboutInfoSchema),
        defaultValues: initialData,
    });

    const profilePictureUrl = watch("profilePictureUrl");

    const onSubmit: SubmitHandler<AboutFormValues> = async (data) => {
        startTransition(async () => {
            try {
                // Client-side write operation
                const aboutDocRef = doc(db, 'about', 'main');
                await setDoc(aboutDocRef, data, { merge: true });

                // Server-side cache revalidation
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
                const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: `Ocorreu um erro ao salvar as informações: ${errorMessage}`,
                });
            }
        });
    };
    
    // Display validation errors as toasts
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <div className="space-y-2">
                <Label htmlFor="profile-picture-url">URL da Foto de Perfil</Label>
                 <div className="flex items-start gap-4">
                    <Image 
                        src={profilePictureUrl || "https://placehold.co/600x800.png"} 
                        alt="Pré-visualização da foto de perfil" 
                        width={80} 
                        height={80} 
                        className="rounded-full object-cover border" 
                        data-ai-hint="man developer portrait"
                        onError={() => setValue("profilePictureUrl", "https://placehold.co/600x800.png")}
                        key={profilePictureUrl} // Force re-render on URL change
                    />
                    <div className="flex-grow space-y-2">
                        <Input 
                            id="profile-picture-url" 
                            type="url"
                            placeholder="https://exemplo.com/sua-foto.png"
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
    const { user } = useAuth(); // Auth context provides user session info
    const [aboutData, setAboutData] = useState<AboutFormValues | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // We need an authenticated user to fetch data for their specific 'about' page
        if (!user) return; 

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const docRef = doc(db, 'about', 'main');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setAboutData(docSnap.data() as AboutFormValues);
                } else {
                    // Set default empty data if the document doesn't exist yet
                    setAboutData({
                        mainParagraph: "",
                        paragraph1: "",
                        paragraph2: "",
                        paragraph3: "",
                        profilePictureUrl: "",
                    });
                }
            } catch (err) {
                console.error("Firebase read error:", err);
                const errorMessage = err instanceof Error ? err.message : 'Falha ao carregar os dados.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user]); // Rerun effect when user object changes

    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Página Sobre</CardTitle>
                <CardDescription>Atualize as informações da sua página "Sobre Mim".</CardDescription>
            </CardHeader>
            <CardContent>
                {loading && <AboutPageSkeleton />}
                {error && <p className="text-destructive text-center py-8">{error}</p>}
                {!loading && !error && aboutData && <AboutForm initialData={aboutData} />}
            </CardContent>
        </Card>
    )
}
