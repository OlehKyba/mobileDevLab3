
export class Movie {
    constructor(id, title, year, type, poster) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.poster = poster;
        this.type = type;
    }
}

export class MoviesRepository {
    constructor(movies) {
        this._movies = movies.map(
            ({imdbID, Title, Year, Poster, Type}) => new Movie(
                imdbID,
                Title,
                Year,
                Type !== "" ? Type : null,
                Poster !== "" ? Poster : null
            ));
    }

    get() {
        return this._movies;
    }
}
