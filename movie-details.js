
const params = new URLSearchParams(location.seaarch)
const imdbID = params.get("id")?.trim()
const movieDetail = document.querySelector("#movie-detail")


if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {

    let res = await fetch(`https://www.omdbapi.com/?apikey=5c34d675&i=${imdbID}&plot=full`)
    let data = await res.json();
    console.log(data);

    if (data.Response === "True") {
        displayMovies(data)
    } else {
        console.log(data.Error);
    }

}

function displayMovies(data){

   movieDetail.innerHTML=  `        <div>
            <div>
                <img src=${data.Poster} alt="">
                <h2>${data.Title}</h2>
            </div>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>Imdb: ${data.imdbRating}</p>
            </section>
            <div>
                <p>Plot Overview</p>
                <p>${data.Plot}</p>
            </div>
        </div>

        <div>
            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p>Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>
            <div>
                <p>Actors</p>
                <p>${data.Actors}</p>
            </div>

            <div>
                <section>
                    <p>Language</p>
                    <p>${data.Language}</p>
                </section>
                <section>
                    <p>Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>
            <button>
            <a href = https://www.imdb.com/title/${data.imdbID} target="_blank">View on imdb</a>
            </button>
        </div>`
}