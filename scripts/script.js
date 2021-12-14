let path = window.location.pathname;
let page = path.split("/").pop();
let main = document.querySelector('main');
let pageNumber = 1;

let genre = document.querySelector('.genre');


genre.onmouseenter = function (event) {

	document.querySelector('.genre__block').classList.toggle('dropdown')

}

genre.onmouseleave = function (event) {
	document.querySelector('.genre__block').classList.toggle('dropdown')
}


genre.onclick = function (event) {
	if (!event.target.closest('DIV').classList.contains("genre__block__name")) return
	localStorage.setItem('filmGenre', (((event.target.querySelector('.genre__block__name-link') || event.target).textContent).toLowerCase()));


}

switch (page) {
	case 'index.html':
		window.location.href = "new.html"
		break

	case 'top.html':
		getCards__top(pageNumber)

		break
	case 'new.html':
		getCards__new(pageNumber)

		break

	case 'genre.html':
		get__genre(pageNumber)
		break
}

switch (page) {
	case "search.html": document.querySelector('.navigation__search__imgbox').classList.toggle('active')
		search(localStorage.getItem('searchStr'), pageNumber)
		break
	default:
		document.querySelector(`[href = "${page}"]`).closest("li").classList.toggle('active')

}
getMainCard()
document.addEventListener('click', function (event) {

	if (event.target.textContent === "Случайное") { random() }
	else if (event.target.closest('DIV').classList.contains("navigation__search__imgbox")) { localStorage.setItem("searchStr", document.querySelector('.navigaton__search-input').value) }
	else return
})



document.addEventListener('search', function (event) {
	localStorage.setItem("searchStr", document.querySelector('.navigaton__search-input').value);
	window.location.href = "search.html"
})



let active;
function addScroll() {
	let scroll = 1200;

	if (document.documentElement.getBoundingClientRect().bottom < scroll) {

		switch (page) {
			case "top.html":
				pageNumber++;
				active = getCards__top(pageNumber)
				active.catch(e => document.removeEventListener('scroll', addScroll))


				break

			case "new.html":
				pageNumber++;
				getCards__new(pageNumber)
				break

			case "genre.html":
				pageNumber++;
				get__genre(pageNumber)
				active = get__genre(pageNumber)

				active.catch(e => document.removeEventListener('scroll', addScroll))
				break

			case "search.html":
				pageNumber++;
				active = search(localStorage.getItem('searchStr'), pageNumber);
				active.catch(e => document.removeEventListener('scroll', addScroll))
				break

		}

	}
}
document.addEventListener('scroll', addScroll)




