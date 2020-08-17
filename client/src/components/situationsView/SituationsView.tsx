import React from 'react';
import { Situation } from '../../graphql/API';

export default ({ situations }: { situations: Situation[] }) => {
  return (
    <div>
      {situations.map(situation => (
        <div>
          <p> {situation.title}</p>
          <p> {situation.description}</p>
          <p> Fecha: {situation.from}</p>
          <p>
            Sentimientos: {situation.feelings.map(feeling => `${feeling},`)}
          </p>
          <p>Lugar: {situation.place.id} </p>

          {
            // TODO: mostrar modificador
          }
        </div>
      ))}
    </div>
  );
};
