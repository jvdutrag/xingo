import { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import Icon from '@mdi/react';
import {
    mdiHelpCircleOutline as HelpIcon,
    mdiChartBoxOutline as StatsIcon,
    mdiFlagOutline as FlagIcon
} from '@mdi/js';
import { useDetectAdBlock } from 'adblock-detect-react';

import { HelpDialog, StatsDialog, AdBlockDialog } from '../dialog';

import { CustomButton } from '../default'

import Database from '../../utils/Database';

import logo from '../../assets/images/logo.png';

import './Header.css'

type Props = {
    children?: React.ReactNode,
    onGiveUp: () => void,
}

export default function Header({ onGiveUp }: Props) {
    const [showHelpDialog, setShowHelpDialog] = useState(false);
    const [showStatsDialog, setShowStatsDialog] = useState(false);
    const [showAdBlockDialog, setShowAdBlockDialog] = useState(false);

    const adBlockDetected = useDetectAdBlock();

    const shouldShowHelpScreen = useCallback(() => {
        const settings = Database.getSettings();

        if(settings?.showHelpScreen && !adBlockDetected) {
            setShowHelpDialog(true);
        }
    }, [adBlockDetected]);

    useEffect(() => {
        setTimeout(() => {
            shouldShowHelpScreen();
        }, 2000);

        if(adBlockDetected) {
            setShowAdBlockDialog(true);
        }
    }, [adBlockDetected, shouldShowHelpScreen]);

    return (
        <>
            <StatsDialog show={showStatsDialog} handleClose={() => setShowStatsDialog(false)} />
            <HelpDialog show={showHelpDialog} handleClose={() => setShowHelpDialog(false)} />
            <AdBlockDialog show={showAdBlockDialog} handleClose={() => setShowAdBlockDialog(false)} />

            <Row className="header">
                <Col xs={3} className="header-buttons">
                    
                </Col>
                <Col xs={12} className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={logo} alt="Verbio"
                        draggable={false}
                    />
                    <div style={{ marginTop: 10 }}>
                        <CustomButton tabIndex="-1" variant="secondary" onClick={() => setShowHelpDialog(true)} style={{ marginRight: '5px' }}>
                            <Icon path={HelpIcon} size={1} /> Como jogar
                        </CustomButton>
                        <CustomButton tabIndex="-1" variant="secondary" onClick={() => setShowStatsDialog(true)} style={{ marginRight: '5px' }}>
                            <Icon path={StatsIcon} size={1} /> Estatísticas
                        </CustomButton>
                        <CustomButton tabIndex="-1" variant="secondary" onClick={() => onGiveUp()}>
                            <Icon path={FlagIcon} size={1} /> Desistir
                        </CustomButton>
                    </div>
                </Col>
                <Col xs={3} className="header-buttons">
                    
                </Col>
            </Row>
        </>
    )
}
