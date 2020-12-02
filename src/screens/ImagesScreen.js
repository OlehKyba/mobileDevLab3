import React from "react";
import {Dimensions, Image, ScrollView} from 'react-native';
import {Col, Grid, Row} from "react-native-easy-grid";

import {posters} from "../domain";
import {useOrientation} from "../hooks";

const chunkify = (array, length) => {
    let begin = 0;
    let end = length;
    const chunks = [];
    do{
        chunks.push(array.slice(begin, end));
        begin += length
        end += length;
    } while (end < array.length + length);

    const last_chunk = chunks[chunks.length - 1];
    while (last_chunk.length < length) {
        last_chunk.push(undefined);
    }
    return chunks;
}

export const ImagesScreen = () => {
    useOrientation();
    const imagesArray = chunkify(Object.values(posters), 3);
    const { width } = Dimensions.get('window');

    const height = width / 3;
    const colStyle = {height};
    const secondRowColStyle = {height: height * 2};

    const image = img => (
        <Image
            source={{uri: Image.resolveAssetSource(img).uri}}
            style={{height: "100%", width: "100%"}}
        />);

    const mapNormalChunk = (chunk, index) => {
        return (
            <Row key={index}>
                {chunk.map(img => (
                    <Col style={colStyle} key={img}>
                        {img && image(img)}
                    </Col>)
                )}
            </Row>
        )
    };

    const mapSpecialChunk = (chunk, index) => {
        const firstImages = chunk.slice(0, 2);
        const thirdImage = chunk[2];

        const firstPart = firstImages.map((img) => (
            <Row key={img}>
                {img && image(img)}
            </Row>)
        );

        return (
            <Row>
                <Col size={1} style={secondRowColStyle}>
                    {firstPart}
                </Col>
                <Col size={2} style={secondRowColStyle}>
                    {thirdImage && image(thirdImage)}
                </Col>
            </Row>
        );
    };

    return (
        <ScrollView>
            <Grid>
                {imagesArray.map((chunk, index) => {
                    return index % 2 !== 0 ? mapSpecialChunk(chunk, index): mapNormalChunk(chunk, index);
                })}
            </Grid>
        </ScrollView>
    );
};
