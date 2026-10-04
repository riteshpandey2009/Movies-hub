
const movieFrom = document.querySelector("#movie-form")
const movieInput = document.querySelector("#movie-input")
const movieHub = document.querySelector("#movieHub")
const hamburger = document.querySelector("#hamburger")
const option = document.querySelector("#option")

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

    movieHub.innerHTML = `<p class="loader"></p>`
    let res = await fetch(`https://www.omdbapi.com/?apikey=5c34d675&s=${encodeURIComponent(movieName)}`)
    let data = await res.json();
    console.log(data);

    if (data.Response === "True") {
        displayMovies(data.Search)
    }
    else {
        movieHub.innerHTML = `<p>${data.Error}</p>`
    }


}

function displayMovies(movies) {

    movieHub.innerHTML = ""

    movies.forEach((movie) => {

        const div = document.createElement("div")

        div.dataset.imdbID = movie.imdbID
        div.setAttribute("class", "movie-card")
        div.innerHTML =
            `  <div>
                <img src="${movie.Poster}" alt="">
            </div>
            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
            </div>
        `
        movieHub?.append(div)
    })

}

movieHub?.addEventListener("click", (e) => {
    e.stopPropagation()

    const movieCard = e.target.closest(".movie-card")

    const imdbID = movieCard.dataset.imdbID

    location.href = `movie-details.html?id=${imdbID}`

})


hamburger?.addEventListener("click" , (e)=>{
    e.stopPropagation();

    option?.classList.toggle("hidden")
    
    console.log("hii");    
})