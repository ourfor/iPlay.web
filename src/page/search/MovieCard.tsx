import { TMDB } from "@api/tmdb";
import style from "./MovieCard.module.scss"
import { Card } from "@components/card/Card";

export function MovieCard(props: {
    movie: Partial<TMDB.MovieDetail>,
    color?: string
}) {
    const { movie, color = "green" } = props
    return (
        <Card className={style.root} color={color}>
            {movie?.backdrop_path ? <img src={`${TMDB.imgHost}${movie.backdrop_path}`} alt={movie.title} /> : null}
            <section>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </section>
        </Card>
    )
}