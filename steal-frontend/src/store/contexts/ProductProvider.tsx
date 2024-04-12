import { Dispatch, FC, ReactNode, createContext, useContext } from "react";
import { ProductActionType, ProductStateType } from "../types";
import { useProductReducer } from "../reducers";

type ProductContextType = {
    productState: ProductStateType;
    productDispatch: Dispatch<ProductActionType>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { state, dispatch } = useProductReducer();

    return <ProductContext.Provider value={{ productState: state, productDispatch: dispatch }} >
        {children}
    </ProductContext.Provider>
}

const useProductContext = () => useContext(ProductContext)!;

export { ProductProvider, useProductContext }