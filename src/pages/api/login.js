import PocketBase from "pocketbase";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request }) => {
    const { email, password } = await request.json();

    console.log("📧 Email:", email);
    console.log("🔑 Password:", password ? "✓" : "✗");

    try {
        const pb = new PocketBase('http://127.0.0.1:8090');

        // Authentifie l'utilisateur
        const authData = await pb.collection(Collections.Users).authWithPassword(email, password);

        console.log("✅ Connexion réussie:", authData.record.email);

        // Exporte le cookie au format PocketBase complet
        const pbCookie = pb.authStore.exportToCookie();
        console.log("🍪 PocketBase cookie:", pbCookie.substring(0, 50) + "...");

        // Crée la réponse
        const response = new Response(
            JSON.stringify({
                success: true,
                user: authData.record
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

        // Ajoute le cookie au format exact de PocketBase
        response.headers.append("Set-Cookie", pbCookie);

        console.log("✅ Cookie PocketBase ajouté");

        return response;

    } catch (err) {
        console.error("❌ Erreur:", err);

        return new Response(
            JSON.stringify({
                error: "Identifiants invalides",
                message: err.message
            }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }
};
