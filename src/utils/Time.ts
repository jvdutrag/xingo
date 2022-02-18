import moment from 'moment-timezone';
moment.tz.setDefault('America/Sao_Paulo');

function isUserInADifferentTimezone() {
    const userTimezone = moment.tz.guess();

    return userTimezone !== 'America/Sao_Paulo';
}

export function getToday(includeTime: boolean = false): string {
    const today = moment();

    return today.format(includeTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
}

export function getNextDay() {
    const today = getToday(true);

    let nextDate = moment(today).add(1, 'days').startOf('day');

    if(isUserInADifferentTimezone()) {
        const userTimezone = moment.tz.guess();

        nextDate = nextDate.tz(userTimezone);
    }

    return nextDate.format('YYYY-MM-DD HH:mm:ss');
}
