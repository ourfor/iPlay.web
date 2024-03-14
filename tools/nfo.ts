// @see https://kodi.wiki/view/NFO_files/Movies
export interface Actor {
    // Actor name
    name: string
    // Role played by the actor
    role?: string
    // Actor thumb image
    thumb?: string|null
    // Actor order
    // The <order> tag determines where in the list the actor will appear. 0 = first in the list
    order?: string
}

export interface Uniqueid {
    $default?: boolean,
    // Unique identifier type
    $type: string,
    // Unique identifier value
    $: string
}

export interface Thumb {
    $preview?: string,
    $aspect?: string,
    $: string
}

export interface Movie {
    // The title for the movie
    title: string
    // Displays the original title of the movie.
    originaltitle?: string
    // Allows alternate title sort without modifying movie title. Not displayed in any library listing.
    sorttitle?: string
    // Personal rating set by the user
    userrating?: string
    // Ranking in IMDB Top 250 movies
    top250?: string
    // Should be short, will be displayed on a single line (scraped from IMDB only)
    outline?: string
    // Can contain more information on multiple lines, will be wrapped
    plot?: string
    // Short movie slogan. "The true story of a real fake" is the tagline for "Catch me if you can"
    tagline?: string
    // Minutes only. If ommitted, Kodi will add runtime upon scanning
    runtime?: string
    // Country specific mpaa rating system. Check with skin author which prefix is required to diplay your country certification flags
    mpaa?: string
    // Number of times movie has been played.
    playcount?: string
    // Date last played as yyyy-mm-dd
    lastplayed?: string
    // Movie genre
    genre?: string[]
    // Library Tags. 
    tag?: string[]
    // Country of origin
    country?: string[]
    // Field for writers.
    credits?: string[]
    // Field for directors.
    director?: string[]
    // Release date of movie. Format as yyyy-mm-dd
    premiered?: string
    // Release Year.
    year?: string
    // Production studio
    studio?: string
    // Local or online path to movie trailer
    trailer?: string

    actor?: Actor[]
    uiniqueid?: Uniqueid[]
}

export function xmlModelize(obj: object) {
    return Object.entries(obj).reduce((map, [key, value]) => {
        if (key.startsWith("$")) {
            if (key === "$") key = "#text"
            else {
                key = key.replace("$", "@")
            }
        }
        return {
            ...map,
            [key]: value
        }
    }, {})
}