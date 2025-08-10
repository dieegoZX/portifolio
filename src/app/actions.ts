
'use server';

import { z } from 'zod';

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

const aboutInfoSchema = z.object({
    mainParagraph: z.string().min(10),
    paragraph1: z.string().min(10),
    paragraph2: z.string().min(10),
    paragraph3: z.string().min(10),
});

export async function updateAboutInfo(prevState: any, formData: FormData): Promise<State> {
    const validatedFields = aboutInfoSchema.safeParse({
        mainParagraph: formData.get('mainParagraph'),
        paragraph1: formData.get('paragraph1'),
        paragraph2: formData.get('paragraph2'),
        paragraph3: formData.get('paragraph3'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Todos os campos de texto devem ser preenchidos.",
        };
    }
    
    // In a real app, you would save this to a database.
    console.log('Updating about info:', validatedFields.data);
    const profilePicture = formData.get('profilePicture') as File;
    if(profilePicture && profilePicture.size > 0) {
        console.log('New profile picture uploaded:', profilePicture.name, `${profilePicture.size / 1024}KB`);
    }

    try {
        // Simulate saving data
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Informações da página "Sobre" atualizadas com sucesso!',
        };
    } catch (error) {
        console.error('Error updating about info:', error);
        return {
            success: false,
            message: 'Ocorreu um erro ao salvar as informações. Tente novamente.',
        };
    }
}
