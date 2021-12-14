function time(str) {
	let hours = Math.floor((str / 60));

	let minutes = str - hours * 60;

	return `${hours} ч. ${minutes} мин. `
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function random() {
	let active = false;

	main.addEventListener('click', function (event) {

		if (active) {

			if (event.target.classList.contains('movieCard') || event.target.classList.contains('movieCard__main-cancel')) {
				let movieCard = document.querySelector('.movieCard');
				movieCard.remove()
			}
		}
	})

	active = true;
	let id = getRandomInt(0, 10000);

	fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': '6d3fa7eb-964c-4dce-aa30-a6c0cd86cdf7',
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(json => {

			let movieCard = document.createElement("div");
			movieCard.classList.add('movieCard');
			movieCard.style.opacity = '0';
			movieCard.innerHTML = `<div class="movieCard__main">

				<div class="movieCard__main__mainImg">
					<img class="movieCard__main__mainImg-img" src="${json.posterUrl ? json.posterUrl : ""}" alt="">
				</div>
				<div class="movieCard__main__info">
					<div class="movieCard__main__info__title">
						<h1 class="movieCard__main__info__title-mainTitle">${json.nameRu ? json.nameRu : ""}</h1>
						<h2 class="movieCard__main__info__title-secTitle">${json.nameOriginal ? json.nameOriginal : ""}</h2>
						<h3 class="movieCard__main__info__title-slogan">${json.slogan ? json.slogan : ""}</h3>
					</div>
					<div class="movieCard__main__info__props">
						<span class="movieCard__main__info__props-genre">Жанры: ${json.genres.map(el =>
				Object.values(el).join('')).join(', ')}</span>
						<span class="movieCard__main__info__props-year">Год выпуска: ${json.year}</span>
						<span class="movieCard__main__info__props-time">Длительность: ${time(json.filmLength)}</span>
						<span class="movieCard__main__info__props-rating">${json.ratingKinopoisk ? "Рейтинг: " + json.ratingKinopoisk : ""}</span>

					</div>
					<div class="movieCard__main__info__discription">
						<p class="movieCard__main__info__discription-text">
							${json.description ? json.description : ""}
						</p>
					</div>
				</div>
				<div class="movieCard__main-cancel"></div>
			</div>`;
			main.append(movieCard);
			setTimeout(() => movieCard.style.opacity = '1', 100);
		})



}