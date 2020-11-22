import React from 'react';
import { Text, Image, ScrollView } from 'react-native'
import { Card, Rating } from 'react-native-elements'


export const MovieDetailsScreen = ({route}) => {
    const movieDetails = route.params;
    const image = movieDetails['Poster'];
    const title = movieDetails['Title'];
    const rating = Number.parseFloat(movieDetails['imdbRating'])

    const mainProperties = {Released: 'Released', Genre: 'Genre', Runtime: 'Runtime'};
    const peopleProperties = {
        Director: 'Director',
        Writer: 'Writer',
        Actors: 'Actors'
    };
    const manufactureProperties = {Country: 'Country', Language: 'Language'};
    const awardsProperties = {Awards: 'Awards', imdbVotes: 'Votes'};

    const renderProperties = properties => {
        return Object.keys(properties).map(key => {
            const text = movieDetails[key];
            return text ? (
                <Text key={key}>
                    {properties[key]}: {movieDetails[key]}
                </Text>
            )
                : null;
        });
    };

    return (
        <ScrollView>
            <Card>
                <Card.Title>{title}</Card.Title>
                <Card.Divider/>
                {image ?
                    <Card.Image
                        source={{uri: Image.resolveAssetSource(image).uri}}
                        resizeMode={'contain'}
                        style={{height: 250}}
                    />
                    : null
                }
                {renderProperties(mainProperties)}
                {renderProperties(peopleProperties)}
                {renderProperties(manufactureProperties)}
                {renderProperties(awardsProperties)}
                <Rating
                    showRating
                    count={10}
                    fractions={2}
                    ratingCount={10}
                    imageSize={30}
                    startingValue={rating}
                />
            </Card>
        </ScrollView>
    );
};
