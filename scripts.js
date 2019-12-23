const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

// placing the logo image and container div to the app root
app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest()

// open a new connection using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.onload = function() {
	// begin accessing json data here
	var data = JSON.parse(this.response)

	// log each movie's title, and add some error handling
	if (request.status >= 200 && request.status < 400) {
		data.forEach(movie => {
			// create a div with a card class
			const card = document.createElement('div')
			card.setAttribute('class', 'card')

			// create an h1 and set the text content to the film's title
			const h1 = document.createElement('h1')
			h1.textContent = movie.title

			// create a p and set the text content to the film's description
			const p = document.createElement('p')
			movie.description = movie.description.substring(0, 300) // limit to 300 chars
			p.textContent = `${movie.description}...` // end with ellipses to indicate there's more content

			// append the cards to the container element
			container.appendChild(card)

			// each card will contain an h1 and a p
			card.appendChild(h1)
			card.appendChild(p)
		})
	} else {
		// console.log('error') replaced with following
		const errorMessage = document.createElement('p')
		errorMessage.textContent = `gah, it's not working!`
		app.appendChild(errorMessage)
	}
}
// send request
request.send()

