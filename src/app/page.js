import styles from "./page.module.css";
import GameInterface from "@/app/components/GameInterface.js";

export const metadata = {
    "title": "Mannalibs | Mannalyn"
}

export default function Page() {
    return (
        <>
            <h1>Mannalibs</h1>
            <GameInterface />
        </>
    );
}