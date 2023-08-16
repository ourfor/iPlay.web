export interface MediaDetail {
    Name: string
    OriginalTitle: string
    Overview: string
    Genres: string[]
    BackdropImageTags: string[]
    Id: string
    ImageTags: {
        Banner: string
        Logo: string
        Primary: string
        Thumb: string
    }
    People: People[]
    SeriesId: string
    SeriesName: string
}

export interface People {
    Id: string
    Name: string
    PrimaryImageTag: string
    Role: string
    Type: string
}