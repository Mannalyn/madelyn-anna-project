"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { lexend } from "./layout.js";

function Story() {
    const [fillInWords, changeFillInWords] = useState({
        adjective1: "adjective",
        noun1: "noun",
        verb1: "verb",
        pluralNoun1: "plural noun",
        verb2: "verb",
        pluralNoun2: "plural noun",
        adverb1: "adverb"
    });

    const [currentInput, updateCurrentInput] = useState("");

    const [currentWord, changeCurrentWord] = useState(Object.keys(fillInWords)[0]);

    const [phase, changePhase] = useState(0);

    function Word({ wordKey }) {
        return (
            <span style={{
                textDecoration: "underline",
                color: "#2cd743ff"
            }}>{fillInWords[wordKey]}</span>
        );
    }

    function handleSave() {
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
    }

    return (
        <>
            <div style={{
                "display": phase == 0 ? "block" : "none"
            }}>
                <p>Current word: {fillInWords[currentWord]}</p>
                <input value={currentInput} onChange={e => updateCurrentInput(e.target.value)} className={lexend.className} onKeyDown={
                e => {
                    if (e.key == "Enter") {
                        handleSave()
                    }
                }} />
                <button onClick={handleSave} style={{
                    margin: "20px"
                }} className={lexend.className}>Save</button>
            </div>

            <div style={{
                "display": phase == 0 ? "none" : "block",
                "width": "50vw",
                "margin": "auto"
            }}>
                <p>
                    Once upon a time, there was a/an <Word wordKey="adjective1" /> <Word wordKey="noun1" />.
                    It loved to <Word wordKey="verb1" />.
                    But one day, it went to the park, and it saw <Word wordKey="pluralNoun1" /> all over the ground.
                    It decided to <Word wordKey="verb2" /> it up.
                    But when it tried to, it just made a bigger mess.
                    So it tried throwing <Word wordKey="pluralNoun2" /> at the ground.
                    And the mess <Word wordKey="adverb1" /> disappeared.
                    The end.
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