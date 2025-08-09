'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Enviar Mensagem
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useFormState(submitContactForm, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success === true) {
      toast({
        title: "Sucesso!",
        description: `${state.message} (Prioridade: ${state.priorityScore}/10)`,
      });
      formRef.current?.reset();
    } else if (state?.success === false && state.message) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Vamos trabalhar juntos?</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Preencha o formulário abaixo e retornarei o mais breve possível.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
              <CardDescription>Envie sua proposta ou dúvida.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" name="name" placeholder="Seu nome" required />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" name="message" placeholder="Sua mensagem..." required />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
