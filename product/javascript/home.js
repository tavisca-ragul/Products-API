const getDate = (date) => {
	date = new Date(date);
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function AJAXRequest(method, url, accept, func, args) {
	if(args === undefined) 
		args= "";
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
		render: (HTMLContent) => {
			let elem;
			const productsNavElement = document.getElementById(renderContent.nav.actionurl);
			productsNavElement.innerHTML = HTMLContent;

			if(document.getElementById(product.car.actionurl) !== null) {
				elem = document.getElementById(product.car.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.car.contenturl, "application/json", product.car.action));
			}

			if(document.getElementById(product.air.actionurl) !== null) {
				elem = document.getElementById(product.air.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.air.contenturl, "application/json", product.air.action));
			}

			if(document.getElementById(product.hotel.actionurl) !== null) {
				elem = document.getElementById(product.hotel.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.hotel.contenturl, "application/json", product.hotel.action));
			}

			if(document.getElementById(product.activity.actionurl) !== null) {
				elem = document.getElementById(product.activity.actionurl);
				elem.addEventListener("click", () => AJAXRequest("GET", product.activity.contenturl, "application/json", product.activity.action));
			}
		}
	}
}

const product = {
	actionurl: "product",
	car: {
		actionurl: "carProduct",
		contenturl: "http://localhost:51069/api/product/car",
		action: (responseText) => {
			const carDetails = JSON.parse(responseText);
			let tableElement, trElement, tdElement, buttonElement;
			const productElement = document.getElementById(product.actionurl);
			productElement.innerHTML = "";

			tableElement = document.createElement("table");

			trElement = document.createElement("tr");
			trElement.setAttribute("class", "product-details");
			 
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Name";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Model Name";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Source";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "destination";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "From Date";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "To Date";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Save";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Book";
			trElement.appendChild(tdElement);
			
			tableElement.appendChild(trElement);

			for(let list of carDetails) {
				trElement = document.createElement("tr");
				trElement.setAttribute("class", "product-details");
				 
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.name;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.model_name;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.source;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.destination;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.from_date);
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.to_date);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-save-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Save";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-book-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Book";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);
				
				tableElement.appendChild(trElement);
			}
			productElement.appendChild(tableElement);

			const saveElement = document.getElementsByClassName("product-details-save-btn");
			for(let btn of saveElement) {
				btn.addEventListener("click", function() {
					AJAXRequest("Put", `${product.car.contenturl}/${this.getAttribute("data-target")}/save`, "application/json", product.car.displayMessage);
				});
			}

			const bookElement = document.getElementsByClassName("product-details-book-btn");
			for(let btn of bookElement) {
				btn.addEventListener("click", function() { 
					AJAXRequest("Put", `${product.car.contenturl}/${this.getAttribute("data-target")}/book`, "application/json", product.car.displayMessage);
				});
			}
		},
		displayMessage : (responseText) => {
			alert(JSON.parse(responseText));
		}
	},
	air: {
		actionurl: "airProduct",
		contenturl: "http://localhost:51069/api/product/air",
		action: (responseText) => {
			const airDetails = JSON.parse(responseText);
			let tableElement, trElement, tdElement, buttonElement;
			const productElement = document.getElementById(product.actionurl);
			productElement.innerHTML = "";

			tableElement = document.createElement("table");

			trElement = document.createElement("tr");
			trElement.setAttribute("class", "product-details");
			 
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Name";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Source";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Destination";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Departure Date";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Departure Time";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Arrival Date";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Arrival Time";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Price";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Save";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Book";
			trElement.appendChild(tdElement);

			tableElement.appendChild(trElement);

			for(let list of airDetails) {
				trElement = document.createElement("tr");
				trElement.setAttribute("class", "product-details");
				 
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.name;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.source;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.destination;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.departure_date);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.departure_time;
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.arrival_date);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.arrival_time;
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.price;
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-save-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Save";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-book-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Book";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);
				
				tableElement.appendChild(trElement);
			}
			productElement.appendChild(tableElement);

			const saveElement = document.getElementsByClassName("product-details-save-btn");
			for(let btn of saveElement) {
				btn.addEventListener("click", function() {
					AJAXRequest("Put", `${product.air.contenturl}/${this.getAttribute("data-target")}/save`, "application/json", product.air.displayMessage);
				});
			}

			const bookElement = document.getElementsByClassName("product-details-book-btn");
			for(let btn of bookElement) {
				btn.addEventListener("click", function() { 
					AJAXRequest("Put", `${product.air.contenturl}/${this.getAttribute("data-target")}/book`, "application/json", product.air.displayMessage);
				});
			}
		},
		displayMessage : (responseText) => {
			alert(JSON.parse(responseText));
		}
	},
	hotel: {
		actionurl: "hotelProduct",
		contenturl: "http://localhost:51069/api/product/hotel",
		action: (responseText) => {
			const hotelDetails = JSON.parse(responseText);
			let tableElement, trElement, tdElement, buttonElement;
			const productElement = document.getElementById(product.actionurl);
			productElement.innerHTML = "";

			tableElement = document.createElement("table");

			trElement = document.createElement("tr");
			trElement.setAttribute("class", "product-details");
			 
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Name";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Location";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Check In";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Check Out";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Price";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Save";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Book";
			trElement.appendChild(tdElement);

			tableElement.appendChild(trElement);

			for(let list of hotelDetails) {
				trElement = document.createElement("tr");
				trElement.setAttribute("class", "product-details");
				 
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.name;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.location;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.check_in);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.check_out);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.price;
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-save-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Save";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-book-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Book";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);
				
				tableElement.appendChild(trElement);
			}
			productElement.appendChild(tableElement);

			const saveElement = document.getElementsByClassName("product-details-save-btn");
			for(let btn of saveElement) {
				btn.addEventListener("click", function() {
					AJAXRequest("Put", `${product.hotel.contenturl}/${this.getAttribute("data-target")}/save`, "application/json", product.hotel.displayMessage);
				});
			}

			const bookElement = document.getElementsByClassName("product-details-book-btn");
			for(let btn of bookElement) {
				btn.addEventListener("click", function() { 
					AJAXRequest("Put", `${product.hotel.contenturl}/${this.getAttribute("data-target")}/book`, "application/json", product.hotel.displayMessage);
				});
			}
		},
		displayMessage : (responseText) => {
			alert(JSON.parse(responseText));
		}
	},
	activity: {
		actionurl: "activityProduct",
		contenturl: "http://localhost:51069/api/product/activity",
		action: (responseText) => {
			const activityDetails = JSON.parse(responseText);
			let tableElement, trElement, tdElement, buttonElement;
			const productElement = document.getElementById(product.actionurl);
			productElement.innerHTML = "";

			tableElement = document.createElement("table");

			trElement = document.createElement("tr");
			trElement.setAttribute("class", "product-details");
			 
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Name";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Location";
			trElement.appendChild(tdElement);
			
			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "From Date";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "To Date";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Duration";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Price";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Save";
			trElement.appendChild(tdElement);

			tdElement = document.createElement("th");
			tdElement.setAttribute("class", "product-details-field");
			tdElement.innerText = "Book";
			trElement.appendChild(tdElement);

			tableElement.appendChild(trElement);

			for(let list of activityDetails) {
				trElement = document.createElement("tr");
				trElement.setAttribute("class", "product-details");
				 
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.name;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.location;
				trElement.appendChild(tdElement);
				
				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.from_date);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = getDate(list.to_date);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.duration;
				trElement.appendChild(tdElement);

				tdElement = document.createElement("th");
				tdElement.setAttribute("class", "product-details-field");
				tdElement.innerText = list.price;
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-save-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Save";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);

				tdElement = document.createElement("td");
				tdElement.setAttribute("class", "product-details-field");
				buttonElement = document.createElement("button");
				buttonElement.setAttribute("class", "product-details-book-btn");
				buttonElement.setAttribute("data-target", list.id);
				buttonElement.innerText = "Book";
				tdElement.appendChild(buttonElement);
				trElement.appendChild(tdElement);
				
				tableElement.appendChild(trElement);
			}
			productElement.appendChild(tableElement);

			const saveElement = document.getElementsByClassName("product-details-save-btn");
			for(let btn of saveElement) {
				btn.addEventListener("click", function() {
					AJAXRequest("Put", `${product.activity.contenturl}/${this.getAttribute("data-target")}/save`, "application/json", product.activity.displayMessage);
				});
			}

			const bookElement = document.getElementsByClassName("product-details-book-btn");
			for(let btn of bookElement) {
				btn.addEventListener("click", function() { 
					AJAXRequest("Put", `${product.activity.contenturl}/${this.getAttribute("data-target")}/book`, "application/json", product.activity.displayMessage);
				});
			}
		},
		displayMessage : (responseText) => {
			alert(JSON.parse(responseText));
		}
	}
}

const loadContent = () => {
	if(document.getElementById(renderContent.nav.actionurl) !== null)
		AJAXRequest("GET", renderContent.nav.contenturl, "text/html", renderContent.nav.render);
}

window.addEventListener("load", loadContent);