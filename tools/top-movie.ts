#!/usr/bin/env deno run --allow-all

import { MovieDetail, Pageable, imageUrl } from "./type.ts";
import helper from "./helper.ts";

async function makeMovieList() {
    for (let page = 1; page < 100; page++) {
        const url = `https://proxyall.endemy.me/3/movie/top_rated?language=zh-CN&page=${page}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            "X-HOST": "api.themoviedb.org"
          }
        };
        
        try {
            const response = await fetch(url, options)
            const data = await response.json() as Pageable<MovieDetail>
            data.results.forEach(movie => {
                console.log(movie)
                helper.download(imageUrl(movie.poster_path), `build/movie/${movie.title}/poster.jpg`)
                helper.download(imageUrl(movie.backdrop_path), `build/movie/${movie.title}/backdrop.jpg`)
                helper.touch(`build/movie/${movie.title}/${movie.title}.mp4`)
            })
        } catch (err) {
            console.error(err)
        }
    }
}

makeMovieList()

