import React, { Component } from 'react';
import { Text, FlatList, View } from 'react-native';

import { MovieListItem } from "./MovieListItem";

import { MoviesRepository } from '../domain';
import { Center } from "../UI";

import { rawMovies } from '../../rawMovies';

export class MovieListScreen extends Component {
    state = {
        movieRepository: new MoviesRepository(rawMovies),
        movies: [],
    }
    componentDidMount() {
        const movies = this.state.movieRepository.get().map(item => ({key: item.id, ...item}));
        this.setState({movies})
    }

    render() {
        return this.state.movies.length > 0 ? (
            <View style={{paddingTop: 22}}>
                <FlatList
                    data={this.state.movies}
                    renderItem={({item}) => <MovieListItem {...item}/>}
                />
            </View>
        ): <Center><Text>Rendering!</Text></Center>;
    }
}
