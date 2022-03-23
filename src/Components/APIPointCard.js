import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from "axios";

// Refresh interval in milliseconds
const API_INTERVAL = 15000;

//Format unix timestamp to 24 hour format
function formatDate(unixDate) {
  let date = new Date(unixDate);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let timestamp = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return timestamp;
}

export default function APICard(props) {
  const [data, setData] = useState({
    status: 'Error', color: 'Red', serviceName: props.name.toUpperCase(), timestamp: '', hostname: '', errorStatus: '', errorMessage: ''}
  );

  useEffect(() => {
    const getAPIData = async () => {
      try {
        const response = await axios.get(`${props.name}/health/status`);
        setData({...data, status: "Healthy", color: "Green", hostname: response.data.hostname, timestamp: formatDate(response.data.time)})
      } catch (error) {
        console.log(error.response)
        setData({...data, status: "Error", color: "Red", hostname: "", timestamp: "", errorStatus: error.response.status, errorMessage: error.response.statusText})
      }
    }

    //running the api call on first render/refresh
    getAPIData();
    
    //running the api call every 15 seconds
    const interval = setInterval(() => {
      getAPIData()
    }, API_INTERVAL) ;
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card sx={{minHeight: "180px", width: '100%'}} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.serviceName}
        </Typography>
        <Typography
          style={{ color: "White", backgroundColor: data.color }}
          color="textSecondary"
        >
          {data.status}
        </Typography>
        <Typography variant="body2" component="p">
          {data.hostname}
        </Typography>
        <Typography variant="body2" component="p">
          {data.timestamp}
        </Typography>
        {/* On Error/Outage display outage message */}
        {data.status === "Error" ? (
          <div>
            <Typography style={{ color: "Red" }} variant="h6" component="p">
              OUTAGE
            </Typography>
            <Typography style={{ color: "Red" }} variant="body2" component="p">
              {data.errorStatus}
            </Typography>
            <Typography style={{ color: "Red" }} variant="body2" component="p">
              {data.errorMessage}
            </Typography>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}