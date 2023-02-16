import { getStaticProps } from '../pages/index';
import FetchAPI from '../utils/fetchApi';

// Create a Jest mock function for FetchAPI.prototype.fetchApi
const mockFetchApi = jest.fn();

// Mock the FetchAPI class
jest.mock('../utils/fetchApi', () => {
    return jest.fn().mockImplementation(() => {
        return {
            fetchApi: mockFetchApi
        };
    });
});

describe('getStaticProps', () => {
    test('returns expected props', async () => {
        // TODO ADD REAL DATA
        const mockPropertiesForSale = [{ id: 1, name: 'Property 1' }];
        const mockPropertiesForRent = [{ id: 2, name: 'Property 2' }];

        // Set up the mock FetchAPI response
        mockFetchApi.mockResolvedValueOnce({ hits: mockPropertiesForSale });
        mockFetchApi.mockResolvedValueOnce({ hits: mockPropertiesForRent });

        // Call the getStaticProps function
        const { props } = await getStaticProps();

        // Assert that the returned props object is as expected
        expect(mockFetchApi).toHaveBeenCalledTimes(2);
        expect(mockFetchApi).toHaveBeenCalledWith('https://bayut.p.rapidapi.com/properties/list?purpose=for-sale&hitsPerPage=6&locationExternalIDs=5002');
        expect(mockFetchApi).toHaveBeenCalledWith('https://bayut.p.rapidapi.com/properties/list?purpose=for-rent&hitsPerPage=6&locationExternalIDs=5002');
        expect(props).toEqual({
            props: {
                propertiesForSale: mockPropertiesForSale,
                propertiesForRent: mockPropertiesForRent
            }
        });
    });
    
    // TODO ADD TEST WHEN API CALL FAILS
});
