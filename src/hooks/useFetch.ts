import { useEffect, useState } from 'react';

function useFetching<T>(initialUrl: string, initialData: T) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialData);

  useEffect(() => {
    let unmounted = false;

    const handleFetchResponse = (response: Response) => {
      if (unmounted) return initialData;

      setHasError(!response.ok);
      setIsLoading(false);
      return response.ok && response.json ? response.json() : initialData;
    };

    const fetchData = () => {
      setIsLoading(true);
      return fetch(url).then(handleFetchResponse).catch(handleFetchResponse);
    };

    if (initialUrl && !unmounted)
      fetchData().then((data) => !unmounted && setFetchedData(data));

    return () => {
      unmounted = true;
    };
  }, [url]);

  return {
    isLoading,
    hasError,
    setUrl,
    data: fetchedData,
    setData: setFetchedData,
    setLoading: setIsLoading,
  };
}

export default useFetching;
