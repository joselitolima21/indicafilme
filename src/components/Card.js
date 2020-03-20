import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Progress } from 'reactstrap';

function CardFilm(props) {
  const { title, votesAverage, imagePath, overview } = props
  return (
    <Card className='card text-center mt-2 ml-3 mr-3 mb-3 p-0' style={{ width: '300px', height: '650px' }}>
      <CardImg top src={`https://image.tmdb.org/t/p/w500${imagePath}`} width={300} height={400} alt={title} />
      <CardBody>
        <div className="text-center">{votesAverage*10}%</div>
        <Progress color={votesAverage >= 7 ? "success" : votesAverage >= 6 ? "info" : 'warning'} value={votesAverage*10} />
        <CardTitle className='mt-3'>{title}</CardTitle>
      <CardText className='text-center'>{overview.substr(0, 150)}...</CardText>

      </CardBody>
    </Card>
  );
}

export default CardFilm;