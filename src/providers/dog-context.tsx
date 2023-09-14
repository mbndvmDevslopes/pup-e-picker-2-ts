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
  createDog: (dog: Omit<Dog, "id">) => void;
};
const DogContext = createContext<TDogProvider>({} as TDogProvider);

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
    return (
      Requests.getAllDogs()
        /* .then((dogs) => setAllDogs(dogs)) */
        .then(setAllDogs)
        .finally(() => setIsLoading(false))
        .catch((error) => console.log("Error fetching dogs", error))
    );
  };

  /* useEffect(() => {
    Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .catch((error) => console.log("Error fetching dogs", error));
  }, []);
 */
  useEffect(() => {
    refetchData().catch((error) => console.log("Error fetching dogs", error));
  }, []);
  /*  const updateDog = (id: number, isFav: boolean) => {
    setIsLoading(true);
    Requests.patchFavoriteForDog(id, isFav).finally(() => {
      refetchData().catch((error) => console.log("Error fetching dogs", error));
      setIsLoading(false);
    });
  }; */

  /*  const addBookMarkForArticle = (articleId: number) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId ? { ...article, isBookmarked: true } : article
      )
    );
    updateArticle(articleId, { isBookmarked: true }).then((response) => {
      if (!response.ok) {
        setArticles(articles);
      } else return;
    });
  }; */
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
  /* const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => {
        toast.success("A dog is created");
        refetchData().catch(() => toast.error("Error creating dog"));
      })
      .catch((error) => console.log("Error creating dog", error))
      .finally(() => setIsLoading(false));
  }; */
  const createDog = (dog: Omit<Dog, "id">) => {
    // Optimistically add the new dog to the allDogs list
    const updatedAllDogs = [...allDogs, { ...dog, id: Date.now() }];
    setAllDogs(updatedAllDogs);
  
    setIsLoading(true);
    
    Requests.postDog(dog)
      .then(() => {
        toast.success("A dog is created");
      })
      .catch((error) => {
        // Revert the change if there's an error
        setAllDogs(allDogs);
        toast.error("Error creating dog");
        console.log("Error creating dog", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
export const useDogContext = () => useContext(DogContext);
/*import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Article = {
  id: number;
  title: string;
  content: string;
  isBookmarked: boolean;
};

type TArticleProvider = {
  articles: Article[];
  addBookMarkForArticle: (id: number) => void;
  removeBookMark: (id: number) => void;
  isLoading: boolean;
};

const updateArticle = (id: number, body: Partial<Article>) =>
  fetch(`http://localhost:3000/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

const ArticlesContext = createContext<TArticleProvider>({} as TArticleProvider);

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading] = useState(false);

  const refetch = () =>
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then(setArticles);

  useEffect(() => {
    refetch();
  }, []);

  const addBookMarkForArticle = (articleId: number) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId ? { ...article, isBookmarked: true } : article
      )
    );
    updateArticle(articleId, { isBookmarked: true }).then((response) => {
      if (!response.ok) {
        setArticles(articles);
      } else return;
    });
  };

  const removeBookMark = (articleId: number) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId ? { ...article, isBookmarked: false } : article
      )
    );
    updateArticle(articleId, { isBookmarked: false }).then((response) => {
      if (!response.ok) {
        setArticles(articles);
      } else return;
    });
  };
  return (
    <ArticlesContext.Provider
      value={{
        isLoading,
        addBookMarkForArticle,
        removeBookMark,
        articles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);*/
