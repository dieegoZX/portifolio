
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
    {
        name: 'Ana Silva',
        title: 'CEO, Tech Inova',
        avatar: 'https://placehold.co/100x100.png',
        aiHint: 'woman portrait',
        status: 'Publicado',
    },
    {
        name: 'Carlos Pereira',
        title: 'Gerente de Marketing, Vende+',
        avatar: 'https://placehold.co/100x100.png',
        aiHint: 'man portrait',
        status: 'Publicado',
    },
    {
        name: 'Juliana Costa',
        title: 'Empreendedora',
        avatar: 'https://placehold.co/100x100.png',
        aiHint: 'business woman',
        status: 'Rascunho',
    }
]

export default function DepoimentosPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Depoimentos</CardTitle>
                        <CardDescription>Gerencie os depoimentos dos seus clientes.</CardDescription>
                    </div>
                    <Button asChild disabled>
                        <Link href="#">
                            <PlusCircle className="mr-2 h-4 w-4" /> Novo Depoimento
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
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
                            <TableRow key={item.name}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.aiHint}/>
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
                                            <DropdownMenuItem disabled>
                                                <Link href="#">Editar</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500" disabled>Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
