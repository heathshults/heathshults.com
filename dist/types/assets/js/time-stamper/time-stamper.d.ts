export = TimeStamper;
/**
* @fileOverview
* @author Heath Shults - Fannie Mae, Inc.
* @version 1.0.0
*/
/**
* @description
* Just JavaScript - Timestamp
*
* @class  TimeStamper
* @param {(date|Object)} dt = new Date - object to hold the date and time
* @param {string} [format] - specify the format: datetime, date, time and justyear
* @param {string} [DD] - Returns the day formatted like '19'.
* @param {string} [MM] - Returns the month farmatted like '01.
* @param {string} [YYYY] - Returns the year farmatted like '2020.
* @param {string} [datetime] - Returns all variables concatenated like 01-29-2020 13:05:22.
* @param {string} [datetimereverse] - Returns all variables concatenated like 2020-01-29 13:05:22.
* @param {string} [date] - Returns all variables associated with the date like 01-29-2020.
* @param {string} [time] - Returns time variables like 13:05:22.
* @param {string} [mm] - Returns minutes formatted like 01-29-2020 13:05:22.
* @param {string} [ss] - Returns the seconds formatted like 01-29-2020 13:05:22.
*/
/**
 * @usage
 *
 * <script>
 *  let htmlelement = document.getElementById('dd')
 *  htmlelement.innerHTML = JSON.stringify(TimeStamper('datetime'));
 * </script>
 *
 * @note:  tons of room for improvement...
 */
declare function TimeStamper(): undefined;
declare class TimeStamper {
}
