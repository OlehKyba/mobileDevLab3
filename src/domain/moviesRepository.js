import { Movie } from "./movies";
import { posters } from "./posters";
import moviesList from "./MoviesList.json";


export class MoviesRepository {
    constructor() {
        this._movies = moviesList["Search"].map(
            ({imdbID, Title, Year, Poster, Type}) => new Movie(
                imdbID,
                Title,
                Year,
                Type !== "" ? Type : null,
                this._getPoster(Poster),
            ));
    }

    _getPoster(posterName) {
        if (posterName === "") return null;
        const [poster] = posterName.split('.');
        return posters[poster];
    }

    get() {
        return this._movies;
    }
}
