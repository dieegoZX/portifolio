
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
import { saveTestimonial, TestimonialData } from '@/lib/firebase-services';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const testimonialSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório."),
    title: z.string().min(2, "Título é obrigatório."),
    testimonial: z.string().min(10, "Depoimento é obrigatório."),
    avatar: z.string().url("URL do avatar inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function NovoDepoimentoPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: {
            status: 'Rascunho'
        }
    });

    const onSubmit: SubmitHandler<TestimonialFormValues> = async (data) => {
        try {
            await saveTestimonial(null, data as TestimonialData);
            toast({
                title: "Sucesso!",
                description: "Depoimento criado com sucesso.",
            });
            router.push('/admin/depoimentos');
        } catch (error) {
             const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
            toast({
                variant: "destructive",
                title: "Erro ao criar",
                description: errorMessage,
            });
            console.error(error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Novo Depoimento</CardTitle>
                <CardDescription>Preencha os dados para adicionar um novo depoimento.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome do Cliente</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Título / Cargo</Label>
                            <Input id="title" {...register("title")} />
                             {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="avatar">URL do Avatar</Label>
                        <Input id="avatar" type="url" {...register("avatar")} placeholder="https://exemplo.com/imagem.png"/>
                        {errors.avatar && <p className="text-sm text-destructive">{errors.avatar.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="testimonial">Depoimento</Label>
                        <Textarea id="testimonial" {...register("testimonial")} rows={5} />
                        {errors.testimonial && <p className="text-sm text-destructive">{errors.testimonial.message}</p>}
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                         <div className="space-y-2">
                            <Label htmlFor="aiHint">Dica para IA (Avatar)</Label>
                            <Input id="aiHint" {...register("aiHint")} placeholder="Ex: person, woman"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild>
                           <Link href="/admin/depoimentos">Cancelar</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
