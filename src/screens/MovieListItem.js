import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

import { Avatar, Badge, ListItem } from "react-native-elements";


export const MovieListItem = ({title, year, type, poster}) => {
    return (
        <ListItem
            bottomDivider
        >
            {poster ?
                <Avatar
                    rounded
                    size="large"
                    source={{uri: Image.resolveAssetSource(poster).uri}}
                />
                : null
            }
            <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle>
                    {year ?
                        <Badge value={year}/>
                        : null
                    }
                    {type ?
                        <Badge value={type} status="warning"/>
                        : null
                    }
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

MovieListItem.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    poster: PropTypes.number,
    year: PropTypes.string,
};
