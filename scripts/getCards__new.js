function getCards__new(pageNumber) {
	pageNumber = pageNumber * 20;
	fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2021&month=NOVEMBER&', {
		method: 'GET',
		headers: {
			'X-API-KEY': '6d3fa7eb-964c-4dce-aa30-a6c0cd86cdf7',
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(json => {
			if (pageNumber - 10 > json.total) return;
			for (let i = pageNumber - 20; i < pageNumber; i++) {

				main.innerHTML += `<div class="card">
			<div class="card__imgbox">
				<img src="${json.items[i].posterUrlPreview}" alt="" class="card__imgbox-img">
			</div>
			<div class="card__title">
				<span class="card__title-main">${json.items[i].nameRu.length <= 29 ? json.items[i].nameRu : json.items[i].nameRu.slice(0, 29) + "..."}</span>
				<span class="card__title-eng">${json.items[i].nameEn}</span>
			</div>
			<div class="card__id" style='display:none'>${json.items[i].kinopoiskId}</div>
			
			<div class="card__button">
				<button class="card__button-watch">Смотреть</button>
				<button class="card__button-more">Подробнее</button>
			</div>
		</div>`
			}
		})

}