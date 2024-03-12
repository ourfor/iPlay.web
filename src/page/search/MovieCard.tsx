import { TMDB } from "@api/tmdb";
import style from "./MovieCard.module.scss"

export function MovieCard(props: {
    movie: Partial<TMDB.MovieDetail>
}) {
    const { movie } = props
    return (
        <div className={style.root}>
            {movie?.backdrop_path ? <img src={`${TMDB.imgHost}${movie.backdrop_path}`} alt={movie.title} /> : null}
            <section>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </section>
        </div>
    )
}