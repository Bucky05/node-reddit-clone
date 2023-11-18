const moment = require('moment');
const momentTZ = require('moment-timezone');
require('moment-precise-range-plugin');

module.exports = {
    currentTime : function () {
        const currentDate = momentTZ().tz('Asia/Kolkata');
        return currentDate.format('YYYY-MM-DD HH:mm:ss');
    },
    calculateTimeAgo : function (date) {
        const providedDate = moment(date, 'YYYY-MM-DD HH:mm:ss');
        const timeAgo = moment.preciseDiff(providedDate, momentTZ().tz('Asia/Kolkata'), true);
        let duration = ' AGO'
        if(timeAgo.years > 0) {
            if(timeAgo.year == 1) 
                duration = '1 YEAR'+duration
            else 
                duration = timeAgo.years+' YEARS'+duration
        }
        else if(timeAgo.months > 0 ) {
            if(timeAgo.months == 1) 
                duration = '1 MONTH'+duration
            else 
                duration = timeAgo.months+' MONTHS'+duration
        }
        else if(timeAgo.hours > 0) {
            if(timeAgo.hours == 1)
                duration = '1 HOUR'+duration
            else 
                duration = timeAgo.hours+' HOURS'+duration
        }
        else if(timeAgo.minutes > 0 ){
            if(timeAgo.minuts == 1) {
                duration = '1 MINUTE'+duration
            }
            else 
                duration = timeAgo.minutes+' MINUTES'+duration
        }
        else {
            duration = 'A FEW MOMENTS'+duration
        }
        return duration
    }
}