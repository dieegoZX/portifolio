
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const projects = [
    {
        title: 'E-commerce Moderno',
        status: 'Publicado',
        createdAt: '2023-10-27',
    },
    {
        title: 'Dashboard Analítico',
        status: 'Rascunho',
        createdAt: '2023-11-15',
    },
    {
        title: 'Sistema de Reservas',
        status: 'Publicado',
        createdAt: '2024-01-05',
    }
]

export default function ProjetosPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">Projetos</h2>
                        <CardDescription>Gerencie seus projetos do portfólio.</CardDescription>
                    </div>
                    <Button asChild disabled>
                        <Link href="#">
                            <PlusCircle className="mr-2 h-4 w-4" /> Novo Projeto
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
                        {projects.map((project) => (
                            <TableRow key={project.title}>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>{project.status}</TableCell>
                                <TableCell>{project.createdAt}</TableCell>
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
