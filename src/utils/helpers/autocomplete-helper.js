import { isEmpty } from 'lodash'

const DEFAULT_MAX_LENGTH_OPTIONS_AUTOCOMPLETE = 100000

// @param: option, that options for autocomplete
// @param: keyLabel, name key that container label for autocomplete
function getOptionLabel( option, keyLabel = '' ) {
    if( !option || !keyLabel || !option[keyLabel] ) {
        return ''
    }

    return option[ keyLabel ]
}

/**
 * @param { object } option, option object autocomplete
 * @param { string } keyLabel, key label for get value option
 * @param { function } funcCombineData, function for combine data
 * @returns 
 *  same as get option label
 *  but, you can easily combine all data in option with your format
 */
function getOptionLabelCombineData( option, keyLabel = '', funcCombineData ) {
    const isExistedLabel = getOptionLabel( option, keyLabel )

    if(
        isEmpty( isExistedLabel ) ||
        typeof funcCombineData !== 'function'
    ) {
        return isExistedLabel
    }

    return funcCombineData( option )
}

// @param: option, option for autocomplete
// @param: value, value provice in data
// @param: keyID, different key by identity
function isOptionEqualToValue( option, value, keyID = '' ) {
    if(
        !value || !option ||
        !keyID || !option[ keyID ] ||
        !value[ keyID ]
    ) {
        return false
    }

    return option[ keyID ] === value[ keyID ]
}

/**
 * 
 * @param { object }    containerData               container autocomplete data
 * @param { array }     keysFormatted               name key as reference for get formmated input value
 * @param { arrray }    keyNotFormatted             single name key not formatted when not found data keys formatted
 * @param { array }     funcFormat                  function for handlng formatted container data
 * @param { ...any }    additionalParamsFormat      passing addition params into function formatter container data 
 * @returns 
 */
function getInputValue( containerData, keysFormatted, keyNotFormatted, funcFormat, ...additionalParamsFormat ) {
    if( typeof containerData !== 'object' || !containerData ) {
        return ''
    }

    let isFormatted = true

    // change decession of formatted container data or not
    for( let keyFormat of keysFormatted ) {
        isFormatted = isFormatted && keyFormat in containerData
    }

    return (
        isFormatted ?
            funcFormat( containerData, ...additionalParamsFormat ):
            containerData[ keyNotFormatted ] || ''
    )
}

/**
 * 
 * @param { array }     optionsList             option list of autocomplete
 * @param { number }    paginate                paginate reducer from be response
 * @param { number }    duplicatePaginatedBy    multiply paginate by number for anticipated limit on next option paginated
 * @param { number }    defaultMaxPaginate      max option that can scroll
 * @returns 
 *      number options for handling scroll autocomplete
 */
function getOptionPaginatedAutocomplete( optionsList, paginate, duplicatePaginatedBy = 2, defaultMaxPaginate = DEFAULT_MAX_LENGTH_OPTIONS_AUTOCOMPLETE ) {
    if( !Array.isArray( optionsList ) || !optionsList.length ) {
        return defaultMaxPaginate
    }

    const lengthOptionList = optionsList.length

    return (
        lengthOptionList + paginate >= defaultMaxPaginate ?
            lengthOptionList + ( paginate * duplicatePaginatedBy ) :
            defaultMaxPaginate
    )
}

const autocompleteHelper = {
    getOptionLabel,
    getOptionLabelCombineData,
    isOptionEqualToValue,
    getInputValue,
    getOptionPaginatedAutocomplete,
}

export default autocompleteHelper