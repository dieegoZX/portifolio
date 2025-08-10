
'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from '@/components/ui/skeleton';

interface Testimonial {
    id: string;
    name: string;
    title: string;
    avatar: string;
    testimonial: string;
    status: 'Publicado' | 'Rascunho';
}


export default function DepoimentosPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            if (!db) return;
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "testimonials"));
                const testimonialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
                setTestimonials(testimonialsData);
            } catch (error) {
                console.error("Error fetching testimonials: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">Depoimentos</h2>
                        <CardDescription>Gerencie os depoimentos dos seus clientes.</CardDescription>
                    </div>
                    <Button asChild >
                        <Link href="#">
                            <PlusCircle className="mr-2 h-4 w-4" /> Novo Depoimento
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                 {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                               <div className="flex items-center gap-4">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <div className="space-y-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                  </div>
                               </div>
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        ))}
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Ações</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={item.avatar} alt={item.name} data-ai-hint="person"/>
                                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Abrir menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Link href="#">Editar</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500" >Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>
    )
}
