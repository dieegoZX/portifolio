'use server';

import { z } from 'zod';
import { routeUrgentQueries } from '@/ai/flows/route-urgent-queries';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Email inválido.'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres.'),
});

type State = {
  success: boolean;
  message: string;
  priorityScore?: number;
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
    const { priorityScore } = await routeUrgentQueries({ inquiry: message });

    // In a real application, you would now use this priorityScore to handle the inquiry.
    // For example, send an email with a priority flag, save to a CRM, etc.
    console.log(`New inquiry from ${name} (${email}) with priority: ${priorityScore}`);

    return {
      success: true,
      message: 'Sua mensagem foi recebida! Entraremos em contato em breve.',
      priorityScore,
    };
  } catch (error) {
    console.error('Error processing inquiry with AI:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.',
    };
  }
}
