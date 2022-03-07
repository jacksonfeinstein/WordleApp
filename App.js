import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';


import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";

import {
    numGuessAreaRows,
    numGuessAreaColumns, guessBoxSizes
} from "./utils/sizes";
import boxStyleVariants from './utils/keyboardAndGuessAreaBoxTypes';
let words = require('./tsconfig.json');



const completedRows = [];
const remainingRows = new Array((numGuessAreaRows - 1) * numGuessAreaColumns).fill(boxStyleVariants.blankBox);
let gameOver = false;

const randomWord = words[Math.floor(Math.random() * words.length)];

let testString = randomWord.toUpperCase();
console.log(testString)


function App() {



    const  demoKeys = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const initialKeyBoard = () => { // need to update

        let keys = demoKeys.split("").map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))



        const backspaceKey = {
            ...boxStyleVariants.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
            width: 70,
            letter: 'Delete',
            isBackspaceKey: true
        }
        const enterKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            width: 70,
            letter: 'Enter',
            isEnterKey: true
        }
        function insertAt(array, index, ...elements){
            array.splice(index, 0, ...elements);
        }

        insertAt(keys, 20, enterKey);
        keys.push(backspaceKey);

        return keys;
    }
     /// pull in random word from file
    const testWord = testString.split("");




    const [activeRow, setActiveRow] = useState(new Array(numGuessAreaColumns).fill(boxStyleVariants.blankBox));
    const [activeRowIdx, setActiveRowIdx] = useState(0);  // the index of the first letter that gets added to the active row.
    const [keyboard, setKeyboard] = useState(initialKeyBoard);
    const [message, setMessage] = useState('');



    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];


    const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {

        if(gameOver === true){
            return
        }


        console.log(`attributes of the key that was just clicked is ${JSON.stringify(attrsOfKeyThatUserClicked)}`);

        if(activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
            return; // activeRow is empty as such, there are no letters to erase.
        }
        if(attrsOfKeyThatUserClicked.isBackspaceKey) { // this is delete key functions
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
            setActiveRow(newActiveRow);
            setActiveRowIdx(activeRowIdx - 1);
            return;
        }

        if(activeRowIdx === numGuessAreaColumns && attrsOfKeyThatUserClicked.isEnterKey) { // implement logic for enter key
            /// Check if the word is a match
            let currWord = []

            for (let i = 0;  i < 5; i++) {
                currWord.push(activeRow[i].letter);
            }
            currWord = currWord.join('');

            if(remainingRows.length === 0 && currWord !== testString){
                setMessage(`You Lost :( the word was: ${testString}`);
                gameOver = true;
            }

            if(currWord === testString){ // this works dont fuck with it
                setMessage('You Win :)');
                gameOver = true;
            }


    /// feedback boxes
            for (let i = 0;  i < 5; i++){
                if(activeRow[i].letter === testWord[i]){
                    activeRow[i] = {... boxStyleVariants.exactMatch , letter: activeRow[i].letter}
                    const matchKey = keyboard.find(keyboard => keyboard.letter === activeRow[i].letter)
                    const keyIdx = keyboard.indexOf(matchKey)

                    keyboard[keyIdx] = {... boxStyleVariants.exactMatch , letter: keyboard[keyIdx].letter};
                    completedRows.push(activeRow[i]);

                    testWord[i] = '1';
                    remainingRows.pop();

                }
                else if(testWord.includes(activeRow[i].letter)){ // fix to no allow multiple of the same
                    activeRow[i] = {... boxStyleVariants.partialMatch , letter: activeRow[i].letter};
                    const letterIdx = testWord.indexOf(activeRow[i].letter);
                    testWord[letterIdx] = '1';
                    const matchKey = keyboard.find(keyboard => keyboard.letter === activeRow[i].letter)
                    const keyIdx = keyboard.indexOf(matchKey)

                    if(keyboard[keyIdx].backgroundColor === "#bfc1c2" || keyboard[keyIdx].backgroundColor === "#9e9e9e" ) {
                        keyboard[keyIdx] = {...boxStyleVariants.partialMatch, letter: keyboard[keyIdx].letter};
                    }

                    completedRows.push(activeRow[i]);
                    remainingRows.pop();
                }
                else{

                    activeRow[i] = {... boxStyleVariants.noMatch , letter: activeRow[i].letter};
                    const matchKey = keyboard.find(keyboard => keyboard.letter === activeRow[i].letter)
                    const keyIdx = keyboard.indexOf(matchKey)
                   if(keyboard[keyIdx].backgroundColor === "#bfc1c2") {
                       keyboard[keyIdx] = {...boxStyleVariants.noMatch, letter: keyboard[keyIdx].letter};
                   }

                    completedRows.push(activeRow[i]);
                    remainingRows.pop();
                }
            }


            if(gameOver === true && completedRows.length === 30) {

                const finalActiveRow = [];
                setActiveRow(finalActiveRow);
                setActiveRowIdx(0);

                return;
            }

                const newActiveRow = new Array(numGuessAreaColumns).fill(boxStyleVariants.blankBox);
                setActiveRow(newActiveRow);
                setActiveRowIdx(0);

            return;


        }
        if(attrsOfKeyThatUserClicked.isEnterKey) {
            // ignore the enter key as there are not enough letters in activeRow
            return;
        }

        if(activeRowIdx === numGuessAreaColumns) {
            // activeRow is already full.
            return;
        }

        if(gameOver === true){
            return
        }
        const newActiveRow = activeRow.slice();
        newActiveRow[activeRowIdx] = { ...boxStyleVariants.notEvaluated, letter: attrsOfKeyThatUserClicked.letter};
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx + 1);
    }


    return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 700,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-top',
                alignItems: 'center'

            }}
          >
              <TopBanner />
              <GuessArea  guessAreaBoxes={allBoxes} />

              <MessageCenter message={message}/>
              <Keyboard keyboard={keyboard}  onClickCallback={keyboardKeyPressedCallBack} />
          </Box>
      </Fragment>
  );
}

export default App;
