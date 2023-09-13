import { ReactNode , useEffect} from "react";
import { DogProvider, useDogContext } from '../providers/dog-context';
import { Dog } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const {
    
    
    setActiveTab,
    activeTab,
    allDogs,
    setAllDogs,
    filteredDogs,
    setFilteredDogs,
  } = useDogContext();

  const unFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
  const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);

  useEffect(() => {
    let displayedDogs = allDogs;
    displayedDogs = allDogs.filter((dog) => {
      if (activeTab === "all-dogs") return true;
      if (activeTab === "favorite-dogs") return dog.isFavorite;
      if (activeTab === "unfavorite-dogs") return !dog.isFavorite;
    });
    console.log("loading")
    setFilteredDogs(displayedDogs);
  }, [activeTab, allDogs, setFilteredDogs]);
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {favDogs.length}
          <div
            className={
              activeTab === 'favorite-dogs' ? 'selector active' : 'selector'
            }
            onClick={() => {
              activeTab === 'favorite-dogs'
                ? setActiveTab('all-dogs')
                : setActiveTab('favorite-dogs');
            }}
          >
            favorited ( {0} )
          </div>

          {unFavDogs.length}
          <div
            className={
              activeTab === 'unfavorite-dogs' ? 'selector active' : 'selector'
            }
            onClick={() => {
              activeTab === 'unfavorite-dogs'
                ? setActiveTab('all-dogs')
                : setActiveTab('unfavorite-dogs');
            }}
          >
            unfavorited ( {10} )
          </div>
          <div
            className={
              activeTab === 'create-dog-form' ? 'selector active' : 'selector'
            }
            onClick={() => {
              activeTab === 'create-dog-form'
                ? setActiveTab('all-dogs')
                : setActiveTab('create-dog-form');
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
