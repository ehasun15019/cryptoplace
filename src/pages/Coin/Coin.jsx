import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';

const Coin = () => {

  // useParams used for page id and coinId is giving in App.jsx
  const {coinId} = useParams();

  // this state is for showing Cion Data start
  const [coinData, setCoinData] = useState();

  // ------ currency come from Context Folder ------
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async() => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

    const options = {
      method: 'GET',
      headers: {'x-cg-demo-api-key': '	CG-Anre2dMZiPWMESe4mDgZwDZh'},
      body: undefined
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCoinData();
  }, [currency])
   // this state is for showing Cion Data end


   if(coinData) {
      return (
        <div className='coin'>
          <div className="coinName">
            <img src={coinData.image.large} alt={coinData.name} />

            <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
          </div>
        </div>
      )
   } else {
     return (
        <div className='spinner'>
          <div className="spin"></div>
        </div>
      )
   }

}

export default Coin