
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
