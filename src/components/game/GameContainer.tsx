import { Row, Col } from 'react-bootstrap';

import { Guess } from '../../types/Guess';
import { Letter } from '../../types/Letter';

import GuessBlock from './GuessBlock';

type Props = {
    guesses: Guess[],
    currentGuess: string[],
    gameEnded: boolean
}

export default function GameContainer({ currentGuess, guesses, gameEnded }: Props) {
    return (
        <Row className="justify-content-center">
            {
                guesses.map((guess, index) => (
                    <Col xs={12} key={index}>
                        <GuessBlock guess={guess} current={false} />
                    </Col>
                ))
            }
            {
                !gameEnded && (
                    <Col xs={12}>
                        <GuessBlock guess={{ letters: currentGuess as unknown as Letter[] }} current={!gameEnded} />
                    </Col>
                )
            }
            {
                guesses.length !== 6 && (
                    [...new Array(gameEnded ? Math.abs(guesses.length - 6) : Math.abs(guesses.length - 5))].map((_, index) => (
                        <Col xs={12} key={index}>
                            <GuessBlock placeholder={true} />
                        </Col>
                    ))
                )
            }
        </Row>
    )
}
