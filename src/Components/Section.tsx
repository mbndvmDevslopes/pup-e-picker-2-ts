import { ReactNode } from "react";
import { useDogContext } from '../providers/useDogContext';
import { Dog } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { setActiveTab, activeTab, allDogs } = useDogContext();

  const unFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
  const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={
              activeTab === "favorite-dogs" ? "selector active" : "selector"
            }
            onClick={() => {
              activeTab === "favorite-dogs"
                ? setActiveTab("all-dogs")
                : setActiveTab("favorite-dogs");
            }}
          >
            favorited ( {favDogs.length})
          </div>

          <div
            className={
              activeTab === "unfavorite-dogs" ? "selector active" : "selector"
            }
            onClick={() => {
              activeTab === "unfavorite-dogs"
                ? setActiveTab("all-dogs")
                : setActiveTab("unfavorite-dogs");
            }}
          >
            unfavorited ( {unFavDogs.length})
          </div>
          <div
            className={
              activeTab === "create-dog-form" ? "selector active" : "selector"
            }
            onClick={() => {
              activeTab === "create-dog-form"
                ? setActiveTab("all-dogs")
                : setActiveTab("create-dog-form");
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
