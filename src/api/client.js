import axios from "axios";

const client = axios.create({
	baseURL: "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=",
});

export default client;
