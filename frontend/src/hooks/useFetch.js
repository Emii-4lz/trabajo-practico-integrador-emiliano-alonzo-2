import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const { state, setState } = useState({
        data: null,
        isLoading: true,
        error: null,
    })
}

const fetchData = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true}));

    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`error HTTP: ${response.status}`);
        }

    const data = await response.json();

    setState({
        data: data,
        isLoading: false,
        error: null,
    })

    } catch (error) {
        setState({
            data: null,
            isLoading: false,
            error: error.message,
        })
    }

useEffect(() => {
    fetchData();
    }, [url]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
    }
}