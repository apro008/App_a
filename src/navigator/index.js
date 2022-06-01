import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { Home, Details } from "../screen/";

const Stack = createStackNavigator();

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Details" component={Details} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
