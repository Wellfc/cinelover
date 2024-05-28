/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*                                                       */
/*  Wellington Suero (2024)                              */
/*  github.com/Wellfc                                    */
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

// Movie List
const movieList = movies.map(movie => {
    return {
        title: movie.title,
        year: movie.year,
        duration: movie.runningTime,
        plot: movie.description,
        genre: movie.genre,
        poster: movie.poster
    }
});

// Movies Titles
const movieTitles = movieList.map(movie => movie.title);

let currentDisplayedMovie = '';

//Show list of movies found
function showMoviesFound(movies) {
    const maxMoviesToShow = 5;
    const moviesToDisplay = movies.slice(0, maxMoviesToShow);

    moviesAvailable.innerHTML = '';
    moviesAvailable.innerHTML = `
        <ul class="movies-list">
            ${moviesToDisplay.map(movie =>
                `<li class="list-item">${movie}</li>`).join('')}
        </ul>
    `;

    // Add event listeners to each list item
    const listItems = utils.selectAll('.list-item');
    listItems.forEach(item => {
        utils.listen('click', item, () => {
            movieQuery.value = item.textContent;
            findMovies.focus();
            moviesAvailable.style.visibility = 'hidden';
        });
    });
}

//Show movie result
function displayMovie(movie) {
    details.innerHTML = '';
    details.innerHTML = `
        <div class="movie-poster">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        </div>
        <div class="movie-info">
            <h2 class="movie-title">${movie.title}</h2>
            <div class="movie-data">
                <span class="movie-year">${movie.year}</span>
                <span class="separator"></span>
                <span class="movie-duration">${movie.duration}</span>
            </div>
            <p class="movie-plot">${movie.plot}</p>
            <div class="movie-genre">
                ${movie.genre.map(genre => `<span class="genre">${genre}</span>`).join('')}
            </div>
        </div>
    `;
    currentDisplayedMovie = movie.title;
}

// Find movie
utils.listen('click', findMovies, () => {
    if (movieQuery.value !== currentDisplayedMovie) {
        const movie = movieList.find(movie => movie.title === movieQuery.value);
        // utils.print(movie);
        if (movie) {
            displayMovie(movie);
            findMovies.focus();
        } else {
            moviesAvailable.innerHTML = `
            <ul class="movies-list">
                <li class="not-found">Movie not found</li>
            </ul>
        `;
        }
    } else {
        // utils.print('Movie already displayed');
        movieQuery.focus();
    }
});

// Show movies available
utils.listen('keyup', movieQuery, () => {
    let query = movieQuery.value.toLowerCase().trim();

    if (query.length > 2) {
        const movies = movieTitles.filter(movie => movie.toLowerCase().includes(query));
        if (movies.length) {
            showMoviesFound(movies);
            moviesAvailable.style.visibility = 'visible';
        } else {
            moviesAvailable.innerHTML = `
                <ul class="movies-list">
                    <li class="not-found">Movie not found</li>
                </ul>
            `;
            moviesAvailable.style.visibility = 'visible';
        }
    } else {
        moviesAvailable.style.visibility = 'hidden';
    }
});

// Prevent form submission on button click
const searchForm = utils.select('#search-form');
utils.listen('submit', searchForm, event => {
    event.preventDefault();
});
