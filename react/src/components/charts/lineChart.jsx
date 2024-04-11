import React, {  useState, useEffect } from "react";
import { AgChartsReact } from 'ag-charts-react';
import axios from "lib/axios";


const MyResponsiveLine = () => {

 // const [data, setData] = useState(null)
  const [seriesData, setSeriesData] = useState(null);
  const [lastMarkedItem, setLastMarkedItem] = useState(0);


  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getTimeSeriesData/6617ee12a4933f5bfd011e8d');
      let graphData =  response.data.data;
      console.log("data", graphData)
      //setData(graphData)
      setLastMarkedItem(response.data.lastMarkedIndex)
      formatSeriesData(5000,response.data.lastMarkedIndex,graphData)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const moveToNext = () => {
    setLastMarkedItem( prev=> prev+1)
    let array = []
    let tempItemp = {}
    for(let i=0; i<=count; i++) {
      if(lastMarkedItem ===i) {
        tempItemp = {
          type: "line",
          xKey: "time",
          yKey: i.toString(),
          yName: i.toString(),
          stroke: "orange",
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
        }
        // array.push({
        //   type: "line",
        //   xKey: "time",
        //   yKey: i.toString(),
        //   yName: i.toString(),
        //   stroke: "orange",
        //   strokeWidth: 10,
        //   marker: {
        //     enabled: true,
        //   },
        // })
      } else {
        array.push({
          type: "line",
          xKey: "time",
          yKey: i.toString(),
          yName: i.toString(),
          strokeWidth: .5,
          strokeOpacity: .2,
          stroke: "#808080",
          marker: {
            enabled: false,
            size: 2,
            

          },
        })
      }

    }
    array.push(tempItemp)
    setOptions(prev=> prev.series = array);

  }



  const formatSeriesData = (count, lastMarkedIndex,graphData) => {
    let array = []
    let tempItemp = {}
    for(let i=0; i<=count; i++) {
      if(lastMarkedIndex ===i) {
        tempItemp = {
          type: "line",
          xKey: "time",
          yKey: i.toString(),
          yName: i.toString(),
          stroke: "orange",
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
        }
        // array.push({
        //   type: "line",
        //   xKey: "time",
        //   yKey: i.toString(),
        //   yName: i.toString(),
        //   stroke: "orange",
        //   strokeWidth: 10,
        //   marker: {
        //     enabled: true,
        //   },
        // })
      } else {
        array.push({
          type: "line",
          xKey: "time",
          yKey: i.toString(),
          yName: i.toString(),
          strokeWidth: .5,
          strokeOpacity: .2,
          stroke: "#808080",
          marker: {
            enabled: false,
            size: 2,
            

          },
        })
      }

    }
    array.push(tempItemp)
    console.log('setSeriesData', array)
    setSeriesData(array)
    let newOptions = {
    title: {
      text: "Annual Fuel Expenditure",
    },
    legend : {
      enabled: false,
    },
    data: graphData,
    series: array,
  }
    setOptions(newOptions);

  }


  const [options, setOptions] = useState({
    title: {
      text: "Annual Fuel Expenditure",
    },
    data: [],
    series: [
      {
        type: "line",
        xKey: "quarter",
        yKey: "petrol",
        yName: "Petrol",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "diesel",
        yName: "Diesel",
      },
    ],
  });
    return (
        <div className="">
            <div className="flex flex-row gap-2 m-2 px-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    TA
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    ANC
                </button>
                < button onClick={moveToNext} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    REHIT
                </button>

                <button onClick={fetchData} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Fetch Data
                </button>
            </div>
            <div className="w-[900px] h-[600px] p-2">
             <AgChartsReact options={options} />
            </div>
            <div></div>
        </div>
    );
};
export default MyResponsiveLine;
