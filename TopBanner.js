import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 1, mb: 1}} >
            <Typography variant='h5' sx={{
                fontWeight: 'bold', color: 'white', fontSize: 40,
                fontFamily: 'Helvetica Neue'


            }}>
                WORDLE
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;