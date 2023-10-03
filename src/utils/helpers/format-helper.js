import moment from 'moment'

/**
 * @param { string } date target date 
 * @param { string } locale localization date
 * @returns 
 * formatter date with new version,
 * if using id, then result is DD/MM/YYYY
 * en, result is MM/DD/YYYY
 */
export const getReadableDate = (date, locale = 'id') => {
  if (!date) return
  if (/\s/g.test( date ) ) date = date.split(' ')[0]
  if (locale === 'en' ) return moment( date ).format('MM/DD/YYYY')

  return moment(date).format('DD/MM/YYYY')
}

export const currencyFormat = (value, fixedNumber = 2, maxFixedNumber = 2) => {
  if ((typeof value !== 'string' && typeof value !== 'number' ) || !value) {
    return value
  }

  // subtition type always number type
  let changeTypeValue = value

  if (typeof value === 'string') {
    // adding fixed number for follow count behind point
    if (changeTypeValue.indexOf('.') !== -1) {
      const countNumberBehindPoint = changeTypeValue.split('.')[1].length

      fixedNumber = countNumberBehindPoint > maxFixedNumber
        ? maxFixedNumber 
        : countNumberBehindPoint
    }

    if (changeTypeValue.indexOf(',') !== -1 ) {
      changeTypeValue = changeTypeValue.replace(/,/g, '')

      changeTypeValue = Number(changeTypeValue)
    }

    else { changeTypeValue = Number( value ) }
  }

  if (!fixedNumber) {
    return (changeTypeValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '$&,')
  }

  return Number(changeTypeValue).toFixed(fixedNumber).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}