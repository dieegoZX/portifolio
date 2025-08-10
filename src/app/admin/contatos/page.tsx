
'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Mail, MailOpen } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Timestamp;
    read: boolean;
}

const formatDate = (timestamp: Timestamp | Date) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
};

export default function ContatosPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            if (!db) return;
            setLoading(true);
            try {
                const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const contactsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
                setContacts(contactsData);
            } catch (error) {
                console.error("Error fetching contacts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);
    

    return (
        <Card>
            <CardHeader>
                 <div>
                    <h2 className="text-2xl font-semibold leading-none tracking-tight">Caixa de Entrada</h2>
                    <CardDescription>Visualize as mensagens recebidas pelo formulário de contato.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                 {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                               <div className="flex items-center gap-4">
                                  <Skeleton className="h-6 w-6" />
                                  <div className="space-y-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-40" />
                                  </div>
                               </div>
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        ))}
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]"><span className="sr-only">Status</span></TableHead>
                            <TableHead>Remetente</TableHead>
                            <TableHead>Mensagem</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead><span className="sr-only">Ações</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id} className={!contact.read ? 'font-bold' : ''}>
                                <TableCell>
                                    {contact.read ? <MailOpen className="h-5 w-5 text-muted-foreground" /> : <Mail className="h-5 w-5 text-primary"/>}
                                </TableCell>
                                <TableCell>
                                    <div>{contact.name}</div>
                                    <div className="text-xs text-muted-foreground">{contact.email}</div>
                                </TableCell>
                                <TableCell className="max-w-sm truncate text-muted-foreground">{contact.message}</TableCell>
                                <TableCell>{formatDate(contact.createdAt)}</TableCell>
                                <TableCell>
                                   <Dialog>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Abrir menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                             <DialogTrigger asChild>
                                                <DropdownMenuItem>
                                                    Visualizar
                                                </DropdownMenuItem>
                                             </DialogTrigger>
                                            <DropdownMenuItem>Marcar como lida</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500">Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>De: {contact.name} <span className="font-normal text-muted-foreground text-sm">({contact.email})</span></DialogTitle>
                                          <DialogDescription>
                                            Enviado em: {formatDate(contact.createdAt)}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <p className="text-sm text-foreground">{contact.message}</p>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
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
