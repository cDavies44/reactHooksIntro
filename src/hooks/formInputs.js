import { useState } from 'react'

export const useFormInput = () => {
    // USE STATE
    const [value, setValue] = useState('')
    const [isValidInput, updateValidity] = useState(false)

    const inputChangeHandler = event => {
        setValue(event.target.value)
        if (event.target.value.trim() === '') {
            updateValidity(false)
        } else {
            updateValidity(true)
        }
    }

    const valueReset = () => {
        setValue('')
    }

    return {
        value,
        onChange: inputChangeHandler,
        isValidInput,
        valueReset,
    }
}
