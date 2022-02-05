import React, {Fragment} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Alert, AlertTitle, IconButton, ListItemSecondaryAction } from '@mui/material';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';

const Listacanciones = ({
    mySongs,
    setMySongs
}) => {

    const handleDelteSong = id => {
        alert("borrando canción" + id)
        let songs = mySongs.filter((el, index) => index !== id);
        setMySongs(songs);
        localStorage.setItem("mySongs", JSON.stringify(songs));
    }

    return (
        (mySongs.length === 0) ? (
            <Alert severity="error" style={{ maxWidth: "100%", margin: "2rem auto 0" }}>
                <AlertTitle>No existen canciones</AlertTitle>
                <p>Debe agregar canciones</p>
            </Alert>
        ) : (
            <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                {
                    mySongs.map((song, item) => (
                        <Fragment>
                            <ListItem key={item} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={song.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    
                                    primary={song.artist}
                                    secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        { song.lyrics && song.lyrics.slice(0, 200)}...
                                    </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton 
                                        edge="end"
                                        component={Link}
                                        to={`/cancion/${item}`}
                                    >
                                        <LaunchIcon />
                                    </IconButton>
                                    <IconButton 
                                        edge="end"
                                        onClick={() => handleDelteSong(item)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))
                }
            </List>
        )
    );
}

export default Listacanciones;
