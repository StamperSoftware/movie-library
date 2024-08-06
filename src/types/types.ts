export interface Movie {
    name : string
    genre : string
    id : number
    release_date : string
    mpaa_rating : string
    description : string
    runtime : number
}

type Rating = "R" | "E" | ""
type Genre = "Comedy" | "Kids" | ""

export interface Alert {
    message :string
    type : string
}