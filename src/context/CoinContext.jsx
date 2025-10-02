import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    // api store state
    const [allCoin, setAllCoin] = useState([]);

    // Currency State
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })


    // api data loading
    const fetchAllCoin = async() => {
        // make it dynamic with currency state   
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`;
        
        const options = {
            method: 'GET',
            headers: {'x-cg-demo-api-key': 'CG-Anre2dMZiPWMESe4mDgZwDZh'},
            body: undefined
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            // data passing on setAllCoin state
            setAllCoin(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAllCoin();
    }, [currency])


    const ContextValue = {
        allCoin, currency, setCurrency
    }

    return(
        <CoinContext.Provider value={ContextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;