export const onRequest = async (context, next) => {
    console.log("🔍 [MIDDLEWARE] Appelé pour:", context.url.pathname);

    const cookieValue = context.cookies.get("pb_auth")?.value;
    console.log("🔍 [MIDDLEWARE] Cookie pb_auth:", cookieValue ? "✓" : "✗");

    // ✅ Charger l'utilisateur pour TOUTES les routes (y compris les API)
    if (cookieValue) {
        try {
            const { default: PocketBase } = await import("pocketbase");
            const pb = new PocketBase('http://127.0.0.1:8090');

            pb.authStore.loadFromCookie(`pb_auth=${cookieValue}`);

            console.log("✅ [MIDDLEWARE] AuthStore isValid:", pb.authStore.isValid);
            console.log("✅ [MIDDLEWARE] User:", pb.authStore.record?.email);

            if (pb.authStore.isValid && pb.authStore.record) {
                context.locals.user = pb.authStore.record;
            }
        } catch (err) {
            console.error("❌ [MIDDLEWARE] Erreur:", err.message);
        }
    }

    console.log("🔍 [MIDDLEWARE] context.locals.user:", context.locals.user ? "✓ " + context.locals.user.email : "✗");

    // ✅ Les routes API passent toujours (même sans user)
    if (context.url.pathname.startsWith("/api2/")) {
        console.log("🔓 [MIDDLEWARE] Route API");
        return next();
    }

    // ✅ Vérification d'authentification SEULEMENT pour les pages
    const publicRoutes = ['/login', '/signup', '/'];
    if (!context.locals.user && !publicRoutes.includes(context.url.pathname)) {
        console.log("🔒 [MIDDLEWARE] Redirection -> /login");
        return context.redirect("/login", 303);
    }

    return next();
};
