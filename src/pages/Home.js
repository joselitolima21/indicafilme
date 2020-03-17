import React, { useState } from 'react';
import { search } from '../configs/api'
import Card from '../components/Card'
import NavBar from '../components/NavBar'

function Home() {

  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    const response = await search(1, true, query)
    
    response.results.sort(function(a, b) {
      return  b.popularity - a.popularity;
    });

    setResponse(response)
    console.log(response)
  }

  return (
      <div>

        <NavBar/>

        <div className="container-fluid text-center bg-dark p-3">
        <input type="text" placeholder="Digite um filme" onChange={(event) => setQuery(event.target.value)} />
        <button type="submit" onClick={(event) => handleSearch(event)}> Buscar </button>
        </div>

        <div class="container-fluid text-center row justify-content-between bg-light">
        { response && response.results.map((film) => {if(film.poster_path){
          return(
            <Card title={film.title} popularity={film.popularity} votesCount={film.vote_count} votesAverage={film.vote_average}
              imagePath={film.poster_path} adult={film.adult}/>
          )}
          return null
          })}
        </div>


      </div>
  );
}

export default Home;
