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