import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request, locals }) {
    const data = await request.json();

    console.log("💾 Reçu:", data);
    console.log("👤 User ID:", locals.user?.id || "❌ Pas d'utilisateur");

    // Vérifie que l'utilisateur est connecté
    if (!locals.user) {
        return new Response(
            JSON.stringify({ success: false, error: "Utilisateur non authentifié" }),
            { status: 401 }
        );
    }

    try {
        const record = await pb.collection(Collections.Lunette).create({
            ...data,
            user: locals.user.id, // ← Utilise l'ID de l'utilisateur connecté
        });

        console.log("✅ SVG enregistré avec ID:", record.id);
        console.log("✅ Lié à l'utilisateur:", locals.user.id);

        return new Response(
            JSON.stringify({
                success: true,
                id: record.id,
                message: "Ajouté à votre galerie"
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("❌ Erreur:", error.message);
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
