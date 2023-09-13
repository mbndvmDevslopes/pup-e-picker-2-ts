import { DogProvider, useDogContext } from '../providers/dog-context';
import { DogCard } from './DogCard';
import { Dog } from '../types';

// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed

  {
    const { filteredDogs, deleteDog, updateDog, isLoading } = useDogContext();

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {filteredDogs.map((doggie: Dog) => (
          <DogCard
            dog={{ ...doggie }}
            key={doggie.id}
            onTrashIconClick={() => {
              deleteDog(doggie.id);
            }}
            onHeartClick={() => {
              updateDog(doggie.id, false);
              //update isFavorite to false
            }}
            onEmptyHeartClick={() => {
              //updateisFavorite to true
              updateDog(doggie.id, true);
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  };
