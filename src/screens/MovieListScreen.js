import React, { Component } from 'react';
import { Text, FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { MovieListItem } from "./MovieListItem";
import { moviesRepository } from "../domain/repo";
import { Center } from "../UI";

export class MovieListScreen extends Component {
    state = {
        search: '',
        movies: [],
    }

    componentDidMount() {
        const movies = moviesRepository.search(this.state.search)
            .map(item => ({key: item.id, ...item}));
        this.setState({movies});
    }

    onItemPress = (movieId) => {
        const movieDetails = moviesRepository.get(movieId);
        this.props.navigation.navigate('Movie Details', movieDetails);
    }

    searchUpdate = searchQuery => {
        this.setState(state => ({
            search: searchQuery,
            movies: moviesRepository.search(searchQuery),
        }));
    }

    deleteMovie = movieId => {
        moviesRepository.delete(movieId);
        const searchQuery = this.state.search;
        this.setState({movies: moviesRepository.search(searchQuery)});
    }

    render() {
        return (
            <View>
                <SearchBar
                    lightTheme
                    showLoading
                    placeholder="Type Here.."
                    onChangeText={this.searchUpdate}
                    onClear={() => this.searchUpdate('')}
                    value={this.state.search}
                />
                {this.state.movies.length > 0 ?
                    <View style={{paddingBottom: 120}}>
                        <FlatList
                            data={this.state.movies}
                            renderItem={({item}) => <MovieListItem
                                {...item}
                                onPress={this.onItemPress.bind(null, item.id)}
                                onRemove={this.deleteMovie.bind(null, item.id)}
                            />}
                        />
                    </View>
                    : <Center style={{paddingBottom: 120}}>
                        <Text>No items found!</Text>
                    </Center>
                }
            </View>
        )
    }
}
