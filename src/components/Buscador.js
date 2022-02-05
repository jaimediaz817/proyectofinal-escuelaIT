// import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "35px",
        marginBottom: "35px",
        "& > *": {
            margin: theme.spacing(0),
            width: "auto"
        }        
    },
    button: {
        width: "40px"
    }
}));

const Buscador = ({ search, setSearch, setError }) => {

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();        
        setSearch({
            artist: e.target.artist.value,
            song: e.target.song.value,
            request: true
        });

        console.log("searching")
    }

    const handleReset = (e) => {
        setSearch({
            artist: "",
            song: "",
            request: false
        });

        setError(false);
    }    

    return (
        
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            
            autoComplete="on"
            className={classes.root}
            onSubmit={ handleSubmit }
            onReset={ handleReset }
        >
            <IconButton color="primary" type="reset" style={{ width: "40px" }}>
                <HomeIcon />
            </IconButton>

            <TextField 
                id="artist" 
                name="artist" 
                label="Artista" 
                variant="outlined" 
                size="small" 
                required
                value={search.artist}
                onChange={e => {
                    setSearch({
                        ...search,
                        artist: e.target.value,
                        request: false
                    })
                }}
            />
            <TextField 
                id="song" 
                name="song" 
                label="Canción" 
                variant="outlined" 
                size="small" 
                required 
                value={search.song}
                onChange={e => {
                    setSearch({
                        ...search,
                        song: e.target.value,
                        request: false
                    })
                }}                
            />

            <IconButton color="primary" type="submit" style={{ width: "40px" }}>
                <SearchIcon />
            </IconButton>
        </Box>        
    );
}

export default Buscador;
