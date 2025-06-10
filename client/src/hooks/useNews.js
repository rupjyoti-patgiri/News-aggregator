import { useState, useEffect, useCallback } from 'react';

const useNews = (fetchFunction, initialParams = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const updateParams = useCallback((newParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction(...Object.values(params));

      if (result.success) {
        setArticles(result.data.articles || []);
        const fetchedTotalResults = result.data.totalResults || 0;
        const pageSize = params.pageSize || 10;
        
        setArticles(prev => ({
          ...prev, 
          list: result.data.articles || [],
          totalPages: Math.ceil(fetchedTotalResults / pageSize),
          totalResults: fetchedTotalResults,
        }));
      } else {
        setError(result.message || 'Failed to fetch news.');
        setArticles({ list: [], totalPages: 1, totalResults: 0 });
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setArticles({ list: [], totalPages: 1, totalResults: 0 });
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage > 0 && newPage <= (articles.totalPages || 1)) {
      updateParams({ page: newPage });
    }
  }, [articles.totalPages, updateParams]);
  
  
  const { list = [], totalPages = 1, totalResults = 0 } = articles;
  const currentPage = params.page || 1;

  return {
    articles: list,
    loading,
    error,
    currentPage,
    totalPages,
    totalResults,
    handlePageChange,
    updateParams,
  };
};


const useNewsRobust = (fetchFunction, initialParams = {}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const [params, setParams] = useState(initialParams);

    const updateParams = useCallback((newParams) => {
        
        setParams(prevParams => ({ ...prevParams, page: 1, ...newParams }));
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setParams(prevParams => ({ ...prevParams, page: newPage }));
    }, []);

    useEffect(() => {
        let isMounted = true; 
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchFunction(params.code || params.q || params.category, params.page, params.pageSize);
                if (isMounted) {
                    if (result.success) {
                        setArticles(result.data.articles || []);
                        const fetchedTotalResults = result.data.totalResults || 0;
                        setTotalResults(fetchedTotalResults);
                        setTotalPages(Math.ceil(fetchedTotalResults / (params.pageSize || 10)));
                    } else {
                        setError(result.message || 'Failed to fetch news.');
                        setArticles([]);
                        setTotalResults(0);
                        setTotalPages(1);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'An unexpected error occurred.');
                    setArticles([]);
                    setTotalResults(0);
                    setTotalPages(1);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [fetchFunction, params]);

    return {
        articles,
        loading,
        error,
        currentPage: params.page,
        totalPages,
        totalResults,
        handlePageChange,
        updateParams,
    };
};


export default useNewsRobust; 