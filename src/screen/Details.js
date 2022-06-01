import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { DataTable } from "react-native-paper";
import SafeView from "../component/SafeView.js";
import AppText from "../component/AppText.js";

const Details = ({ route }) => {
	return (
		<SafeView>
			<AppText>{JSON.stringify(route.params)}</AppText>
		</SafeView>
	);
};

export default Details;

const styles = StyleSheet.create({});
