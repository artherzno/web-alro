export const formatNumber = (num, toFixed = 2) => {
    if (num && num != null && num != "") {
        return parseFloat(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return num
}
