import { Row, Col } from 'react-bootstrap';

import { CustomModal } from '../default';

import { GuessBlock } from '../game';

import { NUMBER_OF_LETTERS_OF_WORD, NUMBER_OF_MAX_GUESSES, exampleGuesses } from '../../config'

type Props = {
    show: boolean,
    handleClose: () => void
}

export default function HelpDialog({ show, handleClose }: Props) {
    return (
        <CustomModal show={show} handleClose={handleClose} title="Como jogar">
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <p>Todos os dias um novo verbo surge para você advinhar em até {NUMBER_OF_MAX_GUESSES} tentativas.</p>
                    <p>Verbo é uma palavra que indica ação. No jogo, os verbos estarão no infinitivo. <strong>Exemplo: pegar, amarrar, etc.</strong></p>
                    <p>Cada tentativa deve ser uma palavra válida de {NUMBER_OF_LETTERS_OF_WORD} letras. Acentos e cedilha são desconsiderados.</p>
                    <p>Ao efetuar uma tentativa, a cor das letras irá indicar se você está perto da resposta ou não.</p>
                    <p>Uma dica (sinônimos da resposta) irá aparecer a partir da segunda tentativa.</p>
                    <p><strong>Apenas verbos são aceitos nas tentativas</strong>.</p>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <div>
                        <p>A letra verde indica que ela está presente na palavra e a posição está correta.</p>
                        <GuessBlock current={false} placeholder={false} guess={exampleGuesses.correct} />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <p>A letra amarela indica que ela está presente na palavra porém em outra posição.</p>
                        <GuessBlock current={false} placeholder={false} guess={exampleGuesses.displaced} />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <p>A letra cinza indica que ela não está na palavra.</p>
                        <GuessBlock current={false} placeholder={false} guess={exampleGuesses.wrong} />
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    Criado por <a href="https://twitter.com/jvdutrag">@jvdutrag</a>
                </Col>
            </Row>
        </CustomModal>
    )
}
