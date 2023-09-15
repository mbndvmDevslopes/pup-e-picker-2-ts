import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
  SetStateAction,
  useEffect,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export type ActiveTab =
  | "all-dogs"
  | "favorite-dogs"
  | "unfavorite-dogs"
  | "create-dog-form";

type TDogProvider = {
  updateDog: (id: number, isFav: boolean) => void;
  deleteDog: (id: number) => void;

  filteredDogs: Dog[];

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  createDog: (dog: Omit<Dog, "id">) => Promise<unknown>;
};
export const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");

  const filteredDogs = allDogs.filter((dog) => {
    switch (activeTab) {
      case "all-dogs":
        return true;
      case "favorite-dogs":
        return dog.isFavorite;
      case "unfavorite-dogs":
        return !dog.isFavorite;
      case "create-dog-form":
        return false;
    }
  });

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false))
      .catch((error) => console.log("Error fetching dogs", error));
  };

  useEffect(() => {
    refetchData().catch((error) => console.log("Error fetching dogs", error));
  }, []);

  const updateDog = (id: number, isFav: boolean) => {
    console.log(isFav);
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === id ? { ...dog, isFavorite: isFav } : dog
      )
    );
    Requests.patchFavoriteForDog(id, isFav)
      .then((response: Response) => {
        if (!response.ok) {
          setAllDogs(allDogs);
        } else return;
      })
      .catch((error) => console.log("Error updating dog", error));
  };

  const deleteDog = (id: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== id));
    console.log(allDogs);
    Requests.deleteDogRequest(id)
      .then((response: Response) => {
        if (!response.ok) {
          setAllDogs(allDogs);
        } else return;
      })
      .then(() => refetchData())
      .catch((error) => {
        console.log("Error deleting dog", error);
      });
  };
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => {
        toast.success("A dog is created");
        refetchData().catch(() => toast.error("Error creating dog"));
      })

      .finally(() => setIsLoading(false));
  };

  return (
    <DogContext.Provider
      value={{
        filteredDogs,
        activeTab,
        setActiveTab,
        allDogs,
        setAllDogs,
        updateDog,
        deleteDog,
        setIsLoading,
        isLoading,
        createDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
export const useDogContext = () => {
 return useContext(DogContext);
};
