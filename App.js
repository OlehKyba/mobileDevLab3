import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { Nav, Center } from './src/UI';
import { MovieListScreen } from "./src/screens";


function Item2Screen() {
  return (
      <Center>
          <Text>Item2!</Text>
      </Center>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
    const navigation = [
        {
            name: "Movies List",
            component: MovieListScreen,
            iconFactory: (size, color) =>
                <MaterialCommunityIcons name="library-movie" size={size} color={color} />
        },
    ];

    return (
        <Nav tab={Tab} navigation={navigation}>
            {navigation.map(item => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                />
            ))}
            <Tab.Screen name="Item2" component={Item2Screen}/>
        </Nav>
  );
}
