#!/usr/bin/env deno run --allow-all

import { MovieDetail, Movie, Pageable, imageUrl, Credits } from "./type.ts";
import { Actor, Movie as NFOMovie } from "./nfo.ts"
import helper from "./helper.ts";
import { parse, stringify } from "https://deno.land/x/xml/mod.ts"
import { xmlModelize } from "./nfo.ts";

async function request<T>(uri: string) {
    const url = `https://proxyall.endemy.me${uri}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        "X-HOST": "api.themoviedb.org"
      }
    };
    
    try {
        const response = await fetch(url, options)
        const data = await response.json() as T
        return data
    } catch (err) {
        console.error(err)
    }
    return null 
}

async function getTopMovie(page = 1) {
    const uri = `/3/movie/top_rated?language=zh-CN&page=${page}`;
    return await request<Pageable<MovieDetail>>(uri)
}

async function getMovie(id: number) {
    const uri = `/3/movie/${id}?language=zh-CN`;
    return await request<Movie>(uri)
}

async function getMovieCredits(id: number) {
    const uri = `/3/movie/${id}/credits?language=zh-CN`;
    return await request<Credits>(uri)
}

function buildNfo(movie: Movie, credits: Credits) {
    const detail: NFOMovie  = {
        title: movie.title,
        originaltitle: movie.original_title,
        premiered: movie.release_date,
        uiniqueid: [
            xmlModelize({
                $default: true,
                $type: "tmdb",
                $: movie.id.toString()
            }),
            xmlModelize({
                $type: "imdb",
                $: movie.imdb_id
            })
        ] as any
    }
    const actors = credits.cast.map(item => {
        const actor: Actor = {
            name: item.name,
            role: item.character,
            thumb: item.profile_path ? imageUrl(item.profile_path) : null,
            order: item.order.toString()
        }
        return actor
    })
    detail.actor = actors.map(xmlModelize) as any
    const obj = xmlModelize({
        movie: detail
    })
    const nfo = stringify(obj)
    console.log(nfo)
}

async function makeMovieList() {
    for (let page = 1; page < 2; page++) {
        const data = await getTopMovie()
        data?.results.forEach(async (movie) => {
            // console.log(movie)
            const detail = await getMovie(movie.id)
            const credits = await getMovieCredits(movie.id)
            buildNfo(detail!, credits!)
            helper.download(imageUrl(movie.poster_path), `build/movie/${movie.title}/poster.jpg`)
            helper.download(imageUrl(movie.backdrop_path), `build/movie/${movie.title}/fanart.jpg`)
            helper.touch(`build/movie/${movie.title}/${movie.title}.mp4`)
        })
    }
}

makeMovieList()
