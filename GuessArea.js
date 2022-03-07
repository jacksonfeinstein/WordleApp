import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";


import {
    guessBoxSizes,
    keyboardBoxSizes,
    numGuessAreaColumns,
    numGuessAreaRows,
    guessRowsHGap} from "../utils/sizes";

import boxStyleVariants from '../utils/keyboardAndGuessAreaBoxTypes';

const LetterBox = (props) => {

    const {boxAttributes} = props;

    return (
        <Box sx={{
           ...guessBoxSizes,
            border: 1,
            ...boxAttributes,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography  variant='h4' sx={{fontWeight: 'bold', color: boxAttributes.color }}>
                {boxAttributes.letter ? boxAttributes.letter : ''}
            </Typography>
        </Box>
    )
}


const GuessArea = (props) => {

    const {guessAreaBoxes} = props;

    return (
        <Fragment>
            <Grid  container columns={numGuessAreaColumns}//
                   sx={{
                       width: numGuessAreaColumns * guessBoxSizes.width + (numGuessAreaColumns - 1) * guessRowsHGap,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       borderRadius: 2,
                       fontFamily: 'Helvetica Neue'
                   }}
            >
            {
                guessAreaBoxes.map((elementAttributes, idx) =>
                    <Grid item
                          key={idx}
                          xs={1}
                          sx={{mb: 1}}
                    >
                        <LetterBox boxAttributes={elementAttributes}/>
                    </Grid>
                )
            }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;