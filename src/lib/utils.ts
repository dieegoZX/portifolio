import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para converter links do Imgur
export const convertImgurLink = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    try {
        const urlObj = new URL(url);
        // Converte https://imgur.com/XXXXX para https://i.imgur.com/XXXXX.png
        if (urlObj.hostname === 'imgur.com' && !urlObj.pathname.startsWith('/a/')) {
            return `https://i.imgur.com${urlObj.pathname}.png`;
        }
    } catch (e) {
        // Se a URL for inválida ou não for do Imgur, retorna o original
        return url;
    }
    return url;
};