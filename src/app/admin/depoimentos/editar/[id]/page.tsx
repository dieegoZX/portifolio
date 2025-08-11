
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
import { saveTestimonial, TestimonialData } from '@/lib/firebase-services';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const testimonialSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório."),
    title: z.string().min(2, "Título é obrigatório."),
    testimonial: z.string().min(10, "Depoimento é obrigatório."),
    avatar: z.string().url("URL do avatar inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function EditarDepoimentoPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue, reset } = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialSchema)
    });

    useEffect(() => {
        const fetchTestimonial = async () => {
            if (!db) return;
            const docRef = doc(db, 'testimonials', params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                reset(docSnap.data() as TestimonialFormValues);
            } else {
                toast({ variant: 'destructive', title: 'Erro', description: 'Depoimento não encontrado.' });
                router.push('/admin/depoimentos');
            }
        };
        fetchTestimonial();
    }, [params.id, reset, router, toast]);

    const onSubmit: SubmitHandler<TestimonialFormValues> = async (data) => {
        try {
            await saveTestimonial(params.id, data as TestimonialData);
            toast({
                title: "Sucesso!",
                description: "Depoimento atualizado com sucesso.",
            });
            router.push('/admin/depoimentos');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
            toast({
                variant: "destructive",
                title: "Erro ao salvar",
                description: errorMessage,
            });
            console.error(error);
        }
    };
    
    if (!control._formValues.name) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-8 w-48" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-64" /></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-24 w-full" /></div>
                    <div className="flex justify-end gap-2"><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" /></div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Depoimento</CardTitle>
                <CardDescription>Atualize os dados do depoimento.</CardDescription>
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
                            Salvar Alterações
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
