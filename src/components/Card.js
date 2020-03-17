import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

function CardFilm(props) {
  const { title, popularity, votesCount, votesAverage, imagePath, adult } = props
  return (
    <Card className='card text-center m-3' style={{ width: '200px' }}>
      <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500${imagePath}`} alt={title} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>Popularidade: {popularity}</CardSubtitle>
        <CardSubtitle>Número de votos: {votesCount}</CardSubtitle>
        <CardSubtitle>Média de votos: {votesAverage}</CardSubtitle>
        <CardSubtitle>Adulto: {adult ? 'Sim' : 'Não'}</CardSubtitle>
      </CardBody>
    </Card>
  );
}

export default CardFilm;