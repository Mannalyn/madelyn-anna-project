"use client"
import { useState } from "react";
import styles from "./page.module.css";

function Story() {
    const [fillInWords, changeFillInWords] = useState({
        noun1: "noun",
        pastTenseVerb1: "past-tense verb"
    });

    const [currentInput, updateCurrentInput] = useState("");

    const [currentWord, changeCurrentWord] = useState(Object.keys(fillInWords)[0]);

    const [phase, changePhase] = useState(0);

    function Word({ wordKey }) {
        return (
            <span style={{
                textDecoration: "underline",
                color: "#e175ff"
            }}>{fillInWords[wordKey]}</span>
        );
    }

    return (
        <>
            <div style={{
                "display": phase == 0 ? "block" : "none"
            }}>
                <p>Current word: {fillInWords[currentWord]}</p>
                <input value={currentInput} onChange={e => updateCurrentInput(e.target.value)} />
                <button onClick={() => {
                    changeFillInWords(() => {
                        const updatedArray = Object.entries(fillInWords).map(i => i[0].toString() == currentWord.toString() ? [i[0], currentInput] : i);

                        let newObj = {};
                        for (let i of updatedArray) {
                            newObj[i[0]] = i[1];
                        }

                        return newObj;
                    });

                    updateCurrentInput("");

                    if (Object.keys(fillInWords).indexOf(currentWord) < Object.keys(fillInWords).length - 1) {
                        changeCurrentWord(Object.keys(fillInWords)[Object.keys(fillInWords).indexOf(currentWord) + 1]);
                    } else {
                        changePhase(1);
                    }
                }} style={{
                    margin: "20px"
                }}>Save</button>
            </div>

            <div style={{
                "display": phase == 0 ? "none" : "block"
            }}>
                <p>
                    The <Word wordKey="noun1" /> <Word wordKey="pastTenseVerb1" /> down the street.
                </p>
            </div>
        </>
    );
}

export default function Page() {
    return (
        <>
            <h1>Mannalibs</h1>

            <Story />
        </>
    );
}