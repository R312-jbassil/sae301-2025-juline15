import PocketBase from "pocketbase";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request, cookies }) => {
    const { email, password } = await request.json();

    console.log("📧 Email:", email);
    console.log("🔑 Password:", password ? "✓" : "✗");

    try {
        const pb = new PocketBase('http://127.0.0.1:8090');

        console.log("🔗 PB URL:", pb.baseUrl);

        // Authentifie l'utilisateur
        const authData = await pb.collection(Collections.Users).authWithPassword(email, password);

        console.log("✅ Connexion réussie:", authData.record.email);
        console.log("🎯 AuthStore isValid:", pb.authStore.isValid);
        console.log("🎯 AuthStore token:", pb.authStore.token);

        // Récupère le token correctement
        const token = pb.authStore.token;

        if (!token) {
            throw new Error("Pas de token généré après authentification");
        }

        console.log("📝 Token reçu:", token.substring(0, 20) + "...");

        // Construis le cookie au format PocketBase
        const cookieValue = `${pb.baseUrl.replace(/\/$/, '')}|${token}`;

        console.log("🍪 Cookie généré");

        // Sauvegarde le cookie
        cookies.set("pb_auth", token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: false, // false en dev, true en prod
            maxAge: 365 * 24 * 60 * 60,
        });

        console.log("✅ Cookie sauvegardé");

        return new Response(
            JSON.stringify({
                success: true,
                user: authData.record
            }),
            { status: 200 }
        );

    } catch (err) {
        console.error("❌ Erreur complète:", err);

        return new Response(
            JSON.stringify({
                error: "Identifiants invalides",
                message: err.message
            }),
            { status: 401 }
        );
    }
};
