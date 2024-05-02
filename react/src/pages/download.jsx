import React, { useState, useEffect } from "react";
import AppLayout from "components/Layouts/AppLayout";
import axios from "lib/axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const Download = () => {
    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

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
    const handleChange = (event) => {
        setSelectedFile(event.target.value);
    };

    const handleFileDownload = async () => {
        try {
            const response = await axios.post("/api/export",{responseType: "blob", file: selectedFile});
            console.log("File uploaded successfully:", response.data);
            const href = URL.createObjectURL(response.data);
            var binaryData = [];
binaryData.push(data);
            const url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})); // you can mention a type if you wish
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "dummy.docx"); //this is the name with which the file will be downloaded
        link.click();
        // no need to append link as child to body.
        setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
        // setDownload(false);

        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full h-full">
                            <div class="mb-3 p-6 w-[600px] h-[800px] ">
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
                                                    fileList.map(
                                                        (item, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={item._id}
                                                            >
                                                                {item.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Button
                                        onClick={handleFileDownload}
                                        disabled={!selectedFile}
                                        variant="contained"
                                    >
                                       Export Data 
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Download;
