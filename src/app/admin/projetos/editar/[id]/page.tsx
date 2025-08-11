
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
import { saveProject, ProjectData } from '@/lib/firebase-services';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const projectSchema = z.object({
    title: z.string().min(2, "Título é obrigatório."),
    description: z.string().min(10, "Descrição é obrigatória."),
    image: z.string().url("URL da imagem inválida."),
    tags: z.string().min(1, "Adicione pelo menos uma tag."),
    liveUrl: z.string().url("URL do projeto inválida."),
    codeUrl: z.string().url("URL do código inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function EditarProjetoPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, control } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema)
    });

    useEffect(() => {
        const fetchProject = async () => {
            if (!db) return;
            const docRef = doc(db, 'projects', params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const transformedData = {
                    ...data,
                    tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
                };
                reset(transformedData as any);
            } else {
                toast({ variant: 'destructive', title: 'Erro', description: 'Projeto não encontrado.' });
                router.push('/admin/projetos');
            }
        };
        fetchProject();
    }, [params.id, reset, router, toast]);

    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
        try {
            await saveProject(params.id, data as any);
            toast({ title: "Sucesso!", description: "Projeto atualizado com sucesso." });
            router.push('/admin/projetos');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
            toast({ variant: "destructive", title: "Erro", description: `Erro ao salvar projeto: ${errorMessage}` });
            console.error("Error saving project:", error);
        }
    };
    
    if(!control._formValues.title) {
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
                <CardTitle>Editar Projeto</CardTitle>
                <CardDescription>Atualize os dados do projeto.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="title">Título do Projeto</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" {...register("description")} />
                        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="image">URL da Imagem de Capa</Label>
                        <Input id="image" type="url" {...register("image")} />
                        {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                        <Input id="tags" {...register("tags" as any)} />
                        {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="liveUrl">URL do Projeto (Live)</Label>
                            <Input id="liveUrl" type="url" {...register("liveUrl")} />
                            {errors.liveUrl && <p className="text-sm text-destructive">{errors.liveUrl.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="codeUrl">URL do Código (GitHub)</Label>
                            <Input id="codeUrl" type="url" {...register("codeUrl")} />
                             {errors.codeUrl && <p className="text-sm text-destructive">{errors.codeUrl.message}</p>}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                         <div className="space-y-2">
                            <Label htmlFor="aiHint">Dica para IA (Imagem)</Label>
                            <Input id="aiHint" {...register("aiHint")} placeholder="Ex: abstract, website" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                         <Button variant="outline" asChild>
                           <Link href="/admin/projetos">Cancelar</Link>
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
