function AJAXRequest(method, url, accept, func, args) {
	if(args === undefined) 
		args= "";
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.setRequestHeader("Accept", accept);
	xhr.send(args);
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		}
	};
}

const renderContent = {
	nav: {
		actionurl: "productsNav",
		contenturl: "html/navbar.html",
		action: (HTMLContent) => {
			let elem;
			const productsNavElement = document.getElementById(renderContent.nav.actionurl);
			productsNavElement.innerHTML = HTMLContent;

			if(document.getElementById(product.car.actionurl) !== null) {
				elem = document.getElementById(product.car.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.car.renderurl, "text/html", product.car.render));
			}

			if(document.getElementById(product.air.actionurl) !== null) {
				elem = document.getElementById(product.air.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.air.renderurl, "text/html", product.air.render));
			}

			if(document.getElementById(product.hotel.actionurl) !== null) {
				elem = document.getElementById(product.hotel.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.hotel.renderurl, "text/html", product.hotel.render));
			}

			if(document.getElementById(product.activity.actionurl) !== null) {
				elem = document.getElementById(product.activity.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.activity.renderurl, "text/html", product.activity.render));
			}
		}
	}
}

const product = {
	actionurl: "productForm",
	car : {
		actionurl: "carProduct",
		renderurl: "html/carform.html",
		contenturl: "http://localhost:51069/api/product/car",
		name: {
			actionurl: "name"
		},
		modelName: {
			actionurl: "modelName"
		},
		source: {
			actionurl: "source"
		},
		destination: {
			actionurl: "destination"
		},
		fromDate: {
			actionurl: "fromDate"
		},
		toDate: {
			actionurl: "toDate"
		},
		render: (HTMLContent) => {
			const productFormElement = document.getElementById(product.actionurl);
			productFormElement.innerHTML = HTMLContent;

			productFormElement.addEventListener("submit", product.car.action);
		},
		action: (args) => {
			args.preventDefault();

			const carProduct = {
				name: document.getElementById(product.car.name.actionurl).value,
				model_name: document.getElementById(product.car.modelName.actionurl).value,
				source: document.getElementById(product.car.source.actionurl).value,
				destination: document.getElementById(product.car.destination.actionurl).value,
				from_date: document.getElementById(product.car.fromDate.actionurl).value,
				to_date: document.getElementById(product.car.toDate.actionurl).value,
				is_saved: false,
				is_booked: false
			}
			
			AJAXRequest(
				"Post", 
				product.car.contenturl, 
				"application/json",
				product.car.displayMessage,
				JSON.stringify(carProduct)
			);
		},
		displayMessage: (responseText) => {
			alert(JSON.parse(responseText));
		}
	},
	air: {
		actionurl: "airProduct",
		renderurl: "html/airform.html",
		contenturl: "http://localhost:51069/api/product/air",
		name: {
			actionurl: "name"
		},
		source: {
			actionurl: "source"
		},
		destination: {
			actionurl: "destination"
		},
		departureDate: {
			actionurl: "departureDate"
		},
		departureTime: {
			actionurl: "departureTime"
		},
		arrivalDate: {
			actionurl: "arrivalDate"
		},
		arrivalTime: {
			actionurl: "arrivalTime"
		},
		price: {
			actionurl: "price"
		},
		render: (HTMLContent) => {
			const productFormElement = document.getElementById(product.actionurl);
			productFormElement.innerHTML = HTMLContent;

			productFormElement.addEventListener("submit", product.air.action);
		},
		action: (args) => {
			args.preventDefault();
			
			const airProduct = {
				name: document.getElementById(product.air.name.actionurl).value,
				source: document.getElementById(product.air.source.actionurl).value,
				destination: document.getElementById(product.air.destination.actionurl).value,
				departure_date: document.getElementById(product.air.departureDate.actionurl).value,
				departure_time: document.getElementById(product.air.departureTime.actionurl).value,
				arrival_date: document.getElementById(product.air.arrivalDate.actionurl).value,
				arrival_time: document.getElementById(product.air.arrivalTime.actionurl).value,
				price: document.getElementById(product.air.price.actionurl).value,
				is_saved: false,
				is_booked: false
			}

			AJAXRequest(
				"Post", 
				product.air.contenturl, 
				"application/json",
				product.air.displayMessage,
				JSON.stringify(airProduct)
			);
		},
		displayMessage: (responseText) => {
			alert(JSON.parse(responseText));
		}
	},
	hotel: {
		actionurl: "hotelProduct",
		renderurl: "html/hotelform.html",
		contenturl: "http://localhost:51069/api/product/hotel",
		name: {
			actionurl: "name"
		},
		location: {
			actionurl: "location"
		},
		checkIn: {
			actionurl: "checkIn"
		},
		checkOut: {
			actionurl: "checkOut"
		},
		price: {
			actionurl: "price"
		},
		render: (HTMLContent) => {
			const productFormElement = document.getElementById(product.actionurl);
			productFormElement.innerHTML = HTMLContent;

			productFormElement.addEventListener("submit", product.hotel.action);
		},
		action: (args) => {
			args.preventDefault();
			
			const airProduct = {
				name: document.getElementById(product.hotel.name.actionurl).value,
				location: document.getElementById(product.hotel.location.actionurl).value,
				check_in: document.getElementById(product.hotel.checkIn.actionurl).value,
				check_out: document.getElementById(product.hotel.checkOut.actionurl).value,
				price: document.getElementById(product.hotel.price.actionurl).value,
				is_saved: false,
				is_booked: false
			}

			AJAXRequest(
				"Post", 
				product.hotel.contenturl, 
				"application/json",
				product.hotel.displayMessage,
				JSON.stringify(airProduct)
			);
		},
		displayMessage: (responseText) => {
			alert(JSON.parse(responseText));
		}
	},
	activity: {
		actionurl: "activityProduct",
		renderurl: "html/activityform.html",
		contenturl: "http://localhost:51069/api/product/activity",
		name: {
			actionurl: "name"
		},
		location: {
			actionurl: "location"
		},
		fromDate: {
			actionurl: "fromDate"
		},
		toDate: {
			actionurl: "toDate"
		},
		duration: {
			actionurl: "duration"
		},
		price: {
			actionurl: "price"
		},
		render: (HTMLContent) => {
			const productFormElement = document.getElementById(product.actionurl);
			productFormElement.innerHTML = HTMLContent;

			productFormElement.addEventListener("submit", product.activity.action);
		},
		action: (args) => {
			args.preventDefault();
			
			const activityProduct = {
				name: document.getElementById(product.activity.name.actionurl).value,
				location: document.getElementById(product.activity.location.actionurl).value,
				from_date: document.getElementById(product.activity.fromDate.actionurl).value,
				to_date: document.getElementById(product.activity.toDate.actionurl).value,
				duration: document.getElementById(product.activity.duration.actionurl).value,
				price: document.getElementById(product.activity.price.actionurl).value,
				is_saved: false,
				is_booked: false
			}

			AJAXRequest(
				"Post", 
				product.activity.contenturl, 
				"application/json",
				product.activity.displayMessage,
				JSON.stringify(activityProduct)
			);
		},
		displayMessage: (responseText) => {
			alert(JSON.parse(responseText));
		}
	}
}

const loadContent = () => {
	if(document.getElementById(renderContent.nav.actionurl) !== null)
		AJAXRequest("GET", renderContent.nav.contenturl, "text/html", renderContent.nav.action);
}

window.addEventListener("load", loadContent);