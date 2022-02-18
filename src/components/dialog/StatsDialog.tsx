import { Row, Col } from 'react-bootstrap';

import { CustomModal } from '../default';

type Props = {
    show: boolean,
    handleClose: () => void
}

export default function StatsDialog({ show, handleClose }: Props) {
    return (
        <CustomModal show={show} handleClose={handleClose} title="Estatísticas">
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <p>Em breve as estatísticas dos seus jogos estarão disponíveis!</p>
                </Col>
            </Row>
        </CustomModal>
    )
}
