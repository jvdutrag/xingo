import moment from 'moment-timezone';

export function getToday() {
    const userTimezone = moment.tz.guess();

    const todayInCurrentTimezone = moment();

    if(userTimezone === 'America/Sao_Paulo') {
        return todayInCurrentTimezone.format('YYYY-MM-DD');
    }

    const todayInSaoPauloTime = moment(todayInCurrentTimezone).tz('America/Sao_Paulo');

    return todayInSaoPauloTime.format('YYYY-MM-DD');
}

export function getNextDay() {
    const today = getToday();

    const nextDate = moment(today).add(1, 'days');

    return nextDate.format('YYYY-MM-DD 00:00:00');
}
