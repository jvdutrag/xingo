import { Row, Col } from 'react-bootstrap';

import { CustomModal } from '../default';

type Props = {
    show: boolean,
    handleClose: () => void
}

export default function InfoDialog({ show, handleClose }: Props) {
    return (
        <CustomModal show={show} handleClose={handleClose} title="Créditos">
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <p>Criado por <a target="_blank" rel="noreferrer" href="https://twitter.com/jvdutrag">@jvdutrag</a> (me segue lá)</p>
                    <p>Idealização por <a target="_blank" rel="noreferrer" href="https://twitter.com/cinemagrath">@cinemagrath</a> e <a target="_blank" rel="noreferrer" href="https://twitter.com/fiveywimey1965">@fiveywimey1965</a></p>
                    <p>Versão brasileira do <a target="_blank" rel="noreferrer" href="https://www.lewdlegame.com/">Lewdle</a>, inspirado no <a target="_blank" rel="noreferrer" href="https://www.powerlanguage.co.uk/wordle">Wordle</a> e no <a target="_blank" rel="noreferrer" href="https://www.gabtoschi.com/letreco/">Letreco</a></p>
                </Col>
            </Row>
        </CustomModal>
    )
}
