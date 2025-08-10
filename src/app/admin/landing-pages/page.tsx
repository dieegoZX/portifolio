
'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { deleteItem } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface LandingPage {
    id: string;
    title: string;
    status: 'Publicado' | 'Rascunho';
    createdAt: Timestamp;
}

const formatDate = (timestamp: Timestamp | Date) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return new Intl.DateTimeFormat('pt-BR').format(date);
};

export default function LandingPagesAdminPage() {
    const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchLandingPages = async () => {
        if (!db) return;
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "landingPages"));
            const pagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LandingPage));
            setLandingPages(pagesData);
        } catch (error) {
            console.error("Error fetching landing pages: ", error);
            toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível carregar as landing pages.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLandingPages();
    }, []);

     const handleDelete = async (id: string) => {
        const result = await deleteItem('landingPages', id, '/admin/landing-pages');
        if (result.success) {
            toast({ title: 'Sucesso', description: result.message });
            fetchLandingPages();
        } else {
            toast({ variant: 'destructive', title: 'Erro', description: result.message });
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">Landing Pages</h2>
                        <CardDescription>Gerencie as landing pages da sua galeria.</CardDescription>
                    </div>
                    <Button asChild >
                        <Link href="/admin/landing-pages/novo">
                            <PlusCircle className="mr-2 h-4 w-4" /> Nova Landing Page
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                           <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                               <div className="space-y-1">
                                 <Skeleton className="h-4 w-48" />
                               </div>
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        ))}
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Criado em</TableHead>
                            <TableHead><span className="sr-only">Ações</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {landingPages.map((page) => (
                            <TableRow key={page.id}>
                                <TableCell className="font-medium">{page.title}</TableCell>
                                <TableCell>{page.status}</TableCell>
                                <TableCell>{formatDate(page.createdAt)}</TableCell>
                                <TableCell>
                                     <AlertDialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/landing-pages/editar/${page.id}`}>Editar</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem className="text-red-500" onSelect={(e) => e.preventDefault()}>Excluir</DropdownMenuItem>
                                                </AlertDialogTrigger>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Essa ação não pode ser desfeita. Isso excluirá permanentemente a landing page.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(page.id)}>Continuar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
