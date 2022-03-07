import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

import {
    guessBoxSizes,
    keyboardBoxSizes,
    numGuessAreaColumns,
    numGuessAreaRows,
    keyboardRowsHGap} from "../utils/sizes";

import boxStyleVariants from '../utils/keyboardAndGuessAreaBoxTypes';

const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);

    return (
        <Box sx={{
            ...keyboardBoxSizes,
            border: 1,
            ...keyAttributes,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2
        }}>
            {keyAttributes.letter}
        </Box>
    )
}
//
// const Keyboard = {
//     elements: {
//         main: null,
//         keysContainer: null,
//         keys: []
//     },
//
//     eventHandlers: {
//         oninput: null,
//         onclose: null
//     },
//
//     properties: {
//         value: "",
//         capsLock: false
//     },
//
//     init() {
//         // Create main elements
//         this.elements.main = document.createElement("div");
//         this.elements.keysContainer = document.createElement("div");
//
//         // Setup main elements
//         this.elements.main.classList.add("keyboard", "keyboard--hidden");
//         this.elements.keysContainer.classList.add("keyboard__keys");
//         this.elements.keysContainer.appendChild(this._createKeys());
//
//         this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
//
//         // Add to DOM
//         this.elements.main.appendChild(this.elements.keysContainer);
//         document.body.appendChild(this.elements.main);
//
//         // Automatically use keyboard for elements with .use-keyboard-input
//         document.querySelectorAll(".use-keyboard-input").forEach(element => {
//             element.addEventListener("focus", () => {
//                 this.open(element.value, currentValue => {
//                     element.value = currentValue;
//                 });
//             });
//         });
//     },
//
//     _createKeys() {
//         const fragment = document.createDocumentFragment();
//         const keyLayout = [
//
//             "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
//              "a", "s", "d", "f", "g", "h", "j", "k", "l", "delete",
//              "z", "x", "c", "v", "b", "n", "m",
//             "enter"
//         ];
//
//         // Creates HTML for an icon
//         const createIconHTML = (icon_name) => {
//             return `<i class="material-icons">${icon_name}</i>`;
//         };
//
//         keyLayout.forEach(key => {
//             const keyElement = document.createElement("button");
//             const insertLineBreak = [ "p", "l"].indexOf(key) !== -1;
//
//             // Add attributes/classes
//             keyElement.setAttribute("type", "button");
//             keyElement.classList.add("keyboard__key");
//
//
//
//
//             keyElement.textContent = key.toLowerCase();
//
//             keyElement.addEventListener("click", () => {
//                 this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
//                 this._triggerEvent("oninput");
//             });
//
//
//
//
//             fragment.appendChild(keyElement);
//
//             if (insertLineBreak) {
//                 fragment.appendChild(document.createElement("br"));
//             }
//         });
//
//         return fragment;
//     },
//
//     _triggerEvent(handlerName) {
//         if (typeof this.eventHandlers[handlerName] == "function") {
//             this.eventHandlers[handlerName](this.properties.value);
//         }
//     },
//
//     _toggleCapsLock() {
//         this.properties.capsLock = !this.properties.capsLock;
//
//         for (const key of this.elements.keys) {
//             if (key.childElementCount === 0) {
//                 key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
//             }
//         }
//     },
//
//     open(initialValue, oninput, onclose) {
//         this.properties.value = initialValue || "";
//         this.eventHandlers.oninput = oninput;
//         this.eventHandlers.onclose = onclose;
//         this.elements.main.classList.remove("keyboard--hidden");
//     },
//
//     close() {
//         this.properties.value = "";
//         this.eventHandlers.oninput = oninput;
//         this.eventHandlers.onclose = onclose;
//         this.elements.main.classList.add("keyboard--hidden");
//     }
// };
//
// window.addEventListener("DOMContentLoaded", function () {
//     Keyboard.init();
// });




const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;
    //const {demoNumKeys} = props;

    return (
        <Fragment>
            <Grid  container columns={10}  // hard-coded value -- this is the number of demo keys
                   sx={{
                       width:  keyboardBoxSizes.width + (25) * keyboardRowsHGap + 200,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       borderRadius: 2,
                       fontFamily: 'Helvetica Neue'


                   }}
            >


            {/*    gridRow += (()=>{switch (keyboard[idx-1]?.letter){*/}
            {/*    case (entrKey): return 1;*/}
            {/*    case (backKey): return 1;*/}
            {/*    default: return 0;*/}
            {/*}})();*/}
                {
                    keyboard.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{
                                  mb: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'


                        }}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }


            </Grid>
        </Fragment>
    )
}

export default Keyboard;