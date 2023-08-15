import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useQuery<T>() {
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    return [...query].reduce((map, [key, value]) => ({...map, [key]: value}), {}) as T
}