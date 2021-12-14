let genres = {}
function fillGenres() {
	return fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/filters', {
		method: 'GET',
		headers: {
			'X-API-KEY': '6d3fa7eb-964c-4dce-aa30-a6c0cd86cdf7',
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(json => {
			json.genres.forEach(el => {

				genres[el.genre] = el.id

			})

		})
}
function get__genre(pageNumber) {
	document.querySelector('.search-text').textContent = localStorage.getItem('filmGenre')
	return fillGenres()
		.then(() => {

			return fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${genres[localStorage.getItem('filmGenre')]}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2021&page=${pageNumber}`, {
				method: 'GET',
				headers: {
					'X-API-KEY': '6d3fa7eb-964c-4dce-aa30-a6c0cd86cdf7',
					'Content-Type': 'application/json',
				},
			})
				.then(res => res.json())
				.then(json => {
					console.log(pageNumber, json.pagesCount);
					if (pageNumber > json.pagesCount) return
					console.log(json);
					for (let i = 0; i < 20; i++) {
						main.innerHTML += `<div class="card">
			<div class="card__imgbox">
				<img src="${json.films[i].posterUrlPreview}" alt="" class="card__imgbox-img">
			</div>
			<div class="card__title">
				<span class="card__title-main">${json.films[i].nameRu.length <= 25 ? json.films[i].nameRu : json.films[i].nameRu.slice(0, 25) + "..."}</span>
				<span class="card__title-eng">${json.films[i].nameEn}</span>
			</div>
			<div class="card__id" style='display:none'>${json.films[i].filmId}</div>
			<div class="card__button">
				<button class="card__button-watch">Смотреть</button>
				<button class="card__button-more">Подробнее</button>
			</div>
		</div>`
					}
				})
		})
}