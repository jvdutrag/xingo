import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { CustomModal, NextGameCountdown } from '../default';

import Database from '../../utils/Database';

type Props = {
    show: boolean,
    handleClose: () => void
}

type StatsData = {
    exists: boolean,
    games_count: number,
    win_rate: number,
    guesses_stats: { number: number, count: number }[],
}

export default function StatsDialog({ show, handleClose }: Props) {
    const [data, setData] = useState<StatsData>({
        exists: false,
        games_count: 0,
        win_rate: 0,
        guesses_stats: [
            {
                number: 1,
                count: 0
            },
            {
                number: 2,
                count: 0
            },
            {
                number: 3,
                count: 0
            },
            {
                number: 4,
                count: 0
            },
            {
                number: 5,
                count: 0
            },
            {
                number: 6,
                count: 0
            }
        ]
    });

    useEffect(() => {
        const previousGames = Database.getGames();

        if(!previousGames || !previousGames.length) {
            return;
        }

        const gamesCount = previousGames.length;
        const winRate = previousGames.filter(game => game.won).length / gamesCount * 100;

        const guessesStats = [
            {
                number: 1,
                count: 0
            },
            {
                number: 2,
                count: 0
            },
            {
                number: 3,
                count: 0
            },
            {
                number: 4,
                count: 0
            },
            {
                number: 5,
                count: 0
            },
            {
                number: 6,
                count: 0
            }
        ]

        previousGames.forEach(game => {
            const number = game.guesses.length;

            guessesStats[number - 1].count++;
        });

        setData({
            exists: true,
            games_count: gamesCount,
            win_rate: winRate,
            guesses_stats: guessesStats
        });
    }, []);

    return (
        <CustomModal show={show} handleClose={handleClose} title="Estatísticas">
            <Row>
                <Col>
                    {
                        data.exists ? (
                            <>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        Você jogou o Xingo <strong style={{ color: '#ce61f2' }}>{data.games_count}</strong> vez(es)
                                    </Col>
                                    <Col>
                                        Sua taxa de vitória está em <strong style={{ color: '#ce61f2' }}>{data.win_rate}%</strong>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs={12} md={6} style={{ textAlign: 'center' }}>
                                        {
                                            data.guesses_stats[0].count > 0 && (
                                                <p>
                                                    Em <strong style={{ color: '#ce61f2' }}>{data.guesses_stats[0].count}</strong> jogo(s), você precisou de 1 tentativa para acertar
                                                </p>
                                            )
                                        }
                                        {
                                            data.guesses_stats[1].count > 0 && (
                                                <p>
                                                    Em <strong style={{ color: '#ce61f2' }}>{data.guesses_stats[1].count}</strong> jogo(s), você precisou de 2 tentativas para acertar
                                                </p>
                                            )
                                        }
                                        {
                                            data.guesses_stats[2].count > 0 && (
                                                <p>
                                                    Em <strong style={{ color: '#ce61f2' }}>{data.guesses_stats[2].count}</strong> jogo(s), você precisou de 3 tentativas para acertar
                                                </p>
                                            )
                                        }
                                        {
                                            data.guesses_stats[3].count > 0 && (
                                                <p>
                                                    Em <strong style={{ color: '#ce61f2' }}>{data.guesses_stats[3].count}</strong> jogo(s), você precisou de 4 tentativas para acertar
                                                </p>
                                            )
                                        }
                                        {
                                            data.guesses_stats[4].count > 0 && (
                                                <p>
                                                    Em <strong style={{ color: '#ce61f2' }}>{data.guesses_stats[4].count}</strong> jogo(s), você precisou de 5 tentativas para acertar
                                                </p>
                                            )
                                        }
                                        {
                                            data.guesses_stats[5].count > 0 && (
                                                <p>
                                                    Em <strong style={{ color: '#ce61f2' }}>{data.guesses_stats[5].count}</strong> jogo(s), você precisou de 6 tentativas para acertar
                                                </p>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <p>Não há estatísticas a mostrar!</p>
                        )
                    }
                </Col>
            </Row>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <NextGameCountdown />
                </Col>
            </Row>
        </CustomModal>
    )
}
