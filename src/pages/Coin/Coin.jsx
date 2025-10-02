import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

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
   // this state is for showing Cion Data end

  //  this state is for historical data start 
  const [historicalData, setHistoricalData] = useState();

  const fetchHistoricalData = async() => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;

    const options = {
      method: 'GET',
      headers: {'x-cg-demo-api-key': '	CG-Anre2dMZiPWMESe4mDgZwDZh'},
      body: undefined
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error(error);
    }
  }
  //  this state is for historical data end 
  
  useEffect(() => {
      fetchCoinData();
      fetchHistoricalData()
  }, [currency])

   if(coinData && historicalData) {
      return (
        <div className='coin'>
          <div className="coinName">
            <img src={coinData.image.large} alt={coinData.name} />

            <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
          </div>

          <div className="coinChart">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="coinInfo">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>

            <ul>
              <li>Current Price</li>
              <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>

            <ul>
              <li>Market Cap</li>
              <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>

            <ul>
              <li>24 Hour high</li>
              <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>

            <ul>
              <li>24 Hour Low</li>
              <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
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