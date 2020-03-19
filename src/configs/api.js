import axios from 'axios'
//require('dotenv').config();

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

const api_key = process.env.REACT_APP_API_KEY
const lang = 'pt-BR'
const adult = false

//Procurar os filmes = https://api.themoviedb.org/3/search/movie?api_key={apikey}&language=pt-BR&page=1&include_adult=true&query=Homem+de+ferro
export async function search(page, query) {
    const queryIdeal = query.split(' ').reduce((acumulator, current) => (acumulator + '+' + current))
    const response = await api.get(`search/movie?api_key=${api_key}&language=${lang}&page=${page}&include_adult=${adult}&query=${queryIdeal}`)
    console.log(response.data)
    return response.data
}

//Pegar os generos https://api.themoviedb.org/3/genre/movie/list?api_key={apikey}&language=pt-BR
export async function genres() {
    const response = await api.get(`genre/movie/list?api_key=${api_key}&language=${lang}`)
    return response.data
}

//Informações com id externo https://api.themoviedb.org/3/find/<<id>>?api_key={apikey}&language=pt-BR&external_source=imdb_id

//Pegar por Generos com adultos ou não https://api.themoviedb.org/3/discover/movie?api_key={apikey}&language=pt-BR&include_adult=true&include_video=true&page=1&with_genres=99
export async function searchByGenres(page,genre) {
    const response = await api.get(`discover/movie?api_key=${api_key}&language=${lang}&include_adult=${adult}&include_video=true&page=${page}&with_genres=${genre}`)    
    return response.data
}

