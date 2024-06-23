import { HashLoader } from "react-spinners";
import { CSSProperties, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const override: CSSProperties = {
    display: "block",
};

const containerStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}
export const Loading = () => {

    return (
        createPortal(
            <div className={"loading-container"} style={containerStyle}>
                <HashLoader
                    color={"#9EE8E1"}
                    loading={true}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
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
    a megfelelö mukodeshet a komponensekben meg kell hivni a setLoading(false)-t */
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [isLoading]);
  
    return (
      <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
        {isLoading && <Loading />}
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
