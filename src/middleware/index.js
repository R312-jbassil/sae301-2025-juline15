export const onRequest = async (context, next) => {
    console.log("🔍 [MIDDLEWARE] Appelé pour:", context.url.pathname);

    const token = context.cookies.get("pb_auth")?.value;
    console.log("🔍 [MIDDLEWARE] Token:", token ? "✓" : "✗");

    if (token) {
        try {
            const { default: PocketBase } = await import("pocketbase");
            const pb = new PocketBase('http://127.0.0.1:8090');
            pb.authStore.save(token);

            console.log("✅ [MIDDLEWARE] isValid:", pb.authStore.isValid);

            // Récupère l'utilisateur depuis PocketBase
            if (pb.authStore.isValid) {
                try {
                    const user = await pb.collection('users').authRefresh();
                    console.log("✅ [MIDDLEWARE] User récupéré:", user.record.email);
                    context.locals.user = user.record;
                } catch (refreshErr) {
                    console.error("❌ [MIDDLEWARE] Erreur refresh:", refreshErr.message);
                    pb.authStore.clear();
                }
            }
        } catch (err) {
            console.error("❌ [MIDDLEWARE] Error:", err.message);
        }
    }

    console.log("🔍 [MIDDLEWARE] context.locals.user:", context.locals.user ? "✓ " + context.locals.user.email : "✗");

    const publicRoutes = ['/login', '/signup', '/'];
    if (!context.locals.user && !publicRoutes.includes(context.url.pathname)) {
        console.log("🔒 [MIDDLEWARE] Redirection -> /login");
        return Response.redirect(new URL('/login', context.url), 303);
    }

    return next();
};
