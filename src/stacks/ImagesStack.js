import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import {Button} from 'react-native-elements';

import { ImagesScreen } from "../screens";
import { useOrientation } from "../hooks";

const ImagesStack = createStackNavigator();

export const ImagesStackScreen = ({navigation}) => {
    const orientation = useOrientation();
    return (
        <ImagesStack.Navigator>
            <ImagesStack.Screen
                name="Images"
                component={ImagesScreen}
                options={{
                    headerStyle: {height: orientation === 'PORTRAIT' ? 100 : 50},
                    headerRight: () => (
                        <Button
                            type="clear"
                            onPress={() => {}}
                            icon={<Ionicons name="ios-add" size={40}/>}
                        />)
                }}
            />
        </ImagesStack.Navigator>
    );
};
