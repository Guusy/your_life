import React from 'react';
import Thought from '../../domain/Thought';

interface ThoughtsViewProps {
  thoughts: Thought[];
}
export default ({ thoughts }: ThoughtsViewProps) => {
  return (
    <div>
      {thoughts &&
        thoughts.map(thought => {
          return (
            <div
              style={{
                border: '1px solid black',
                marginTop: '1em',
                padding: '1em'
              }}
            >
              <p>Titulo: {thought.title}</p>
              <p>Descripcion: {thought.description}</p>
              <p>
                Sentimientos: {thought.feelings.map(feeling => `${feeling},`)}
              </p>
              {thought.date && <p> Dia: {thought.date}</p>}
            </div>
          );
        })}
    </div>
  );
};
