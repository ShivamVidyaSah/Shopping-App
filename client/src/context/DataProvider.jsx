
//Context lets components pass information deep down without explicitly passing props. 
// Call createContext outside any components to create one or more contexts. By default, 
// the values they receive will be the default values you have specified when creating the contexts.
import {createContext, useState} from "react";

export const DataContext = createContext(null);
//This DataContext will be imported in the Login.jsx and used in CreatePost.jsx as well

const DataProvider = ({children}) =>{
    //creating a state to tore the account information succh as username and name
    // we are setting the initial state to blank 
    const [ account, setAccount ] = useState({ username:'', email:''})

    return (
        //The use of <> (angle brackets) when writing <DataContext.Provider> is because it's a JSX (JavaScript XML) element in React.
        <DataContext.Provider value = {{
            account,
            setAccount
        }}>
            {children} {/*here we have to display whatever we have passed in the parameter */}
        </DataContext.Provider>
    )
}

export default DataProvider;
// Remember that we have to wrap the component with the context in which we want to use the
// context/ From here we will go to App.js