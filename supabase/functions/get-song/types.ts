export interface MalAnimeTrack {
	id: number;
	text: string;
}

export interface TrackResponse {
	id: number;
	title: string;
	author?: string;
	anime_mal_id: number;
}
