
const movieFrom = document.querySelector("#movie-form")
const movieInput = document.querySelector("#movie-input")
const movieHub = document.querySelector("#movieHub")
const hamburger = document.querySelector("#hamburger")
const option = document.querySelector("#option")
const about = document.querySelector("#about")

movieFrom?.addEventListener("submit", (e) => {
    e.preventDefault();

    let movieName = movieInput.value.trim();

    if (!movieName) {
        return
    }

    console.log(movieName);

    searchMovies(movieName)
})


async function searchMovies(movieName) {
    movieHub.innerHTML = `<div class="col-span-full flex justify-center py-20"><span class="loader"></span></div>`;


    if (about) {
        about.style.display = "none";
    }

    try {
         let response = await fetch(`https://www.omdbapi.com/?apikey=3eed3bad&s=${encodeURIComponent(movieName)}`);
        let data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieHub.innerHTML = `<p class="col-span-full text-center text-red-400 py-16 text-lg">${data.Error || 'No movies found.'}</p>`;
        }
    } catch (error) {
        movieHub.innerHTML = `<p class="col-span-full text-center text-red-400 py-16 text-lg">Error loading movies. Please try again.</p>`;
    }
}



function displayMovies(movies) {
    movieHub.innerHTML = "";

    movies.forEach((movie) => {
        const div = document.createElement("div");

        div.dataset.imdbID = movie.imdbID;
        div.className = "movie-card bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 cursor-pointer transition flex flex-col group";

        const poster = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : NO_POSTER;
        console.log({ poster, mp: movie.Poster });
        div.innerHTML = `
            <img 
                src="${poster}" 
                alt="${movie.Title}" 
                class="w-full h-80 object-cover"
            >
            <div class="p-4 flex-1 flex flex-col justify-between">
                <h3 class="font-semibold text-white text-base group-hover:text-red-500 transition-colors">${movie.Title}</h3>
                <p class="text-sm text-red-500 font-medium mt-2">${movie.Year}</p>
            </div>
        `;
        movieHub.append(div);
    });
}
movieHub?.addEventListener("click", (e) => {
    e.stopPropagation()
    const movieCard = e.target.closest(".movie-card")
    if (movieCard && movieCard.dataset.imdbID) {
        const imdbID = movieCard.dataset.imdbID

        location.href = `movie-details.html?id=${imdbID}`
    }
});
