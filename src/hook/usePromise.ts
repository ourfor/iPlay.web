import { useEffect, useState } from "react";

export function usePromise<T>(promise: (() => Promise<T>)|nil, dependencies: any[] = []) {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<T|null>(null)
    const [error, setError] = useState<Error|null>(null)

    useEffect(() => {
        if (!promise) return
        setLoading(true)
        promise().then(data => setData(data))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }, dependencies)
    
    return {
        loading,
        data,
        error
    }
}