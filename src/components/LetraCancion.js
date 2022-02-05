import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import addCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import Icon from '@mui/material/Icon';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 800,
        margin: "0 auto",
        width: "100%"
    },
    lyrics: {
        whiteSpace: "pre-wrap!important"
    },
    title: {
        marginBottom: "3rem !important"
    },
    media: {
        backgroundSize: "cover",
        height: "50vh"
    },
    addBtn: {
        justifyContent: "flex-end"
    }
}));

const Letracancion = ({
    currentSong,
    setCurrentSong,
    mySongs,
    setMySongs,
    setSearch
}) => {

    const handleClick = (e) => {
        // click
        e.preventDefault();
        setMySongs(mySongs => [...mySongs, currentSong]);

        setSearch({
            artist: "",
            song: "",
            request: false
        });

        // Limpiar
        setCurrentSong({});
    }

    const classes = useStyles();

    return (
        <Card className={classes.root} >
            <CardMedia
                className={classes.media}
                image={currentSong.avatar}
                title={currentSong.artist}
            />
            <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    className={classes.title}
                >
                    {currentSong.artist} - {currentSong.song}
                </Typography>
                <Typography 
                    gutterBottom 
                    variant="body2" 
                    color="textSecondary"
                    component="p" 
                    className={classes.lyrics}
                >
                    {currentSong.lyrics}
                </Typography>
            </CardContent>
            <CardActions className={classes.addBtn}>
                <Button 
                    variant="contained" 
                    endIcon={<SaveIcon />}
                    onClick={ handleClick }
                >
                    Guardar
                </Button>                
            </CardActions>            
        </Card>
    );
}

export default Letracancion;
