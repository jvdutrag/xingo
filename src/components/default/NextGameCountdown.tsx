import Countdown, { zeroPad } from 'react-countdown';

import { getNextDay } from '../../utils/Time';

export default function NextGameCountdown () {
    const renderCountdown = ({ hours, minutes, seconds, completed }: any) => {
        if(completed) {
            return <span>Reinicie a página para jogar com a palavra nova!</span>
        }

        return (
            <span>
                Próxima palavra em&nbsp;
                <strong>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</strong>
            </span>
        )
    }

    return <Countdown daysInHours={true} date={getNextDay()} renderer={renderCountdown as any} />
}
