
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';


const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Email inválido.'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres.'),
});

type State = {
  success: boolean;
  message: string;
};

export async function submitContactForm(prevState: any, formData: FormData): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const { name, email, message } = validatedFields.data;

  try {
    console.log(`New inquiry from ${name} (${email})`);

    return {
      success: true,
      message: 'Sua mensagem foi recebida! Entraremos em contato em breve.',
    };
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.',
    };
  }
}

// This action is now only responsible for revalidating paths.
// The actual database write operation is handled on the client-side.
export async function revalidateAboutPaths() {
    try {
        revalidatePath('/');
        revalidatePath('/sobre');
        revalidatePath('/admin/sobre');
        return {
            success: true,
            message: 'Informações da página "Sobre" atualizadas com sucesso!',
        };
    } catch(error) {
         console.error('Error revalidating about paths:', error);
         return {
            success: false,
            message: 'Ocorreu um erro ao atualizar o cache da página.',
        };
    }
}
