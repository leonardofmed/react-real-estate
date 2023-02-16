import axios from "axios";

export default class FetchAPI {
    public baseUrl = 'https://bayut.p.rapidapi.com';

    public async fetchApi(url: string) {
        const { data } = await axios.get((url), {
            headers: {
                'X-RapidAPI-Key': process.env.BAYUT_API_KEY,
                'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
            }
        });
    
        return data;
    }
}