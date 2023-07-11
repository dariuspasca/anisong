import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log(`Function "search-anime" up and running!`);
const MAL_API_KEY = Deno.env.get("MAL_API_KEY") ?? "";
const SEARCH_LIMIT = 5;

interface MalResponse {
	data: MalAnime[];
	paging: {
		next: string;
	};
}

interface MalAnime {
	node: {
		id: number;
		title: string;
		main_picture: {
			medium: string;
			large: string;
		};
	};
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
		const { text } = await req.json();
		const url = `https://api.myanimelist.net/v2/anime?limit=${SEARCH_LIMIT}&q=${text}`;

		const res: MalResponse = await fetch(url, malFetchConfig).then((res) => res.json());

		return new Response(JSON.stringify(res.data), {
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
