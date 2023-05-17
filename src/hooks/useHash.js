import { useCallback, useEffect, useState } from 'react';


const useHash = () => {
    const [hash, setHash] = useState(() => window.location.hash.slice(1));

    const hashChangeHandler = useCallback(() => {
        setHash(window.location.hash.slice(1));
    }, []);

    useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler);
        return () => {
            window.removeEventListener('hashchange', hashChangeHandler);
        };
    }, []);

    const updateHash = useCallback(
        newHash => {
            if (newHash !== hash) window.location.hash = newHash;
        },
        [hash]
    );

    return [hash, updateHash];
};

export default useHash;