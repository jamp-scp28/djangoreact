import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export const FieldDatePicker = ({ input, placeholder, minDate, maxDate }) => (
    <DatePicker
        className="plus-icon"
        dateFormat="yyyy/MM/dd"
        selected={input.value || null}
        onChange={input.onChange}
        minDate={minDate}
        maxDate={maxDate}
        disabledKeyboardNavigation
        placeholderText={placeholder}
        // showTimeSelect
        // timeFormat="HH:mm"
        // timeIntervals={15}
        // timeCaption="time"
        //dateFormat="MMMM d, yyyy h:mm aa"
    />
);

export default FieldDatePicker