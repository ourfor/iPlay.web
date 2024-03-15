#!/usr/bin/env deno run --allow-all

import { MovieDetail, Movie, Pageable, imageUrl, Credits } from "./type.ts";
import { Actor, Movie as NFOMovie } from "./nfo.ts"
import helper from "./helper.ts";
import { parse, stringify } from "https://deno.land/x/xml/mod.ts"
import { modelize } from "./nfo.ts";
import { tmdbImageUrl } from "./type.ts";


async function getTopMovie(page = 1) {
    const uri = `/3/movie/top_rated?language=zh-CN&page=${page}`;
    return await helper.request<Pageable<MovieDetail>>(uri)
}

async function getMovie(id: number) {
    const uri = `/3/movie/${id}?language=zh-CN`;
    return await helper.request<Movie>(uri)
}

async function getMovieCredits(id: number) {
    const uri = `/3/movie/${id}/credits?language=zh-CN`;
    return await helper.request<Credits>(uri)
}

function buildNfo(movie: Movie, credits: Credits) {
    const detail: NFOMovie  = {
        title: movie.title,
        originaltitle: movie.original_title,
        sorttitle: movie.title,
        premiered: movie.release_date,
        uiniqueid: [
            {
                $default: true,
                $type: "tmdb",
                $: movie.id.toString()
            },
            {
                $type: "imdb",
                $: movie.imdb_id
            }
        ],
        genre: movie.genres.map(item => item.name),
        plot: movie.overview,
        tagline: movie.tagline,
        runtime: movie.runtime.toString(),
        mpaa: movie.adult ? "R" : "PG-13",
        thumb: [
            {
                $aspect: "poster",
                $: tmdbImageUrl(movie.poster_path)
            }
        ],
        fanart: {
            thumb: [
                {
                    $preview: tmdbImageUrl(movie.backdrop_path), 
                    $: tmdbImageUrl(movie.backdrop_path)
                }
            ]
        },
        ratings: {
            rating: [
                {
                    $name: "themoviedb",
                    $max: 10,
                    value: movie.vote_average,
                    votes: movie.vote_count
                }
            ]
        }
    }
    const actors = credits.cast.map(item => {
        const actor: Actor = {
            name: item.name,
            role: item.character,
            thumb: item.profile_path ? tmdbImageUrl(item.profile_path) : null,
            order: item.order.toString()
        }
        return actor
    })
    detail.actor = actors
    const obj = modelize({
        movie: detail
    })
    const nfo = stringify(obj)
    return nfo;
}

async function makeMovieList() {
    for (let page = 1; page < 100; page++) {
        const data = await getTopMovie()
        data?.results.forEach(async (movie) => {
            const detail = await getMovie(movie.id)
            const credits = await getMovieCredits(movie.id)
            const nfo = buildNfo(detail!, credits!)
            await helper.download(imageUrl(movie.poster_path), `build/movie/${movie.title}/poster.jpg`)
            await helper.download(imageUrl(movie.backdrop_path), `build/movie/${movie.title}/fanart.jpg`)
            await helper.touch(`build/movie/${movie.title}/${movie.title}.strm`, "https://drive.ourfor.top/iplay/demo.mp4")
            await helper.touch(`build/movie/${movie.title}/${movie.title}.nfo`, nfo)
        })
    }
}

makeMovieList()
