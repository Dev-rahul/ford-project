import React, {  useState, useEffect } from "react";
import { AgChartsReact } from 'ag-charts-react';
import axios from "lib/axios";
import {XYPlot, LineSeries, } from 'react-vis';


const MyResponsiveLine = () => {

  const [data, setData] = useState([])
  const [seriesData, setSeriesData] = useState([]);
  const [lastMarkedItem, setLastMarkedItem] = useState(0);


  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getTimeSeriesData/6617ee12a4933f5bfd011e8d');
      let graphData =  response.data.data;
      console.log("data", graphData)
      setData(graphData)
      setLastMarkedItem(response.data.lastMarkedIndex)
      formatSeriesData(5000,response.data.lastMarkedIndex,graphData)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const moveToNext = () => {
    let array = []
    for(let i=0; i<=5000; i++) {
     if(i%10 === 0){
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

    array.push( {
      type: "line",
      xKey: "time",
      yKey: (lastMarkedItem+1).toString(),
      yName: (lastMarkedItem+1).toString(),
      stroke: "orange",
      strokeWidth: 2,
      marker: {
        enabled: false,
      },
    })

    let newOptions = {
      title: {
        text: "Annual Fuel Expenditure",
      },
      legend : {
        enabled: false,
      },
      data: data,
      series: array,
    }
    setLastMarkedItem( prev=> prev+1)
    setOptions(newOptions);

  }



  const formatSeriesData = (count, lastMarkedIndex,graphData) => {
    let array = []
    
    for(let i=0; i<=count; i++) {
 
       if(i%10 === 0){
        array.push({
          type: "line",
          xKey: "time",
          yKey: i.toString(),
          yName: i.toString(),
          strokeWidth: 1,
          strokeOpacity: .4,
          stroke: "#808080",
          marker: {
            enabled: false,
            size: 2,
            

          },
        })
      }

    }
    array.push( {
      type: "line",
      xKey: "time",
      yKey: lastMarkedIndex.toString(),
      yName: lastMarkedIndex.toString(),
      stroke: "orange",
      strokeWidth: 2,
      marker: {
        enabled: false,
      },
    })
    console.log('setSeriesData', graphData)
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
             {/* <XYPlot height={600} width={700}> */}
              {/* {data.map((item, index)=> (
                  index%50 === 0 ?<LineSeries curve={null} key={index} data={item} opacity={.1}
                  stroke="#B2BEB5" strokeStyle="solid" />: null
              ))} */}
              {/* <LineSeries key={lastMarkedItem} data={data[lastMarkedItem]} opacity={1}
                  stroke="#FF0000" strokeStyle="solid"  strokeWidth="5px" />
             
             </XYPlot> */}

            </div>
            <div></div>
        </div>
    );
};
export default MyResponsiveLine;
