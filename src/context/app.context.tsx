import { createContext, useContext, useState } from "react";

interface AppContextType {
  appState: IUserSignin | null,
  setAppState: (v: any) => void,
  cart: ICart | Record<string, never>,
  setCart: (v: any) => void,
}

const AppContext = createContext<AppContextType | null>(null);

export const useCurrentApp = () => {
  const currentUserContext = useContext(AppContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentApp has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
}

interface IProps {
  children: React.ReactNode
}

const AppProvider = (props: IProps) => {
  const [appState, setAppState] = useState<IUserSignin | null>(null)
  const [cart, setCart] = useState<ICart | Record<string, never>>({})

  return (
    <AppContext.Provider value={{ appState, setAppState, cart, setCart }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
