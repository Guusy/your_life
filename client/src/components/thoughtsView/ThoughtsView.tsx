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
            <>
              <p>Titulo: {thought.title}</p>
              <p>Descripcion: {thought.description}</p>
              <p>
                Sentimientos: {thought.feelings.map(feeling => `${feeling},`)}
              </p>
              <p> Dia: {thought.date}</p>
            </>
          );
        })}
    </div>
  );
};
