import React from "react";
import defaultStyles from "../config/style.js";
import { Title } from "react-native-paper";

const AppText = ({ children, style, ...otherProps }) => {
	return (
		<Title style={[defaultStyles.text, style]} {...otherProps}>
			{children}
		</Title>
	);
};

export default AppText;
