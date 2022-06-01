import {
	StyleSheet,
	FlatList,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { Button, DataTable, TextInput } from "react-native-paper";
import SafeView from "../component/SafeView.js";

const optionsPerPage = [2, 3, 4];

const Home = ({ navigation }) => {
	const [text, setText] = React.useState("");
	const [page, setPage] = React.useState(0);
	const [sort, setSort] = React.useState("ascending");
	const [createdSort, setCreatedSort] = React.useState("ascending");
	const [data, setData] = React.useState([]);

	const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

	const dataRef = React.useRef({
		data: [],
	});

	const getData = async () => {
		try {
			const res = await fetch(
				`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
			);
			const result = await res.json();
			dataRef.current.data.push(...result.hits);
			// setData([]);
			storeIntoState();
			setPage(page + 1);
		} catch (error) {
			console.log(`catch error`, error);
		}
	};

	const storeIntoState = () => {
		if (text) {
			const searchedData = dataRef.current.data.filter(
				(item) =>
					item?.title?.toLowerCase().includes(text) ||
					item?.url?.toLowerCase().includes(text) ||
					item?.author?.toLowerCase().includes(text)
			);
			console.log("debug: searchedData: ", searchedData);
			setData([...searchedData]);
		} else {
			setData([...dataRef.current.data]);
		}
	};

	const handleTextChange = useCallback((text) => {
		setText(text);
	}, []);

	React.useEffect(() => {
		const timer = setInterval(() => {
			getData();
		}, 1000 * 10);
		return () => clearInterval(timer);
	}, [page]);

	React.useEffect(() => {
		// wrap with debounce to imrove search performance
		storeIntoState();
	}, [text]);

	return (
		<SafeView>
			{/* <Button
				style={styles.buttonStyle}
				icon="arrow-right-thick"
				mode="contained"
				onPress={getData}>
				Press me
			</Button> */}
			<TextInput
				label="Search Here... wait 10 sec"
				value={text}
				style={styles.textInput}
				onChangeText={handleTextChange}
				mode="outlined"
			/>

			<DataTable>
				<DataTable.Header>
					<DataTable.Title
						sortDirection={sort}
						onPress={() =>
							sort === "ascending"
								? setSort("descending")
								: setSort("ascending")
						}>
						Title
					</DataTable.Title>
					<DataTable.Title>URL</DataTable.Title>
					<DataTable.Title
						sortDirection={createdSort}
						onPress={() =>
							createdSort === "ascending"
								? setCreatedSort("descending")
								: setCreatedSort("ascending")
						}>
						Created At
					</DataTable.Title>
					<DataTable.Title>Author</DataTable.Title>
				</DataTable.Header>
				<ScrollView showsVerticalScrollIndicator={false}>
					{data.map((i, index) => {
						return (
							<TouchableOpacity
								key={`key${i.url}-${index}`}
								onPress={() =>
									navigation.navigate("Details", {
										title: i.title,
										url: i.url,
										created_at: i.created_at,
										author: i.author,
									})
								}>
								<DataTable.Row key={`key${i.url}-${index}`}>
									<DataTable.Cell>{i.title}</DataTable.Cell>
									<DataTable.Cell>{i.url}</DataTable.Cell>
									<DataTable.Cell>{i.created_at}</DataTable.Cell>
									<DataTable.Cell>{i.author}</DataTable.Cell>
								</DataTable.Row>
							</TouchableOpacity>
						);
					})}
				</ScrollView>

				<DataTable.Pagination
					page={page}
					//numberOfPages={3}
					onPageChange={(page) => setPage(page)}
					label="1-2 of 6"
					optionsPerPage={optionsPerPage}
					itemsPerPage={itemsPerPage}
					setItemsPerPage={setItemsPerPage}
					showFastPagination
					optionsLabel={"Rows per page"}
				/>
			</DataTable>
		</SafeView>
	);
};

export default Home;

const styles = StyleSheet.create({
	buttonStyle: {
		marginTop: 20,
	},
	textInput: {
		borderWidth: 0,
		borderRadius: 15,
		width: "90%",
		height: 50,
		fontSize: 20,
		textAlign: "left",
		alignSelf: "center",
	},
});
