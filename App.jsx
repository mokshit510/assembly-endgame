import { useState, useEffect } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    const numGuessesLeft = languages.length - 1
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const attemptsRemaining = Math.max(0, numGuessesLeft - wrongGuessCount)
    const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = Boolean(
        lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    )

    const keyboardRows = [
        "abcdefghi".split(""),
        "jklmnopqr".split(""),
        "stuvwxyz".split("")
    ]

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (isGameOver) return
            if (event.ctrlKey || event.metaKey || event.altKey) return
            const key = event.key.toLowerCase()
            if (key >= "a" && key <= "z" && key.length === 1) {
                addGuessedLetter(key)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isGameOver])

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
                title={isLanguageLost ? `${lang.name} eliminated` : lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        const shouldRevealLetter = isGameLost || isGuessed
        const isMissedLetter = isGameLost && !isGuessed
        const letterClassName = clsx(
            "letter-tile",
            isGuessed && "guessed",
            isMissedLetter && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect,
        playing: !isGameOver && !isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (isGameWon) {
            return (
                <div className="status-body">
                    <h2>You win!</h2>
                    <p>Well done! You saved the programming world.</p>
                </div>
            )
        }

        if (isGameLost) {
            return (
                <div className="status-body">
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly.</p>
                </div>
            )
        }

        if (isLastGuessIncorrect) {
            return (
                <div className="status-body">
                    <p className="farewell-message">
                        {getFarewellText(languages[wrongGuessCount - 1].name)}
                    </p>
                    <span className="attempts-text">
                        Attempts remaining: {attemptsRemaining} of {numGuessesLeft}
                    </span>
                </div>
            )
        }

        return (
            <div className="status-body">
                <span className="attempts-text">
                    Attempts remaining: <strong>{attemptsRemaining} of {numGuessesLeft}</strong>
                </span>
            </div>
        )
    }

    return (
        <main className="game-container">
            {isGameWon && (
                <Confetti
                    recycle={false}
                    numberOfPieces={600}
                    gravity={0.25}
                />
            )}

            <header className="game-header">
                <h1>Assembly: Endgame</h1>
                <p>
                    Guess the word within 8 attempts to keep the
                    programming world safe from Assembly.
                </p>
            </header>

            <section
                aria-live="polite"
                role="status"
                className={gameStatusClass}
            >
                {renderGameStatus()}
            </section>

            <section className="language-chips" aria-label="Programming languages">
                {languageElements}
            </section>

            <section className="word" aria-label="Hidden word">
                {letterElements}
            </section>

            <section
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {lastGuessedLetter ? (
                        currentWord.includes(lastGuessedLetter) ?
                            `Correct! The letter ${lastGuessedLetter} is in the word.` :
                            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    ) : "Game started."}
                    You have {attemptsRemaining} attempts left.
                </p>
                <p>
                    Current word: {currentWord.split("").map(letter =>
                        guessedLetters.includes(letter) ? letter + "." : "blank.")
                        .join(" ")}
                </p>
            </section>

            <section className="keyboard" aria-label="On-screen keyboard">
                {keyboardRows.map((row, rowIndex) => (
                    <div className="keyboard-row" key={rowIndex}>
                        {row.map(letter => {
                            const isGuessed = guessedLetters.includes(letter)
                            const isCorrect = isGuessed && currentWord.includes(letter)
                            const isWrong = isGuessed && !currentWord.includes(letter)
                            const className = clsx("key", {
                                correct: isCorrect,
                                wrong: isWrong
                            })

                            return (
                                <button
                                    type="button"
                                    className={className}
                                    key={letter}
                                    disabled={isGameOver}
                                    aria-disabled={isGuessed}
                                    aria-label={`Letter ${letter.toUpperCase()}`}
                                    onClick={() => addGuessedLetter(letter)}
                                >
                                    {letter.toUpperCase()}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </section>

            <div className="game-actions">
                {isGameOver ? (
                    <button
                        type="button"
                        className="new-game-btn"
                        onClick={startNewGame}
                    >
                        New Game
                    </button>
                ) : (
                    <span className="keyboard-hint">
                        Type on physical keyboard or tap on-screen keys
                    </span>
                )}
            </div>
        </main>
    )
}
