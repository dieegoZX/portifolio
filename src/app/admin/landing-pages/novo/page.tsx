
'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveLandingPage, LandingPageData } from '@/lib/firebase-services';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

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

export default function NovaLandingPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<LandingPageFormValues>({
        resolver: zodResolver(landingPageSchema),
        defaultValues: { status: 'Rascunho' }
    });

    const onSubmit: SubmitHandler<LandingPageFormValues> = async (data) => {
        try {
            await saveLandingPage(null, data as LandingPageData);
            toast({ title: "Sucesso!", description: "Landing Page criada com sucesso." });
            router.push('/admin/landing-pages');
        } catch (error) {
             const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
             toast({ variant: "destructive", title: "Erro", description: errorMessage });
             console.error(error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nova Landing Page</CardTitle>
                <CardDescription>Preencha os dados para adicionar uma nova landing page.</CardDescription>
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
                            <Select onValueChange={(value) => setValue('status', value as 'Publicado' | 'Rascunho')} defaultValue="Rascunho">
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
                            Salvar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
