import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export async function fetchApi(url) {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': process.env.BAYUT_API_KEY,
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });

    return data;
}