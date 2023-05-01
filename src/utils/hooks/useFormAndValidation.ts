import React, {useState, useCallback, useMemo} from 'react'

export function useFormAndValidation(formInputs: { [key: string]: string }) {

    const booleanFormInputs = useMemo(() => {
        const returned: { [key: string]: boolean } = {}
        Object.entries(formInputs).map((item) => {
            return returned[item[0]] = false
        })
        return returned
    }, [formInputs])

    const [values, setValues] = useState(formInputs)
    const [errors, setErrors] = useState(formInputs)
    const [isValid, setIsValid] = useState(booleanFormInputs)

    const isButtonDisabled = useMemo(() => {
        return !(Object.values(isValid).filter(item => item).length === 0 &&
            Object.values(values).filter(item => item === '').length === 0)
    }, [isValid, values])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
        setErrors({...errors, [name]: e.target.validationMessage})
        setIsValid({...isValid, [name]: !e.target.validity.valid})
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = {}) => {
            setValues(newValues)
            setErrors(newErrors)
            setIsValid(newIsValid)
        },
        [setValues, setErrors, setIsValid]
    )

    return {
        values,
        handleChange,
        errors,
        isValid,
        isButtonDisabled,
        resetForm,
        setValues,
        setIsValid,
    }
}
