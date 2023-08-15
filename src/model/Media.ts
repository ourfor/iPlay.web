export interface Media {
    AirDays: string[]
    BackdropImageTags: string[]
    CanDelete: boolean
    Id: string
    ImageTags: {
        Primary: string,
        Thumb: string
    }
    Primary: string
    Thumb: string
    IsFolder: boolean
    Name: string
    PrimaryImageAspectRatio: number
    ProductionYear: number
    RunTimeTicks: number
    ServerId: string
    Status: string
    SupportsSync: boolean
    Type: string
    UserData: {
        UnplayedItemCount: number,
        PlaybackPositionTicks: number,
        PlayCount: number,
        IsFavorite: boolean,
        Played: boolean
    }
    IsFavorite: boolean
    PlayCount: number
    PlaybackPositionTicks: number
    Played: boolean
    UnplayedItemCount: number
}