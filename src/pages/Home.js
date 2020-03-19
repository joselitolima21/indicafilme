import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
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
  }, []) // eslint-disable-line

  return (
    <>
      <NavBar />

      <Container className="themed-container bg-dark p-3" fluid={true}>

        <Row>

          <Col >
            <Search />
          </Col>

          <Col xs={2} className='p-0'>
            <Input type="text" placeholder="Digite um filme" onChange={(event) => dispatch(actions.setQuery(event.target.value))} />
          </Col>

          <Col xs={1} className='p-0' >
            <Button className='ml-1' type="submit" color="info" onClick={(event) => {dispatch(actions.handleSearch(event,state.query,state.page))
            dispatch(actions.setSearchType('query'))}}> Buscar </Button>
          </Col>

        </Row>

      </Container>


      <Container className="themed-container text-center row justify-content-between bg-light mb-5 pb-2" fluid={true}>
        {state.response &&
          state.response.results.map((film) => {
          if (film.poster_path) {
            return (
              <Card key={film.id} title={film.title} popularity={film.popularity} votesCount={film.vote_count} votesAverage={film.vote_average}
                imagePath={film.poster_path} adult={film.adult} />
            )
          }
          return null
        })
        }
      </Container>
      {state.response && <Pagination/>}
      <Footer/>
      </>
  );
}

export default Home;
