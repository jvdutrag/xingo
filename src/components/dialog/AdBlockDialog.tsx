import { Row, Col } from 'react-bootstrap';

import { CustomModal } from '../default';

type Props = {
    show: boolean,
    handleClose: () => void
}

export default function AdBlockDialog({ show, handleClose }: Props) {
    return (
        <CustomModal show={show} handleClose={handleClose} title="PERA AÍ! ✋🚫" style={{ backgroundColor: '#692c2c' }}>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <p>Percebi que você está usando um bloqueador de anúncios!</p>
                    <p>Adicione o <strong>verbio.site</strong> como exceção em sua extensão e apoie nosso projeto vendo os anúncios!</p>
                    <p>Ajuda nóis... 😥</p>
                </Col>
            </Row>
        </CustomModal>
    )
}
