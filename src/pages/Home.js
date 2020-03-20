import React, { useEffect } from 'react';
import { Container, Button, Input } from 'reactstrap';
import { genres } from '../configs/api'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import Search from '../components/Search'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/reducers/reducer.js'

function Home() {

  const state = useSelector(state => state.reducer) 
  const dispatch = useDispatch()

  // Baixa os generos toda vez que abre a página
  useEffect(() => {
    async function getGenres() {
      const res = await genres()
      dispatch(actions.setGenresValue(res.genres))
    }
    getGenres()
    dispatch(actions.handleSearchByGenre('',1))
  }, []) // eslint-disable-line

  return (
      <Container className="themed-container bg-ligth p-0" fluid={true}>
      <NavBar />

      <Container className="d-flex justify-content-between bg-dark p-3" fluid={true}>
            <Search />
            
            <Container className="d-flex bg-dark m-0 p-0 justify-content-end">
            <Input className='form-control w-auto ml-2'type="text" placeholder="Digite um filme" onChange={(event) => dispatch(actions.setQuery(event.target.value))} />
            <Button className='ml-1' type="submit" color="info" onClick={(event) => {
              dispatch(actions.setSearchType('query'))
              dispatch(actions.handleSearch(state.query,1))
            }}> Buscar </Button>
            
            </Container>
      </Container>


      <Container className="themed-container ml-auto mr-auto text-center row justify-content-center bg-light pr-0 pl-0" fluid="lg">
        {state.response &&
          state.response.results.map((film) => {
          if (film.poster_path) {
            return (
              <Card key={film.id} 
                    title={film.title} 
                    popularity={film.popularity} 
                    votesAverage={film.vote_average}
                    imagePath={film.poster_path}
                    overview={film.overview}
                    />
            )
          }
          return null
        })
        }
      </Container>
      {state.response && <Pagination/>}
      <Footer/>
      </Container>
  );
}

export default Home;
