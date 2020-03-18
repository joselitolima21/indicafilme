import React, { useState, useEffect } from 'react';
import { search, genres, searchByGenres } from '../configs/api'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import Search from '../components/Search'
import Footer from '../components/Footer'
import { Container, Row, Col, Button, Input } from 'reactstrap';

function Home() {

  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [genresValue, setGenresValue] = useState([])

  // Baixa os generos toda vez que abre a página
  useEffect(() => {
    async function getGenres() {
      const res = await genres()
      setGenresValue(res.genres)
    }
    getGenres()
  }, []) // eslint-disable-line

  // Procura os filmes por genero
  const handleSearchByGenre = async (event, genre) => {
    event.preventDefault()
    const response = await searchByGenres(1, true, genre)

    response.results.sort(function (a, b) {
      return b.popularity - a.popularity;
    });

    setResponse(response)
  }

  // Procura os filmes por nome dado
  const handleSearch = async (event) => {
    event.preventDefault()
    const response = await search(1, true, query)

    response.results.sort(function (a, b) {
      return b.popularity - a.popularity;
    });

    setResponse(response)
  }

  return (
      <>
      <NavBar />

      <Container className="themed-container bg-dark p-3" fluid={true}>

        <Row>

          <Col >
            <Search genresValue={genresValue} handleSearchByGenre={handleSearchByGenre} />
          </Col>

          <Col xs={2} className='p-0'>
            <Input type="text" placeholder="Digite um filme" onChange={(event) => setQuery(event.target.value)} />
          </Col>

          <Col xs={1} className='p-0' >
            <Button className='ml-1' type="submit" color="info" onClick={(event) => handleSearch(event)}> Buscar </Button>
          </Col>

        </Row>

      </Container>


      <Container className="themed-container text-center row justify-content-between bg-light mb-5 pb-2" fluid={true}>
        {response && response.results.map((film) => {
          if (film.poster_path) {
            return (
              <Card key={film.id} title={film.title} popularity={film.popularity} votesCount={film.vote_count} votesAverage={film.vote_average}
                imagePath={film.poster_path} adult={film.adult} />
            )
          }
          return null
        })}
      </Container>
      <Footer/>
      </>
  );
}

export default Home;
