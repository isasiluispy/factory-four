import React from 'react'
import APIPointCard from './APIPointCard';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function CardContainer(props) {
    const serviceCardList = props.data.map(name => {
        return (
            <Grid key={name} sm={4} md={3} lg={2} item>
                <Paper elevation={10}>
                    <APIPointCard name={name} />
                </Paper>
            </Grid>
        );
    })

    return (
        <Grid
            container
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid container alignItems="flex-start" item xs={11} style={{marginTop:'10vh',minHeight: "100vh"}}>
                <Grid container justifyContent="center" spacing={4}>
                    {serviceCardList}
                </Grid>
            </Grid>
        </Grid>
    );
}