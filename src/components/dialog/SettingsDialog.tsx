import { Row, Col } from 'react-bootstrap';

import { CustomModal } from '../default';

type Props = {
    show: boolean,
    handleClose: () => void
}

export default function SettingsDialog({ show, handleClose }: Props) {
    return (
        <CustomModal show={show} handleClose={handleClose} title="Configurações">
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <p>Em breve algumas configurações estarão disponíveis!</p>
                </Col>
            </Row>
        </CustomModal>
    )
}
