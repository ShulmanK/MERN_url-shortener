import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                console.log('body', body)
            }
            const response = await fetch(url, {method, body, headers})
            console.log('RESPONSE', response)
            const data = await response.json()
            console.log('data', data)
            if (!response.ok) {
                setError(data.message)
                console.log('error after setError', error)
                throw new Error(data.message || 'Something went wrong')
            }
            setLoading(false)
            return data
        } catch (err) {
            console.log('err', err.message)
            setLoading(false)
            setError(err.message)
            throw err
        }
    }, [error])

    const clearError = useCallback(()=>setError(null), [])
    return {loading, request, error, clearError}
}