import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import axios from "lib/axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const MyResponsiveLine = () => {
    const [data, setData] = useState([]);
    const [seriesData, setSeriesData] = useState([]);
    const [lastMarkedItem, setLastMarkedItem] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [idArray, setIdArray] = useState([]);

    const [age, setAge] = React.useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchFileList();
    }, []);

    const fetchFileList = async () => {
        try {
            const response = await axios.get("/api/getExcelData");
            setFileList(response.data.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const markData = async (id, label) => {
        try {
            const response = await axios.post("/api/update_label", {
                _id: id,
                label: label,
            });
            console.log(markData, response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleChange = (event) => {
        setSelectedFile(event.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "/api/getTimeSeriesData/" + selectedFile
            );
            let graphData = response.data.data;
            console.log("data", graphData);
            setData(graphData);
            setIdArray(response.data.idArray);
            setLastMarkedItem(response.data.lastMarkedIndex);
            formatSeriesData(5000, response.data.lastMarkedIndex, graphData);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const moveToNext = (label) => {
        markData(idArray[lastMarkedItem], label);
        const newItem = lastMarkedItem + 1
        let array = [];
        for (let i = 0; i <= 5000; i++) {
            if (i % 10 === 0) {
                array.push({
                    type: "line",
                    xKey: "time",
                    yKey: i.toString(),
                    yName: i.toString(),
                    strokeWidth: 1,
                    strokeOpacity: 0.4,
                    stroke: "#808080",
                    marker: {
                        enabled: false,
                        size: 2,
                    },
                });
            }
        }

        array.push({
            type: "line",
            xKey: "time",
            yKey: newItem.toString(),
            yName: newItem.toString(),
            stroke: "orange",
            strokeWidth: 2,
            marker: {
                enabled: false,
            },
        });

        let newOptions = {
            title: {
                text: 'Observation : ' + newItem,
            },
            legend: {
                enabled: false,
            },
            data: data,
            series: array,
        };
        setLastMarkedItem((prev) => prev + 1);
        setOptions(newOptions);
    };

    const UndoMarking = (label) => {
      markData(idArray[lastMarkedItem], label);
      const newItem = lastMarkedItem - 1
      let array = [];
      for (let i = 0; i <= 5000; i++) {
          if (i % 10 === 0) {
              array.push({
                  type: "line",
                  xKey: "time",
                  yKey: i.toString(),
                  yName: i.toString(),
                  strokeWidth: 1,
                  strokeOpacity: 0.4,
                  stroke: "#808080",
                  marker: {
                      enabled: false,
                  },
              });
          }
      }

      array.push({
          type: "line",
          xKey: "time",
          yKey: newItem.toString(),
          yName: newItem.toString(),
          stroke: "orange",
          strokeWidth: 2,
          marker: {
              enabled: false,
          },
      });

      let newOptions = {
          title: {
              text: 'Observation : ' + newItem,
          },
          legend: {
              enabled: false,
          },
          data: data,
          series: array,
      };
      setLastMarkedItem((prev) => prev - 1);
      setOptions(newOptions);
  };

    const formatSeriesData = (count, lastMarkedIndex, graphData) => {
        let array = [];

        for (let i = 0; i <= count; i++) {
            if (i % 10 === 0) {
                array.push({
                    type: "line",
                    xKey: "time",
                    yKey: i.toString(),
                    yName: i.toString(),
                    strokeWidth: 1,
                    strokeOpacity: 0.4,
                    stroke: "#808080",
                    marker: {
                        enabled: false,
                    },
                });
            }
        }
        array.push({
            type: "line",
            xKey: "time",
            yKey: lastMarkedIndex.toString(),
            yName: lastMarkedIndex.toString(),
            stroke: "orange",
            strokeWidth: 2,
            marker: {
                enabled: false,
            },
        });
        console.log("setSeriesData", graphData);
        setSeriesData(array);
        let newOptions = {
            title: {
                text: "Observation : " + lastMarkedIndex,
            },
            legend: {
                enabled: false,
            },
            data: graphData,
            series: array,
        };
        setOptions(newOptions);
    };

    const [options, setOptions] = useState({
        title: {
            text: "Loading Data....",
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
            <div className="flex flex-row w-full p-2 gap-2 mt-6">
                <Box sx={{ minWidth: 350 }}>
                    <FormControl fullWidth className="">
                        <InputLabel id="demo-simple-select-label">
                            Select an excel file
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            className="mt-2"
                            // label='Select the excel file'
                            value={selectedFile}
                            onChange={handleChange}
                        >
                            {fileList &&
                                fileList.map((item, index) => (
                                    <MenuItem key={index} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    onClick={fetchData}
                    disabled={!selectedFile}
                    variant="contained"
                >
                    Fetch Data
                </Button>
            </div>
            <div className="flex justify-between  m-2 px-4">
              <div className="flex flex-row  gap-2">
              <button
                    onClick={() => moveToNext("1")}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Normal
                </button>
                <button
                    onClick={() => moveToNext("2")}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    TA
                </button>
                <button
                    onClick={() => moveToNext("3")}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    ANC
                </button>
                <button
                    onClick={() => moveToNext("-1")}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    REHIT
                </button>

              </div>

               <button
                    onClick={() => UndoMarking("-1")}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Undo
                </button>
            </div>
            <div >
              {idArray.length> 0 ? <AgChartsReact options={options} /> : null}
                
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
