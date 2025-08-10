
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Ação dedicada para revalidar o cache da página "Sobre".
// A escrita no banco de dados foi movida para o lado do cliente no componente do formulário.
export async function revalidateAboutPaths() {
    try {
        // Revalida apenas as páginas que exibem os dados da seção "Sobre".
        revalidatePath('/sobre');
        return {
            success: true,
            message: 'Cache da página "Sobre" atualizado com sucesso!',
        };
    } catch(error) {
         console.error('Error revalidating about paths:', error);
         return {
            success: false,
            message: 'Ocorreu um erro ao atualizar o cache da página.',
        };
    }
}


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
