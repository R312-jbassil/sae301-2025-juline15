import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request }) => {
    const { email, password, passwordConfirm } = await request.json();

    try {
        const newUser = await pb.collection(Collections.Users).create({
            email,
            password,
            passwordConfirm,
        });

        const authData = await pb.collection(Collections.Users).authWithPassword(email, password);

        const pbCookie = pb.authStore.exportToCookie();

        const response = new Response(
            JSON.stringify({
                success: true,
                user: authData.record
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );

        // Ajoute le cookie au format PocketBase
        response.headers.append("Set-Cookie", pbCookie);

        return response;

    } catch (err) {
        console.error("❌ Erreur d'inscription :", err);
        return new Response(
            JSON.stringify({
                error: err?.message || "Erreur lors de la création du compte",
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
};
