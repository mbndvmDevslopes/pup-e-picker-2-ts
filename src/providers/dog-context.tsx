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
  setFilteredDogs: Dispatch<SetStateAction<Dog[]>>;
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
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>(allDogs);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .finally(() => setIsLoading(false))
      .catch((error) => console.log("Error fetching dogs", error));
  };

  useEffect(() => {
    Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .catch((error) => console.log("Error fetching dogs", error));
  }, []);

  const updateDog = (id: number, isFav: boolean) => {
    setIsLoading(true);
    Requests.patchFavoriteForDog(id, isFav).finally(() => {
      refetchData().catch((error) => console.log("Error fetching dogs", error));
      setIsLoading(false);
    });
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);

    Requests.deleteDogRequest(id)
      .then(() => refetchData())
      .catch((error) => {
        console.log("Error deleting dog", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => {
        toast.success("A dog is created");
        refetchData().catch((error) =>
          console.log("Error fetching dogs", error)
        );
      })
      .catch((error) => console.log("Error creating dog", error))
      .finally(() => setIsLoading(false));
  };
return (

  <DogContext.Provider
    value={{
      filteredDogs,
      setFilteredDogs,
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
)
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
