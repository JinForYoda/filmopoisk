function search(str, pageNumber) {
	document.querySelector('.search-text').textContent = str
	let searchCode = encodeURI(str)
	return fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchCode}&page=${pageNumber}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': '6d3fa7eb-964c-4dce-aa30-a6c0cd86cdf7',
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(json => {

			for (let i = 0; i < 20; i++) {
				main.innerHTML += `<div class="card">
			<div class="card__imgbox">
				<img src="${json.films[i].posterUrlPreview ? json.films[i].posterUrlPreview : ""}" alt="" class="card__imgbox-img">
			</div>
			<div class="card__title">
				<span class="card__title-main">${json.films[i].nameRu.length <= 25 ? json.films[i].nameRu : json.films[i].nameRu.slice(0, 25) + "..."}</span>
				<span class="card__title-eng">${json.films[i].nameEn ? json.films[i].nameEn : ""}</span>
			</div>
			<div class="card__id" style='display:none'>${json.films[i].filmId}</div>
			<div class="card__button">
				<button class="card__button-watch">Смотреть</button>
				<button class="card__button-more">Подробнее</button>
			</div>
		</div>`
			}

		})



}