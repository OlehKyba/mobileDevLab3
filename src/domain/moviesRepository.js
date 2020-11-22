import {Movie} from "./movie";

import {posters} from "./posters";
import moviesList from "./MoviesList.json";

import tt0076759 from "./movies/tt0076759.json";
import tt0080684 from "./movies/tt0080684.json";
import tt0086190 from "./movies/tt0086190.json";
import tt0120915 from "./movies/tt0120915.json";
import tt0121765 from "./movies/tt0121765.json";
import tt0121766 from "./movies/tt0121766.json";
import tt0796366 from "./movies/tt0796366.json";
import tt2488496 from "./movies/tt2488496.json";
import tt2527336 from "./movies/tt2527336.json";
import tt3748528 from "./movies/tt3748528.json";


export class MoviesRepository {
    constructor() {
        this._movies = moviesList["Search"].map(
            ({imdbID, Title, Year, Poster, Type}) => new Movie(
                imdbID,
                Title,
                Year,
                this._mapType(Type),
                this._getPoster(Poster),
            ));
        this._moviesDetails = {
            tt0076759,
            tt0080684,
            tt0086190,
            tt0120915,
            tt0121765,
            tt0121766,
            tt0796366,
            tt2488496,
            tt2527336,
            tt3748528,
        }

        for(const key in this._moviesDetails) {
            const movieDetails = this._moviesDetails[key];

            const posterName = movieDetails['Poster'];
            const movieType = movieDetails['Type'];

            movieDetails['Poster'] = this._getPoster(posterName);
            movieDetails['Type'] = this._mapType(movieType);
        }
    }

    _getPoster(posterName) {
        if (!posterName) return null;
        else if (typeof posterName == 'number') return posterName;
        const [poster] = posterName.split('.');
        return posters[poster];
    }

    _mapType(movieType) {
        return movieType !== "" ? movieType : null;
    }

    _createId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getList() {
        return this._movies;
    }

    get(movieId) {
        return this._moviesDetails[movieId];
    }

    search(searchQuery) {
        const pattern = new RegExp(searchQuery);
        return this._movies.filter(item => pattern.test(item.title));
    }

    push(movie) {
        const uuid = this._createId();
        movie.id = uuid;
        this._movies.push(movie);
        this._moviesDetails[uuid] = Object.keys(movie)
            .reduce((acc, value) => {
                const key = value[0].toUpperCase() + value.slice(1);
                acc[key] = movie[value];
                return acc;
            }, {});
    }

    delete(movieId) {
        const index = this._movies.findIndex(movie => movie.id === movieId);
        if (index > -1) {
            this._movies.splice(index, 1);
            delete this._moviesDetails[movieId];
        }
    }
}
