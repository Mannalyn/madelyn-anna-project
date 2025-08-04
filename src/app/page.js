"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { lexend } from "./layout.js";

function Story({ chosenStory }) {
    
    if (chosenStory != "none") {
        function Word({ wordKey }) {
            return (
                <span style={{
                    textDecoration: "underline",
                    color: "#2cd743ff"
                }}>{fillInWords[wordKey]}</span>
            );
        }

        const differentStories = {
            "cleanupWords": {
                adjective1: "adjective",
                noun1: "noun",
                verb1: "verb",
                pluralNoun1: "plural noun",
                verb2: "verb",
                pluralNoun2: "plural noun",
                adverb1: "adverb"
            }, 
            "eatingWords": {
                noun1: "noun",
                adjective1: "adjective",
                pluralNoun1: "plural noun",
                noun2: "noun",
                verb1: "verb",
                adjective2: "adjective",
                adjective3: "adjective",
                exclamation1: "exclamation",
                adjective4: "adjective"
            }
        }

        const [fillInWords, changeFillInWords] = useState(differentStories[chosenStory.toString() + "Words"]);

        const [currentInput, updateCurrentInput] = useState("");

        const [currentWord, changeCurrentWord] = useState(Object.keys(fillInWords)[0]);

        const [phase, changePhase] = useState(0);

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

                    {chosenStory == "cleanup" ? <p>
                        Once upon a time, there was a/an <Word wordKey="adjective1" /> <Word wordKey="noun1" />.
                        It loved to <Word wordKey="verb1" />.
                        But one day, it went to the park, and it saw <Word wordKey="pluralNoun1" /> all over the ground.
                        It decided to <Word wordKey="verb2" /> it up.
                        But when it tried to, it just made a bigger mess.
                        So it tried throwing <Word wordKey="pluralNoun2" /> at the ground.
                        And the mess <Word wordKey="adverb1" /> disappeared.
                        The end.
                    </p> : null}

                    {chosenStory == "eating" ? <p>
                        There once was a <Word wordKey="noun1" />.
                        They liked to eat <Word wordKey="adjective1" /> <Word wordKey="pluralNoun1" />.
                        Once they were eating some <Word wordKey="pluralNoun1" />, when a <Word wordKey="noun2" /> appeared.
                        They decided to <Word wordKey="verb1" /> it.
                        Then they became very <Word wordKey="adjective2" />, so they looked for more of it.
                        Then they found another.
                        It was very <Word wordKey="adjective3" />, so they shouted, “<Word wordKey="exclamation1" />!”
                        Then they went back to their <Word wordKey="adjective4" /> house. The end.
                    </p> : null}
                </div>
            </>
        );
    }
}

export default function Page() {
    let [chosenStory, changeChosenStory] = useState("none");

    function StorySelectionButton({ story, children }) {
        return (
            <button onClick={() => changeChosenStory(story)} style={{
                display: chosenStory == "none" ? "default" : "none",
                margin: "15px"
            }} className={lexend.className}>{children}</button>
        );
    }

    return (
        <>
            <h1>Mannalibs</h1>
            <StorySelectionButton story="cleanup">Cleanup</StorySelectionButton>
            <StorySelectionButton story="eating">Eating</StorySelectionButton>

            <Story chosenStory={chosenStory} />
        </>
    );
}