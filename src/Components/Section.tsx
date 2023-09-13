import { ReactNode } from "react";
import { DogProvider, useDogContext } from '../providers/dog-context';

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const {
    updateDog,
    deleteDog,
    setActiveTab,
    activeTab,
    allDogs,
    setAllDogs,
    filteredDogs,
    setFilteredDogs,
  } = useDogContext();
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
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

          {/* This should display the unfavorited count */}
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
