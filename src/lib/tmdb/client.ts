import { Movie, TMDBRawMovie, TMDBResponse, TMDBVideo, TMDBVideosResponse } from "./types";
import { FALLBACK_GENRES, FALLBACK_MOVIES } from "./fallback-data";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_POSTER = "https://image.tmdb.org/t/p/w500";
const TMDB_IMAGE_BASE_BACKDROP = "https://image.tmdb.org/t/p/original";

// Placeholder image in case poster/backdrop is null
const FALLBACK_POSTER = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";
const FALLBACK_BACKDROP = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&auto=format&fit=crop&q=80";

function getHeaders(): HeadersInit | null {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!token) return null;

  return {
    Authorization: `Bearer ${token.trim()}`,
    accept: "application/json",
  };
}

function formatDuration(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "2h 00m";
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return `${hours}h ${remainingMins < 10 ? "0" : ""}${remainingMins}m`;
}

function getAssignedFormats(id: number): string[] {
  const formatsList = [
    ["IMAX 3D", "Dolby Atmos", "4DX"],
    ["4DX 3D", "IMAX 3D", "2D"],
    ["70MM IMAX", "Dolby Cinema"],
    ["IMAX 3D", "3D Dolby"],
    ["2D Dolby Atmos", "Laser"],
  ];
  return formatsList[id % formatsList.length];
}

function getStartingPrice(id: number): number {
  const prices = [280, 320, 350, 300, 250];
  return prices[id % prices.length];
}

export function normalizeMovie(
  raw: TMDBRawMovie,
  trailerKey?: string
): Movie {
  const genres =
    raw.genres?.map((g) => g.name) ||
    raw.genre_ids?.map((id) => FALLBACK_GENRES[id] || "Cinema") ||
    ["Action", "Drama"];

  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview || "Experience this cinematic presentation on the big screen with premium sound.",
    posterUrl: raw.poster_path ? `${TMDB_IMAGE_BASE_POSTER}${raw.poster_path}` : FALLBACK_POSTER,
    backdropUrl: raw.backdrop_path ? `${TMDB_IMAGE_BASE_BACKDROP}${raw.backdrop_path}` : FALLBACK_BACKDROP,
    releaseDate: raw.release_date || "2024-01-01",
    rating: Number((raw.vote_average || 7.5).toFixed(1)),
    voteCount: raw.vote_count || 100,
    genres: genres.filter(Boolean).slice(0, 3),
    runtime: raw.runtime || 120,
    runtimeFormatted: formatDuration(raw.runtime),
    trailerKey: trailerKey,
    formats: getAssignedFormats(raw.id),
    startingPrice: getStartingPrice(raw.id),
    certification: raw.vote_average >= 8 ? "UA 16+" : "UA",
  };
}

async function tmdbFetch<T>(endpoint: string, revalidateTime = 3600): Promise<T | null> {
  const headers = getHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
      headers,
      next: { revalidate: revalidateTime },
    });

    if (!res.ok) {
      console.warn(`[TMDB] ${endpoint} responded with status: ${res.status}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[TMDB] Fetch failed for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Fetch Now Playing Movies
 */
export async function getNowPlayingMovies(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<TMDBRawMovie>>("/movie/now_playing?language=en-US&page=1");
  if (!data || !data.results || data.results.length === 0) {
    return FALLBACK_MOVIES.slice(0, 6);
  }
  return data.results.slice(0, 10).map((m) => normalizeMovie(m));
}

/**
 * Fetch Popular Movies
 */
export async function getPopularMovies(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<TMDBRawMovie>>("/movie/popular?language=en-US&page=1");
  if (!data || !data.results || data.results.length === 0) {
    return [FALLBACK_MOVIES[1], FALLBACK_MOVIES[3], FALLBACK_MOVIES[4], FALLBACK_MOVIES[0]];
  }
  return data.results.slice(0, 10).map((m) => normalizeMovie(m));
}

/**
 * Fetch Upcoming Movies
 */
export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<TMDBRawMovie>>("/movie/upcoming?language=en-US&page=1");
  if (!data || !data.results || data.results.length === 0) {
    return [FALLBACK_MOVIES[5], FALLBACK_MOVIES[6], FALLBACK_MOVIES[7]];
  }
  return data.results.slice(0, 10).map((m) => normalizeMovie(m));
}

/**
 * Fetch Movie Details with Videos
 */
export async function getMovieDetails(movieId: string | number): Promise<Movie | null> {
  const numericId = Number(movieId);

  // If in fallback mode or numeric match
  const fallbackMatch = FALLBACK_MOVIES.find((m) => m.id === numericId || m.id === movieId);

  const rawMovie = await tmdbFetch<TMDBRawMovie>(`/movie/${movieId}?language=en-US`);
  if (!rawMovie) {
    return fallbackMatch || FALLBACK_MOVIES[0];
  }

  // Fetch trailers
  const videosData = await tmdbFetch<TMDBVideosResponse>(`/movie/${movieId}/videos?language=en-US`);
  let trailerKey = fallbackMatch?.trailerKey;

  if (videosData?.results) {
    const youtubeTrailer = videosData.results.find(
      (v: TMDBVideo) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser") && v.official
    ) || videosData.results.find(
      (v: TMDBVideo) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );

    if (youtubeTrailer) {
      trailerKey = youtubeTrailer.key;
    }
  }

  return normalizeMovie(rawMovie, trailerKey);
}

/**
 * Search Movies by title
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query || query.trim().length === 0) {
    return getNowPlayingMovies();
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const data = await tmdbFetch<TMDBResponse<TMDBRawMovie>>(`/search/movie?query=${encodedQuery}&language=en-US&page=1`);
  if (!data || !data.results || data.results.length === 0) {
    return FALLBACK_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
    );
  }

  return data.results.map((m) => normalizeMovie(m));
}
