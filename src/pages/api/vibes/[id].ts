import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const vibesRef = db.collection("vibes");

export const POST: APIRoute = async ({ params, redirect, request }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();

    if (!title) {
        return new Response("Missing required fields", {
            status: 400,
        });
    }

    if (!params.id) {
        return new Response("Cannot find vibe", {
            status: 404,
        });
    }

    try {
        await vibesRef.doc(params.id).update({
            title,
        });
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/dashboard");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
    if (!params.id) {
        return new Response("Cannot find vibe", {
            status: 404,
        });
    }

    try {
        await vibesRef.doc(params.id).delete();
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/dashboard");
};