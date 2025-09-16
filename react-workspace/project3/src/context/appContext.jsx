import { createContext } from "react"

export const AppContext = createContext();

const ContextProvider = (props) => {

    const phone = '+234 9133891021'
    const name = 'Osayemi'

    return(
        <AppContext.Provider value={{phone, name}}>
            {props.children}
        </AppContext.Provider>
    )
}
export default ContextProvider