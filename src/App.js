
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Error404 from './pages/Error404';
import Cancion from './pages/Cancion';
import Home from './pages/Home';
import { Fragment, useEffect, useState } from 'react';
import Buscador from './components/Buscador';
import LetraCancion from './components/LetraCancion';
import Listacanciones from './components/ListaCanciones';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Loader from './components/Loader';
import { Alert, AlertTitle } from '@mui/material';

function App() {

    // variables de estado
    let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || []
    let searchInit = {
        artist: "",
        song: "",
        request: false
    };

    const [mySongs, setMySongs] = useState(mySongsInit);
    const [search, setSearch] = useState(searchInit);
    const [currentSong, setCurrentSong] = useState({});
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    // Efectos
    useEffect(() => {
        
        // ingresar a la LocalStorage
        localStorage.setItem("mySongs", JSON.stringify(mySongs));

        // fn para consultar a la API
        const getData = async () => {
            const {
                artist,
                song
            } = search;

            // Intentando conexión
            try {                
                //
                setLoading(true);

                let artistAPI  = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`,
                    songAPI    = `https://api.lyrics.ovh/v1/${artist}/${song}`,
                    artistRes  = await fetch(artistAPI),
                    songRes    = await fetch(songAPI),
                    artistJSON = await artistRes.json(),
                    songJSON   = await songRes.json();

                console.log(artistJSON, songJSON);

                // Setear información
                setCurrentSong({
                    artist: artistJSON.artists[0].strArtist,
                    avatar: artistJSON.artists[0].strArtistThumb,
                    song: song.replace,
                    lyrics: songJSON.lyrics
                });

                setLoading(false);

            } catch (error) {
                console.log("error >>> ", error);
                setSearch({
                    artist: artist,
                    song: song,
                    request: false
                });

                setError(true);
                setLoading(false);
            }
        }

        if (!search.request) {
            return;
        } else {
            getData();
        }

    }, [search]);

    return (
        <Router basename="/">            
            <CssBaseline>
                <div className="App">
                    <Header />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Routes>                                    
                                    <Route 
                                        exact 
                                        path="/" 
                                        element={
                                            <Fragment>
                                                <Buscador 
                                                    search={search}
                                                    setSearch={setSearch} 
                                                    setError={setError}
                                                />                     
                                                <Listacanciones 
                                                    mySongs={mySongs}
                                                    setMySongs={setMySongs}
                                                />    
                                                {
                                                    !search.request ? (
                                                        error ? (
                                                            <Alert severity="error" style={{ maxWidth: "100%", margin: "2rem auto 0" }}>
                                                                <AlertTitle>Error al intentar traer canciones</AlertTitle>
                                                                <p>Intente buscar nuevamente</p>
                                                            </Alert>
                                                        ):(
                                                            <div>test cuando no hay error, array current vacio</div>
                                                        )
                                                    ):(
                                                        loading ? (
                                                            <Loader />
                                                        ):(
                                                            <LetraCancion 
                                                                currentSong={currentSong}
                                                                setCurrentSong={setCurrentSong}
                                                                mySongs={mySongs}
                                                                setMySongs={setMySongs}
                                                                setSearch={setSearch}
                                                            />
                                                        )
                                                    )
                                                }
                                            </Fragment>                                        
                                        }/>                                    

                                    <Route exact path="/cancion/:id" element={<Cancion mySongs={mySongs} />} />
                                    <Route path="*" element={<Error404/>} />
                                </Routes>      
                            </Grid>                         
                        </Grid>
                    </Box>
                </div>                    
            </CssBaseline>            
        </Router>
    );
}

export default App;
