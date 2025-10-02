import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      let formattedData = [["Date", "Price"]];
      
      historicalData.prices.forEach(([timestamp, price]) => {
        formattedData.push([
          new Date(timestamp).toLocaleDateString("en-US", {
            month: "short", // Sep, Oct
            day: "numeric", // 1, 2, 3
          }),
          price, 
        ]);
      });

      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        title: "Price Chart (Last 10 Days)",
        legend: { position: "bottom", textStyle: { fontSize: 12 } },
        hAxis: { 
          title: "Date",
          textStyle: { fontSize: 10 },
          slantedText: true,
          slantedTextAngle: 45
        },
        vAxis: { 
          title: "Price",
          textStyle: { fontSize: 12 }
        },
        titleTextStyle: { fontSize: 14 },
        colors: ["#1e88e5"]
      }}
    />
  );
};

export default LineChart;
