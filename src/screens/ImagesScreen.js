import React, {useState, useLayoutEffect} from "react";
import {Dimensions, Image, ScrollView} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";

import {useOrientation} from "../hooks";

const chunking = (array, length) => {
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

export const ImagesScreen = ({navigation}) => {
    useOrientation();
    const [images, setImages] = useState([]);

    const addImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        setImages(prevState => [...prevState, result.uri]);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    type="clear"
                    onPress={addImage}
                    icon={<Ionicons name="ios-add" size={40}/>}
                />
            ),
        });
    }, [navigation]);

    const imagesArray = chunking(images, 3);
    const { width } = Dimensions.get('window');

    const height = width / 3;
    const colStyle = {height};
    const secondRowColStyle = {height: height * 2};

    const key = (uri, index) => `${uri}_${index}`;
    const image = uri => (
        <Image
            source={{uri: uri}}
            style={{height: "100%", width: "100%"}}
        />);

    const mapNormalChunk = (chunk, index) => {
        return (
            <Row key={index}>
                {chunk.map((img, index) => (
                    <Col style={colStyle} key={key(img, index)}>
                        {img && image(img)}
                    </Col>)
                )}
            </Row>
        )
    };

    const mapSpecialChunk = (chunk, index) => {
        const firstImages = chunk.slice(0, 2);
        const thirdImage = chunk[2];

        const firstPart = firstImages.map((img, index) => (
            <Row key={key(img, index)}>
                {img && image(img)}
            </Row>)
        );

        return (
            <Row key={index}>
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
                    return index % 3 === 1 ? mapSpecialChunk(chunk, index): mapNormalChunk(chunk, index);
                })}
            </Grid>
        </ScrollView>
    );
};
