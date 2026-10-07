import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`error HTTP: ${response.status}`);
                }

                const data = await response.json();

                if (isMounted) {
                    setState({
                        data,
                        isLoading: false,
                        error: null,
                    });
                }
            } catch (err) {
                if (isMounted) {
                    setState({
                        data: null,
                        isLoading: false,
                        error: err.message,
                    });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
    };
};