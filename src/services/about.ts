
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ABOUT_DOC_ID = 'main';
const ABOUT_COLLECTION_ID = 'about';

export interface AboutData {
    mainParagraph: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    profilePictureUrl: string;
}

const defaultAboutData: AboutData = {
    mainParagraph: "Olá! Sou Diego Ruan, um apaixonado por tecnologia, especialista em desenvolvimento front-end e otimização de campanhas de tráfego pago.",
    paragraph1: "Minha jornada no mundo da programação começou com o desejo de criar interfaces que não fossem apenas bonitas, mas também intuitivas e de alta performance. Acredito que a experiência do usuário é a chave para o sucesso de qualquer produto digital. Por isso, me dedico a construir aplicações rápidas, responsivas e acessíveis.",
    paragraph2: "Além do desenvolvimento, sou fascinado pelo marketing digital, o que me levou a me especializar em gestão de tráfego. Utilizo uma abordagem analítica para criar e otimizar campanhas que não apenas atraem o público certo, mas também geram resultados concretos e mensuráveis para os meus clientes.",
    paragraph3: "Quando não estou programando ou analisando métricas, gosto de explorar novas tecnologias, contribuir para projetos de código aberto e tomar um bom café.",
    profilePictureUrl: "https://placehold.co/600x800.png",
};

export async function getAboutData(): Promise<AboutData> {
    const docRef = doc(db, ABOUT_COLLECTION_ID, ABOUT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as AboutData;
    } else {
        await setDoc(docRef, defaultAboutData);
        return defaultAboutData;
    }
}

export async function updateAboutData(data: Partial<AboutData>): Promise<void> {
    const docRef = doc(db, ABOUT_COLLECTION_ID, ABOUT_DOC_ID);
    await setDoc(docRef, data, { merge: true });
}
