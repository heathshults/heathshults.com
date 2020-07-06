
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

function TimeStamper() {
  var dt = new Date()
  var final
  timerequest()
  
  function timerequest(format) {
    
    // this.el = el
    this.format = format
    

    // ensure date comes as 01, 09 etc
    var DD = ('0' + dt.getDate()).slice(-2)

    // getMonth returns month from 0
    var MM = ('0' + (dt.getMonth() + 1)).slice(-2)
    var YYYY = dt.getFullYear()
    var hh = ('0' + dt.getHours()).slice(-2)
    var mm = ('0' + dt.getMinutes()).slice(-2)
    var ss = ('0' + dt.getSeconds()).slice(-2)

    var datetime = MM + '-' + DD + '-' + YYYY + ' ' + hh + ':' + mm + ':' + ss
    var datetimereverse = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    var justdate = MM + '-' + DD + '-' + YYYY
    var justtime = hh + ':' + mm + ':' + ss
    var justyear = YYYY

    if (format === 'datetime') {
      final = datetime
    } else if (format === 'datetimereverse') { 
      final =  datetimereverse
    } else if (format === 'justdate') { 
      final =  justdate
    } else if (format === 'justtime') { 
      final =  justtime
    } else if (format === 'justyear') { 
      final =  justyear
    } else if (format === '' || typeof 'undefined') { 
      final =  datetime 
    } else {
      final = TimeStamper.datetime
    }
  }
    
    return final
}
module.exports = TimeStamper