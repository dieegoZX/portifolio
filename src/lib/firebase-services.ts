
import { collection, addDoc, doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { z } from 'zod';

// ------------- Testimonial Schemas and Functions -------------
const testimonialSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório."),
    title: z.string().min(2, "Título é obrigatório."),
    testimonial: z.string().min(10, "Depoimento é obrigatório."),
    avatar: z.string().url("URL do avatar inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

export type TestimonialData = z.infer<typeof testimonialSchema>;

export async function saveTestimonial(id: string | null, data: TestimonialData) {
    if (!db) throw new Error("Database connection not established.");
    const validatedData = testimonialSchema.parse(data);
    
    let docRef;
    let dataToSave;

    if (id) {
        docRef = doc(db, 'testimonials', id);
        dataToSave = validatedData;
    } else {
        const newDocRef = doc(collection(db, 'testimonials'));
        docRef = newDocRef;
        dataToSave = {
            ...validatedData,
            createdAt: serverTimestamp(),
        };
    }
    await setDoc(docRef, dataToSave, { merge: true });
}


// ------------- Project Schemas and Functions -------------
const projectSchema = z.object({
    title: z.string().min(2, "Título é obrigatório."),
    description: z.string().min(10, "Descrição é obrigatória."),
    image: z.string().url("URL da imagem inválida."),
    tags: z.union([
        z.string(),
        z.array(z.string())
    ]).transform(val => {
        if (Array.isArray(val)) return val;
        return val.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }),
    liveUrl: z.string().url("URL do projeto inválida."),
    codeUrl: z.string().url("URL do código inválida."),
    aiHint: z.string().optional(),
    status: z.enum(['Publicado', 'Rascunho']),
});

export type ProjectData = z.infer<typeof projectSchema>;

export async function saveProject(id: string | null, data: ProjectData) {
    if (!db) throw new Error("Database connection not established.");
    const validatedData = projectSchema.parse(data);

    let docRef;
    let dataToSave;

    if (id) {
        docRef = doc(db, 'projects', id);
        dataToSave = validatedData;
    } else {
        const newDocRef = doc(collection(db, 'projects'));
        docRef = newDocRef;
        dataToSave = {
            ...validatedData,
            createdAt: serverTimestamp(),
        };
    }
    await setDoc(docRef, dataToSave, { merge: true });
}


// ------------- Landing Page Schemas and Functions -------------
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

export type LandingPageData = z.infer<typeof landingPageSchema>;

export async function saveLandingPage(id: string | null, data: LandingPageData) {
    if (!db) throw new Error("Database connection not established.");
    const validatedData = landingPageSchema.parse(data);

    let docRef;
    let dataToSave;

    if (id) {
        docRef = doc(db, 'landingPages', id);
        dataToSave = validatedData;
    } else {
        const newDocRef = doc(collection(db, 'landingPages'));
        docRef = newDocRef;
        dataToSave = {
            ...validatedData,
            createdAt: serverTimestamp(),
        };
    }
    await setDoc(docRef, dataToSave, { merge: true });
}
