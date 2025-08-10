
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { collection, addDoc, doc, setDoc, getDoc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { redirect } from 'next/navigation';

// Ação dedicada para revalidar o cache da página "Sobre".
export async function revalidateAboutPaths() {
    try {
        revalidatePath('/sobre');
        revalidatePath('/');
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
     if (!db) {
      throw new Error("A conexão com o banco de dados não foi estabelecida.");
    }
    const contactsCollection = collection(db, 'contacts');
    await addDoc(contactsCollection, {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        read: false,
    });

    revalidatePath('/admin/contatos');

    return {
      success: true,
      message: 'Sua mensagem foi recebida! Entraremos em contato em breve.',
    };
  } catch (error) {
    console.error('Error processing inquiry:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return {
      success: false,
      message: `Ocorreu um erro ao processar sua mensagem. ${errorMessage}`,
    };
  }
}

// Generic Delete Action
export async function deleteItem(collectionName: string, id: string, revalidateRoute: string) {
  try {
    if (!db) throw new Error("Database connection not established.");
    await deleteDoc(doc(db, collectionName, id));
    revalidatePath(revalidateRoute);
    revalidatePath('/'); // Revalidate home page as well
    return { success: true, message: 'Item excluído com sucesso.' };
  } catch (error) {
    console.error(`Error deleting item from ${collectionName}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return { success: false, message: `Erro ao excluir item: ${errorMessage}` };
  }
}

// Testimonial Actions
const testimonialSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório."),
    title: z.string().min(2, "Título é obrigatório."),
    testimonial: z.string().min(10, "Depoimento é obrigatório."),
    avatar: z.string().url("URL do avatar inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

export async function saveTestimonial(id: string | null, data: z.infer<typeof testimonialSchema>) {
    try {
        if (!db) throw new Error("Database connection not established.");

        const validatedData = testimonialSchema.parse(data);
        
        if (id) {
            const testimonialRef = doc(db, 'testimonials', id);
            await setDoc(testimonialRef, validatedData, { merge: true });
        } else {
            const testimonialsCollection = collection(db, 'testimonials');
            await addDoc(testimonialsCollection, {
                ...validatedData,
                createdAt: serverTimestamp(),
            });
        }
        revalidatePath('/admin/depoimentos');
        revalidatePath('/');
    } catch (error) {
        console.error("Error saving testimonial:", error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: `Erro ao salvar depoimento: ${errorMessage}` };
    }

    redirect('/admin/depoimentos');
}

// Project Actions
const projectSchema = z.object({
    title: z.string().min(2, "Título é obrigatório."),
    description: z.string().min(10, "Descrição é obrigatória."),
    image: z.string().url("URL da imagem inválida."),
    tags: z.string().min(1, "Adicione pelo menos uma tag.").transform(val => val.split(',').map(tag => tag.trim())),
    liveUrl: z.string().url("URL do projeto inválida."),
    codeUrl: z.string().url("URL do código inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

export async function saveProject(id: string | null, data: z.infer<typeof projectSchema>) {
     try {
        if (!db) throw new Error("Database connection not established.");

        const validatedData = projectSchema.parse(data);

        if (id) {
            const projectRef = doc(db, 'projects', id);
            await setDoc(projectRef, validatedData, { merge: true });
        } else {
            const projectsCollection = collection(db, 'projects');
            await addDoc(projectsCollection, {
                ...validatedData,
                createdAt: serverTimestamp(),
            });
        }
        revalidatePath('/admin/projetos');
        revalidatePath('/');
    } catch (error) {
        console.error("Error saving project:", error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: `Erro ao salvar projeto: ${errorMessage}` };
    }
    redirect('/admin/projetos');
}

// Landing Page Actions
const landingPageSchema = z.object({
    title: z.string().min(2, "Título é obrigatório."),
    description: z.string().min(10, "Descrição é obrigatória."),
    beforeImage: z.string().url("URL da imagem 'Antes' inválida."),
    afterImage: z.string().url("URL da imagem 'Depois' inválida."),
    result: z.string().min(2, "Resultado é obrigatório."),
    aiHintBefore: z.string().optional(),
    aiHintAfter: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

export async function saveLandingPage(id: string | null, data: z.infer<typeof landingPageSchema>) {
    try {
        if (!db) throw new Error("Database connection not established.");

        const validatedData = landingPageSchema.parse(data);

        if (id) {
            const landingPageRef = doc(db, 'landingPages', id);
            await setDoc(landingPageRef, validatedData, { merge: true });
        } else {
            const landingPagesCollection = collection(db, 'landingPages');
            await addDoc(landingPagesCollection, {
                ...validatedData,
                createdAt: serverTimestamp(),
            });
        }
        revalidatePath('/admin/landing-pages');
        revalidatePath('/');
    } catch (error) {
        console.error("Error saving landing page:", error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: `Erro ao salvar landing page: ${errorMessage}` };
    }
    redirect('/admin/landing-pages');
}
