import { auth } from "@/lib/auth"; // import o arquivo que criamos
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
