import {
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
	View,
} from "react-native";
import React from "react";

const SafeView = ({ children, style }) => {
	return (
		<SafeAreaView style={[styles.container, style]}>
			<View style={style}>{children}</View>
		</SafeAreaView>
	);
};

export default SafeView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});
