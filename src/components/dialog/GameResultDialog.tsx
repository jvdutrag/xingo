import { Row, Col } from 'react-bootstrap';
import Icon from '@mdi/react';

import { 
    mdiTwitter as TwitterIcon,
    mdiShareOutline as ShareIcon,
    mdiCheckCircleOutline as SuccessIcon,
    mdiAlertCircleOutline as ErrorIcon
} from '@mdi/js';

import { CustomModal, CustomButton, NextGameCountdown, AdSenseBlock } from '../default';

import { Game } from '../../types/Game';

import { getGameResultText, getShareOnTwitterURL } from '../../utils';

type Props = {
    show: boolean,
    handleClose: () => void,
    game: Game
}

export default function GameResultDialog({ show, handleClose, game }: Props) {
    if(!game.ended) {
        return null;
    }

    const shareActive = () => {
        return navigator && navigator.canShare && navigator.canShare({ text: '' });
    }

    const openTwitterShare = () => {
        const url = getShareOnTwitterURL(game);

        return window.open(url, '_blank')!.focus();
    }

    const openShare = () => {
        const text = getGameResultText(game);

        navigator.share({
            title: 'Xingo - o jogo',
            text: text
        });
    }

    return (
        <CustomModal show={show} handleClose={handleClose}>
            <Row>
                <Col>
                    <AdSenseBlock
                        slot="7901285564"
                        format="auto"
                        height="150px"
                        width="100%"
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
                <Col style={{ textAlign: 'center' }}>
                    <div style={{ color: game.won ? '#689c71' : '#964545' }}>
                        <Icon path={game.won ? SuccessIcon : ErrorIcon} size={4} />
                    </div>
                    {
                        game.won ? (
                            <h3 style={{ color: '#689c71' }}>Você acertou!</h3>
                        ) : (
                            <h3 style={{ color: '#964545' }}>Você errou!</h3>
                        )
                    }

                    <p>A palavra do dia era: <strong>{game.word}</strong></p>
                    {
                        game.won ? (
                            <p>Você acertou em {game.guesses.length} de 6 tentativas!</p>
                        ) : (
                            <p>Você teve 6 tentativas e errou. Boa sorte na próxima!</p>
                        )
                    }
                    <p><strong>Lembre-se:</strong> O jogo não é só sobre xingamentos. Não se tem xingamentos suficientes com 5 letras no Português. É também sobre palavras chulas ou obscenas.</p>

                    <div>
                        <NextGameCountdown />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="justify-content-center text-center">
                    <CustomButton variant="secondary" onClick={openTwitterShare}>
                        <Icon path={TwitterIcon} size={1} style={{ marginRight: '5px' }} />
                        Tweetar resultado
                    </CustomButton>
                </Col>
                {
                    shareActive() && (
                        <Col className="justify-content-center text-center">
                            <CustomButton variant="secondary" onClick={() => openShare()}>
                                <Icon path={ShareIcon} size={1} style={{ marginRight: '5px' }} />
                                Compartilhar
                            </CustomButton>
                        </Col>
                    )
                }
            </Row>
        </CustomModal>
    );
}
