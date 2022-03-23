import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

//Simple appbar 
export default function BasicAppBar() {
    return (
        <div sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography sx={{color: 'white'}} variant="h6">
                    Status Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    );
}