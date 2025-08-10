
'use client'

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveLandingPage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const landingPageSchema = z.object({
    title: z.string().min(2, "Título é obrigatório."),
    description: z.string().min(10, "Descrição é obrigatória."),
    beforeImage: z.string().url("URL da imagem 'Antes' inválida."),
    afterImage: z.string().url("URL da imagem 'Depois' inválida."),
    result: z.string().min(2, "Resultado é obrigatório."),
    aiHintBefore: z.string().optional(),
    aiHintAfter: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

type LandingPageFormValues = z.infer<typeof landingPageSchema>;

export default function EditarLandingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, control } = useForm<LandingPageFormValues>({
        resolver: zodResolver(landingPageSchema),
    });

    useEffect(() => {
        const fetchLandingPage = async () => {
            if (!db) return;
            const docRef = doc(db, 'landingPages', params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                reset(docSnap.data() as LandingPageFormValues);
            } else {
                toast({ variant: 'destructive', title: 'Erro', description: 'Landing page não encontrada.' });
                router.push('/admin/landing-pages');
            }
        };
        fetchLandingPage();
    }, [params.id, reset, router, toast]);

    const onSubmit: SubmitHandler<LandingPageFormValues> = async (data) => {
        const result = await saveLandingPage(params.id, data);
        if (result?.success === false) {
             toast({ variant: "destructive", title: "Erro", description: result.message });
        } else {
             toast({ title: "Sucesso!", description: "Landing Page atualizada com sucesso." });
            router.push('/admin/landing-pages');
        }
    };
    
    if (!control._formValues.title) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-8 w-48" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-64" /></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-24 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                    <div className="flex justify-end gap-2"><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" /></div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Landing Page</CardTitle>
                <CardDescription>Atualize os dados da landing page.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" {...register("description")} />
                        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="beforeImage">URL da Imagem 'Antes'</Label>
                            <Input id="beforeImage" type="url" {...register("beforeImage")} />
                            {errors.beforeImage && <p className="text-sm text-destructive">{errors.beforeImage.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="afterImage">URL da Imagem 'Depois'</Label>
                            <Input id="afterImage" type="url" {...register("afterImage")} />
                            {errors.afterImage && <p className="text-sm text-destructive">{errors.afterImage.message}</p>}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="aiHintBefore">Dica IA 'Antes'</Label>
                            <Input id="aiHintBefore" {...register("aiHintBefore")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="aiHintAfter">Dica IA 'Depois'</Label>
                            <Input id="aiHintAfter" {...register("aiHintAfter")} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="result">Resultado</Label>
                            <Input id="result" {...register("result")} placeholder="Ex: +20% Conversão" />
                            {errors.result && <p className="text-sm text-destructive">{errors.result.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select onValueChange={(value) => setValue('status', value as 'Publicado' | 'Rascunho')} defaultValue={control._formValues.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Publicado">Publicado</SelectItem>
                                    <SelectItem value="Rascunho">Rascunho</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild>
                           <Link href="/admin/landing-pages">Cancelar</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar Alterações
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
