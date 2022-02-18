import { Row, Col } from 'react-bootstrap';

import { CustomModal } from '../default';

import { GuessBlock } from '../game';

const greenGuess = {
    full_word: 'PORRA',
    letters: [
        {
            letter: 'P',
            condition: 'correct'
        },
        {
            letter: 'O',
            condition: ''
        },
        {
            letter: 'R',
            condition: ''
        },
        {
            letter: 'R',
            condition: ''
        },
        {
            letter: 'A',
            condition: ''
        }
    ]
}

const yellowGuess = {
    full_word: 'MERDA',
    letters: [
        {
            letter: 'M',
            condition: ''
        },
        {
            letter: 'E',
            condition: ''
        },
        {
            letter: 'R',
            condition: ''
        },
        {
            letter: 'D',
            condition: 'displaced'
        },
        {
            letter: 'A',
            condition: ''
        }
    ]
}

const redGuess = {
    full_word: 'PINTO',
    letters: [
        {
            letter: 'P',
            condition: ''
        },
        {
            letter: 'I',
            condition: ''
        },
        {
            letter: 'N',
            condition: ''
        },
        {
            letter: 'T',
            condition: ''
        },
        {
            letter: 'O',
            condition: 'wrong'
        }
    ]
}

type Props = {
    show: boolean,
    handleClose: () => void
}

export default function HelpDialog({ show, handleClose }: Props) {
    return (
        <CustomModal show={show} handleClose={handleClose} title="Como jogar">
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <p>Todos os dias uma nova palavra de baixo calão surge pra você advinhar em 6 tentativas.</p>
                    <p>Cada tentativa deve ser uma palavra válida de 5 letras. Acentos e cedilha são desconsiderados.</p>
                    <p>Ao efetuar uma tentativa, a cor das letras irá indicar se você está perto da resposta ou não.</p>
                    
                    <p>
                        <strong>DICA:</strong> Na sua primeira tentativa, tente usar uma palavra comum. Palavras comuns também são aceitas.
                    </p>
                    <p>
                        <strong>AVISO:</strong> O Xingo é um jogo que contém palavras rudes e de baixo calão. Se você fica ofendido com o uso de palavras chulas, vulgares e obscenas, este jogo não é pra você.
                    </p>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <div>
                        <p>A letra verde indica que ela está presente na palavra e a posição está correta.</p>
                        <GuessBlock current={false} placeholder={false} guess={greenGuess} />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <p>A letra amarela indica que ela está presente na palavra porém em outra posição.</p>
                        <GuessBlock current={false} placeholder={false} guess={yellowGuess} />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <p>A letra vermelha indica que ela não está na palavra.</p>
                        <GuessBlock current={false} placeholder={false} guess={redGuess} />
                    </div>
                </Col>
            </Row>
        </CustomModal>
    )
}
