export type Genre = {id:number,genre:string,checked:boolean}
export interface Movie {
    title : string
    id : number
    release_date : string
    mpaa_rating : string
    description : string
    run_time : number
    genres : Genre[]
    genres_array: number[]
    image : string
}

type Rating = "R" | "E" | ""

export interface Alert {
    message :string
    type : string
}

export interface JWT {
    error :string
    access_token:string
}