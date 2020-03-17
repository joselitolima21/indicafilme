import axios from 'axios'
import { api_key } from '../keys/apiKey'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

const lang = 'pt-BR'

//Search filmes = https://api.themoviedb.org/3/search/movie?api_key={apikey}&language=pt-BR&page=1&include_adult=true&query=Homem+de+ferro
export async function search(page, adult, query) {
    const queryIdeal = query.split(' ').reduce((acumulator, current) => (acumulator + '+' + current))
    const response = await api.get(`search/movie?api_key=${api_key}&language=${lang}&page=${page}&include_adult=${adult}&query=${queryIdeal}`)
    return response.data
}