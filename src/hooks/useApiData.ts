// Custom hook for API data management with loading and error states
import { useState, useEffect, useCallback } from 'react';
import { useApi } from '@/lib/api';
import { ApiResponse, PaginatedResponse, SearchFilters, SortOptions } from '@/lib/data';

interface UseApiDataOptions<T> {
  immediate?: boolean;
  filters?: SearchFilters;
  sort?: SortOptions;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UseApiDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setData: (data: T) => void;
  clearError: () => void;
}

export function useApiData<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  options: UseApiDataOptions<T> = {}
): UseApiDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { immediate = true } = options;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetcher();
      
      if (response.success && response.data) {
        setData(response.data);
        options.onSuccess?.(response.data);
      } else {
        const errorMessage = response.error || 'Failed to fetch data';
        setError(errorMessage);
        options.onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetcher, options]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
    clearError,
  };
}

// Hook for paginated data
export function usePaginatedApiData<T>(
  fetcher: (page: number, filters?: SearchFilters, sort?: SortOptions) => Promise<ApiResponse<PaginatedResponse<T>>>,
  options: UseApiDataOptions<PaginatedResponse<T>> = {}
) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters | undefined>(options.filters);
  const [sort, setSort] = useState<SortOptions | undefined>(options.sort);

  const result = useApiData(
    () => fetcher(page, filters, sort),
    { ...options, immediate: false }
  );

  const refetchWithFilters = useCallback(async (newFilters?: SearchFilters, newSort?: SortOptions) => {
    setFilters(newFilters);
    setSort(newSort);
    setPage(1);
    await result.refetch();
  }, [result.refetch]);

  const loadPage = useCallback(async (newPage: number) => {
    setPage(newPage);
    await result.refetch();
  }, [result.refetch]);

  return {
    ...result,
    page,
    setPage: loadPage,
    filters,
    setFilters: refetchWithFilters,
    sort,
    totalItems: result.data?.total || 0,
    totalPages: result.data?.totalPages || 0,
    items: result.data?.items || [],
  };
}

// Hook for mutations (POST, PUT, DELETE)
export function useApiMutation<T, V = void>(
  mutator: (variables: V) => Promise<ApiResponse<T>>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    onSettled?: () => void;
  } = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (variables: V) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await mutator(variables);
      
      if (response.success && response.data) {
        options.onSuccess?.(response.data);
        return response.data;
      } else {
        const errorMessage = response.error || 'Operation failed';
        setError(errorMessage);
        options.onError?.(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
      options.onSettled?.();
    }
  }, [mutator, options]);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    loading,
    error,
    reset,
  };
}
