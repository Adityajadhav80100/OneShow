import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
} from "@/lib/tmdb/client";
import { HeroBanner } from "@/components/movies/HeroBanner";
import { MovieExplorer } from "@/components/movies/MovieExplorer";

export default async function HomePage() {
  // Fetch movie data concurrently on the server
  const [nowPlaying, popular, upcoming] = await Promise.all([
    getNowPlayingMovies(),
    getPopularMovies(),
    getUpcomingMovies(),
  ]);

  // Select primary hero film (prioritizing Dune 2 or the top now-playing film)
  const heroCandidate =
    nowPlaying.find((m) => m.title.toLowerCase().includes("dune")) ||
    nowPlaying[0] ||
    popular[0];

  // Fetch full details including trailer for the hero film
  const heroMovie = (await getMovieDetails(heroCandidate.id)) || heroCandidate;

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Cinematic Hero Banner */}
      <HeroBanner movie={heroMovie} />

      {/* 2. Live Discovery & Movie Explorer with Genre Filters & Sections */}
      <MovieExplorer
        nowPlaying={nowPlaying}
        popular={popular}
        upcoming={upcoming}
      />
    </div>
  );
}
