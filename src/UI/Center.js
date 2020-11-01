import React from "react";
import { View } from "react-native";


export const Center = ({children}) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: "center", height: "100%"}}>
            {children}
        </View>
    );
}
