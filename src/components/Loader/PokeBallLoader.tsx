import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./style.css";

export const PokeBallLoader = () => {

    return (
        createPortal(
            <div className="wrapper">
                <div className="pokeball">
                </div>
            </div>
            ,
            document.body
        )
    );
};

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
  }
  
  const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
  
  export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
      throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
  };
  
  interface LoadingProviderProps {
    children: ReactNode;
  }
  
  export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /* Ez csak mert tul gyorsan töltött, alig lehetett latni, 
    a megfelelö mukodeshez a komponensekben meg kell hivni a setLoading(false)-t */
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [isLoading]);
  
    return (
      <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
        {isLoading && <PokeBallLoader />}
        {children}
      </LoadingContext.Provider>
    );
  };

/* export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Access the isLoading state from the Redux store
  const isLoading = useSelector((state: RootState) => state.pokemons.isLoading);
 
  return (
    <div>
      {isLoading && <Loading />}
      {children}
    </div>
  );
}; */