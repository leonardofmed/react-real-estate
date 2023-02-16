import axios from 'axios';
import FetchAPI from "../utils/fetchApi";

describe('FetchAPI', () => {
	// Mock the axios.get method using spyOn
	const axiosGetSpy = jest.spyOn(axios, 'get');
	
	// Add an afterEach hook to clear all mocked functions between tests, to avoid any cross-test contamination.
	afterEach(() => {
		jest.clearAllMocks();
	});

	// We then create a test case that creates an instance of the FetchAPI class and calls the fetchApi method with a mock URL (/test/url). 
	test('fetchApi returns data from mock response', async () => {
		const mockData = { result: 'mock data' };
    	axiosGetSpy.mockResolvedValueOnce({ data: mockData });

		const fetchAPI = new FetchAPI();
		const result = await fetchAPI.fetchApi('/test/url');

		// We then make assertions using the expect function to verify that the axios.get method was called once with the correct URL and headers, 
		// and that the returned data matches our mockData object.
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith('/test/url', {
			headers: {
				'X-RapidAPI-Key': process.env.BAYUT_API_KEY,
				'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
			}
		});
		expect(result).toEqual(mockData);
	});

	test('fetchApi throws an error on API error response', async () => {
		const mockError = new Error('Mock error message');
		axiosGetSpy.mockRejectedValueOnce(mockError);

		const fetchAPI = new FetchAPI();

		// Add a new test case that tests the behavior when the API returns an error. 
		// We use mockRejectedValueOnce to mock the axios.get method to return a rejected Promise with a mock error. 
		// We then use the Jest .rejects matcher with expect to verify that the fetchApi method throws the expected error.
		await expect(fetchAPI.fetchApi('/test/url')).rejects.toEqual(mockError);

		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith('/test/url', {
			headers: {
			'X-RapidAPI-Key': process.env.BAYUT_API_KEY,
			'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
			}
		});
	});

	// Restore the original implementation of axios.get after the test
	// This is important to ensure that other tests that rely on the original implementation of axios.get are not affected.
	afterAll(() => {
		axiosGetSpy.mockRestore();
	});
});
