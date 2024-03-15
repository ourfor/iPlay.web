#!/usr/bin/env deno run --allow-all

import { MovieDetail, Movie, Pageable, imageUrl, Credits } from "./type.ts";
import { Actor, TVShow as NFOTVShow } from "./nfo.ts"
import helper from "./helper.ts";
import { parse, stringify } from "https://deno.land/x/xml/mod.ts"
import { modelize } from "./nfo.ts";
import { tmdbImageUrl } from "./type.ts";
import { Series } from "./type.ts";


async function getTopTV(page = 1) {
    const uri = `/3/tv/top_rated?language=zh-CN&page=${page}`;
    return await helper.request<Pageable<MovieDetail>>(uri)
}

async function getSeries(id: number) {
    const uri = `/3/tv/${id}?language=zh-CN`;
    return await helper.request<Series>(uri)
}

async function getTVCredits(id: number) {
    const uri = `/3/tv/${id}/credits?language=zh-CN`;
    return await helper.request<Credits>(uri)
}

function buildNfo(series: Series, credits: Credits) {
    const detail: NFOTVShow  = {
        title: series.name,
        originaltitle: series.original_name,
        sorttitle: series.name,
        premiered: series.first_air_date,
        uiniqueid: [
            {
                $default: true,
                $type: "tmdb",
                $: series.id.toString()
            }
        ],
        genre: series.genres.map(item => item.name),
        plot: series.overview,
        tagline: series.tagline,
        season: series.seasons.toString(),
        mpaa: series.adult ? "R" : "PG-13",
        thumb: [
            {
                $aspect: "poster",
                $: tmdbImageUrl(series.poster_path)
            }
        ],
        fanart: {
            thumb: [
                {
                    $preview: tmdbImageUrl(series.backdrop_path), 
                    $: tmdbImageUrl(series.backdrop_path)
                }
            ]
        },
        ratings: {
            rating: [
                {
                    $name: "themoviedb",
                    $max: 10,
                    value: series.vote_average,
                    votes: series.vote_count
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
    const totalPage = 100
    const link = `https://api.endemy.me/stream/source.mp4`
    for (let page = 1; page <= totalPage; page++) {
        console.log(`page: ${page}, total: ${totalPage}`)
        const data = await getTopTV(page)
        await data?.results.forEach(async (tv) => {
            const detail = await getSeries(tv.id)
            const credits = await getTVCredits(tv.id)
            const nfo = buildNfo(detail!, credits!)
            await helper.download(imageUrl(tv.poster_path), `build/tv/${detail?.name}/poster.jpg`)
            await helper.download(imageUrl(tv.backdrop_path), `build/tv/${detail?.name}/fanart.jpg`)
            helper.touch(`build/tv/${detail?.name}/tvshow.nfo`, nfo)
            detail?.seasons.forEach((season) => {
                for (let i = 1; i <= season.episode_count; i++) {
                    const sno = season.season_number.toString().padStart(2, '0')
                    const eno = i.toString().padStart(2, '0')
                    const url = new URL(link)
                    url.searchParams.set("title", detail.name)
                    url.searchParams.set("tmdbid", detail.id.toString())
                    url.searchParams.set("season", sno)
                    url.searchParams.set("episode", eno)
                    url.searchParams.set("type", "tv")
                    url.searchParams.set("airdate", detail.first_air_date)
                    helper.touch(`build/tv/${detail.name}/Season ${season.season_number}/S${sno}E${eno}.strm`, url.href)
                }
            })
        })
        await helper.sleep(1)
    }
}

makeMovieList()
