import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

const MessageCenter = (props) => {

    return (
        <Fragment>
            <Typography variant='h5' sx={{
                fontSize: 30,
                height: 100,
                color: 'white',
                fontFamily: 'Helvetica Neue'

            }}
            >
                {props.message}

            </Typography>
        </Fragment>
    )
}

export default MessageCenter;