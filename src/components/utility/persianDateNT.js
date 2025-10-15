import moment from 'moment-jalaali';

export const persianDateNT = {
    unixWithoutTime(input,message = 'No time to change') {
        if (input === "unknown" || input === null || input === undefined || input === "") {
            return message
        }
        return funcUnix(input,3)
    },
    unixMonth(input,message = 'No time to change') {
        if (input === "unknown" || input === null || input === undefined || input === "") {
            return message
        }
        return funcUnixMonth(input)
    },
    unixOnlyTime(input,message = 'No time to change') {
        if (input === "unknown" || input === null || input === undefined || input === "") {
            return message
        }
        return funcUnix(input,2)

    },
    date(input,message = 'No time to change') {
        if (input === "unknown" || input === null || input === undefined || input === "") {
            return message
        }
        return funcData(input)
    },
    unix(input,message = 'No time to change') {
        if (input === "unknown" || input === null || input === undefined || input === "") {
            return message
        }
        return funcUnix(input)
    },
}
function persianNumToEnglish(persianNum) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    let englishNum = "";
    for (let i = 0; i < persianNum.length; i++) {
        const index = persianDigits.indexOf(persianNum[i]);
        if (index !== -1) {
            englishNum += englishDigits[index];
        } else {
            englishNum += persianNum[i];
        }
    }
    return englishNum;
}
function funcUnix(input, type = 1) {
    // تنظیم زمان محلی به ایران
    const localTime1 = persianNumToEnglish(input);
    const localTime = moment.unix(localTime1);
    // تبدیل به تاریخ شمسی
    const jDate = localTime.format('jYYYY/jMM/jDD');
    const time = localTime.format('HH:mm');

    switch (type){
        case 1:
            return time + ' ' + jDate;
        case 2 :
            return time;
        case 3 :
            return jDate;
    }
}
function funcUnixMonth(input) {
    // تنظیم زمان محلی به ایران
    const localTime1 = persianNumToEnglish(input);
    const localTime = moment.unix(localTime1);
    // moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' })
    // تبدیل به تاریخ شمسی
    return localTime.format('jDD  jMMMM  jYYYY')
}
function funcData(input, type = 1) {
    const persianInput = persianNumToEnglish(input);
    // ابتدا ساختن یک شیء moment از ورودی
    let localTime = moment(persianInput);

    // کم کردن یک ساعت از زمان (برای جبران ساعت سرور)
    localTime = localTime.subtract(1, 'hours');

    // تبدیل به تاریخ شمسی
    const jDate = localTime.format('jYYYY/jMM/jDD');
    const time = localTime.format('HH:mm');

    switch (type){
        case 1:
            return time + ' ' + jDate;
        case 2:
            return time;
        case 3:
            return jDate;
    }
}