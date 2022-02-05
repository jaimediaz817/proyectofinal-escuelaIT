import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Error404 = () => {
    let url = useLocation();
    return (
        <>
            <Alert severity="error" style={{ maxWidth: 920, margin: "2rem auto 0" }}>
                <AlertTitle>Error 404</AlertTitle>
                <p>Recurso</p> <i>{url.pathname}</i> <strong>No encontrado</strong>
            </Alert>
            <div style={{ margin: "1rem auto", textAlign: "center" }}>
                <Link to="/">
                    <IconButton color="primary">
                        <HomeIcon />
                    </IconButton>
                </Link>
            </div>
        </>
    );
}

export default Error404;
