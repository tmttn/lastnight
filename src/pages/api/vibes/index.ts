import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();

    if (!title) {
        return new Response("Missing required fields", {
            status: 400,
        });
    }

    try {
        const db = getFirestore(app);
        const vibesRef = db.collection("vibes");
        await vibesRef.add({
            title,
        });
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/dashboard");
};