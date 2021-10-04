import moment from 'moment'
import * as numeral from 'numeral'

export const formatNumber = (num, toFixed = 2) => {
    if (num && num != null && num != "") {

        const number = parseFloat(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        return numeral(number).format('0,0.00')
    }

    return num
}

export const formatNumberInt = (num, toFixed = 2) => {
    if (num && num != null && num != "") {

        const number = parseFloat(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        return numeral(number).format('0,0')
    }

    return num
}

export const dateFormatTensiveMenu = (date) =>{

    if (!date || date === ''){
        return ""
    }
    return moment(date,'YYYY-MM-DD').format("DD MMM YYYY")
}