export interface Pageable<T> {
    page: number,
    results: T[],
    total_pages: number,
    total_results: number
}

export function imageUrl(id: string, quality: string = 'original') {
    return `https://proxyall.endemy.me/t/p/${quality}${id}?host=image.tmdb.org`
}

export interface MovieDetail {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface Person {
    //  {
    //     "adult": false,
    //     "gender": 2,
    //     "id": 225730,
    //     "known_for_department": "Acting",
    //     "name": "Ryunosuke Kamiki",
    //     "original_name": "Ryunosuke Kamiki",
    //     "popularity": 22.771,
    //     "profile_path": "/ut7ewXjdgUmgkhJ1EtbOo9tbc7s.jpg",
    //     "cast_id": 28,
    //     "character": "Taki Tachibana (voice)",
    //     "credit_id": "58a0634e9251412603006efc",
    //     "order": 0
    //   }
    // <actor>
    // <name>Ryunosuke Kamiki</name>
    // <role>Taki Tachibana (voice)</role>
    // <order>0</order>
    // <thumb>https://image.tmdb.org/t/p/original/ut7ewXjdgUmgkhJ1EtbOo9tbc7s.jpg</thumb>
    // </actor>
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

export interface Credits {
    id: number,
    cast: Person[],
    crew: Person[]
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | object; // Replace object with the actual type if known
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}