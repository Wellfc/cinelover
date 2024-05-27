/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*                                                       */
/*  Andre Specht (2024)                                  */
/*  github.com/mrspecht                                  */
/*                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';
import movies from '../data/movies.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Organizer                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const movieQuery = utils.select('.movie-query');
const moviesAvailable = utils.select('.movies-available');
const findMovies = utils.select('.find');
const details = utils.select('.movie-details');

