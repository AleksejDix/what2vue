import category from '@/api/repos/categories'
import genre from '@/api/repos/genre'
import movie from '@/api/repos/movie'
import movieCategory from '@/api/repos/movieCategory'
import movieVideos from '@/api/repos/movieVideos'
import movieCredits from '@/api/repos/movieCredits'
import movieDiscover from '@/api/repos/movieDiscover'
import person from '@/api/repos/person'
import personMovies from '@/api/repos/personMovies'
import personImages from '@/api/repos/personImages'
import requestToken from '@/api/repos/requestToken'
import accessToken from '@/api/repos/accessToken'
import searchMulti from '@/api/repos/searchMulti'
import countries from '@/api/repos/countries'
import account from '@/api/repos/account'
import session from '@/api/repos/session'

const api = {
  category,
  movie,
  genre,
  movieCategory,
  movieDiscover,
  movieCredits,
  movieVideos,
  person,
  personMovies,
  personImages,
  requestToken,
  accessToken,
  searchMulti,
  countries,
  account,
  session,
}
export default api
