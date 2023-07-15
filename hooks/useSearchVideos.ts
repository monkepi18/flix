import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

interface Movie {
  id: string
  title :String
  description :String
  videoUrl: String
  thumbnailUrl: String
  genre :String
  duration: String
}

const useSearchVideos = (
  searchTerm: string
): { searchResults: Movie[]; loading: boolean; error: Error | null } => {
  const { data: searchResults, error } = useSwr<Movie[]>(
    searchTerm ? `/api/searchVideos?searchTerm=${searchTerm}` : null,fetcher
  );
    
  return {
    searchResults: searchResults || [],
    loading: !searchResults && !error,
    error,
  };
};

export default useSearchVideos;