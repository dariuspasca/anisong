export interface MalResponse {
	data: MalAnime[];
	paging: {
		next: string;
	};
}

export interface MalAnime {
	node: {
		id: number;
		title: string;
		main_picture: {
			medium: string;
			large: string;
		};
	};
}
