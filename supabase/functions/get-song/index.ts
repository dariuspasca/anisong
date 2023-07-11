import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log(`Function "get-song" up and running!`);
const MAL_API_KEY = Deno.env.get("MAL_API_KEY") ?? "";

interface MalAnime {
	opening_themes?: Array<MalAnimeSong>;
	ending_themes?: Array<MalAnimeSong>;
}

interface MalAnimeSong {
	id: number;
	title: string;
}

const malFetchConfig = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		"X-MAL-CLIENT-ID": MAL_API_KEY,
	},
};

serve(async (req) => {
	// This is needed if you're planning to invoke your function from a browser.
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		const { malId } = await req.json();
		const url = `https://api.myanimelist.net/v2/anime/${malId}?fields=opening_themes%2Cending_themes`;

		const data: MalAnime = await fetch(url, malFetchConfig).then((res) => res.json());
		console.log("🚀 ~ file: index.ts:36 ~ serve ~ data:", data);

		return new Response(JSON.stringify(data), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 400,
		});
	}
});
