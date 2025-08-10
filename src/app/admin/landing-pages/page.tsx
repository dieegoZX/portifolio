
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const landingPages = [
    {
        title: 'LP para Lançamento de Curso',
        status: 'Publicado',
        createdAt: '2023-08-12',
    },
    {
        title: 'Página de Vendas de SaaS',
        status: 'Publicado',
        createdAt: '2023-09-20',
    }
]

export default function LandingPagesAdminPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">Landing Pages</h2>
                        <CardDescription>Gerencie as landing pages da sua galeria.</CardDescription>
                    </div>
                    <Button asChild disabled>
                        <Link href="#">
                            <PlusCircle className="mr-2 h-4 w-4" /> Nova Landing Page
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
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
                            <TableRow key={page.title}>
                                <TableCell className="font-medium">{page.title}</TableCell>
                                <TableCell>{page.status}</TableCell>
                                <TableCell>{page.createdAt}</TableCell>
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
