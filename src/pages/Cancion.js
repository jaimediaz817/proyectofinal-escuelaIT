import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';

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

const Cancion = ({mySongs}) => {

    let {id} = useParams();
    let song = mySongs[id];

    const classes = useStyles();

    return (
        <Card className={classes.root} >
            <CardMedia
                className={classes.media}
                image={song.avatar}
                title={song.artist}
            />
            <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    className={classes.title}
                >
                    {song.artist} - {song.song}
                </Typography>
                <Typography 
                    gutterBottom 
                    variant="body2" 
                    color="textSecondary"
                    component="p" 
                    className={classes.lyrics}
                >
                    {song.lyrics}
                </Typography>
            </CardContent>
            <CardActions className={classes.addBtn}>
                <Button 
                    variant="contained" 
                    endIcon={<HomeIcon />}
                    to={`/`}
                    component={ Link }
                >
                    Regresar
                </Button>                
            </CardActions>            
        </Card>
    );
}

export default Cancion;
