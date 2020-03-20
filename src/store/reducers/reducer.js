import { search, searchByGenres } from '../../configs/api'

const initialState = {
    query: '',
    response: '',
    genresValue: [],
    page: 1,
    idGenreChoiced: '',
    loading: false,
    error: null,
    searchType: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_SEARCH_TYPE':
            return {...state, searchType: action.searchType };
        case 'CHANGE_QUERY':
            return { ...state, query: action.query };
        case 'CHANGE_RESPONSE':
            return { ...state, loading: false, error: null, response: action.response };
        case 'CHANGE_GENRES':
            return { ...state, genresValue: action.genresValue };
        case 'CHANGE_ID':
            return { ...state, idGenreChoiced: action.idGenreChoiced };
        case 'CHANGE_PAGE':
            return { ...state, page: action.page };
        case 'SEARCH_STARTED':
            return { ...state, loading: true };
        case 'SEARCH_FAILED':
            return { ...state, loading: false, error: action.error };
        default:
            return state
    }
}

export const actions = {
    setSearchType: (searchType) => (
        { type: 'CHANGE_SEARCH_TYPE', searchType: searchType }
    ),
    setQuery: (query) => (
        { type: 'CHANGE_QUERY', query: query }
    ),
    setGenresValue: (genresValue) => (
        { type: 'CHANGE_GENRES', genresValue: genresValue }
    ),
    setIdGenreChoiced: (idGenreChoiced) => (
        { type: 'CHANGE_ID', idGenreChoiced: idGenreChoiced }
    ),
    setPage: (page) => (
        { type: 'CHANGE_PAGE', page: page }
    ),
    setResponse: (response) => (
        { type: 'CHANGE_RESPONSE', response: response }
    ),
    searchStarted: () => (
        { type: 'SEARCH_STARTED' }
    ),
    searchFailed: (error) => (
        { type: 'SEARCH_FAILED', error: error }
    ),
    handleSearchByGenre: (genre, page) => {
  
        return dispatch => {
            dispatch(actions.searchStarted());

            searchByGenres(page, genre).then(
                response => {
                    response.results.sort(function (a, b) {
                        return b.popularity - a.popularity;
                    });
                    dispatch(actions.setResponse(response))
                })
                .catch(err => {
                    dispatch(actions.searchFailed(err.message));
                });
        };
    },
    // Procura os filmes por nome dado
    handleSearch: (query, page,) => {
        return dispatch => {
            dispatch(actions.searchStarted());

            search(page, query).then(
                response => {
                    response.results.sort(function (a, b) {
                        return b.popularity - a.popularity;
                    });
                    dispatch(actions.setResponse(response))
                }
            )
            .catch(err => {
                dispatch(actions.searchFailed(err.message));
            });
        }
    },
}