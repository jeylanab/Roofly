import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

console.log("this is zoopla api");
console.log("=========================");

const API_URL = process.env.ZOOPLA_API_URL;
const API_KEY = process.env.ZOOPLA_API_KEY;
const HOST = process.env.ZOOPLA_API_HOST;

console.log("API_URL:", API_URL);
console.log("API_KEY:", API_KEY);
console.log("HOST:", HOST);

const fetchProperties = async () => {
    const location = '';

    try {
        const response = await axios.get(API_URL, {
            params: {
                locationValue: location,
                page: '2',
            },
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': HOST,
            },
        });

        const result = response.data.data.listings.regular;
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error:", error.message);
    }
};

fetchProperties();
