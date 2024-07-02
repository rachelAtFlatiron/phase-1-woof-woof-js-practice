//get the dog-bar element
//get the dog-info element
const info = document.getElementById("dog-info");
const nav = document.getElementById("dog-bar");
const url = "http://localhost:3000";

function renderDog(dog) {
	//clear out the info div of all previous dogs
	//before populating with new dog
	info.innerHTML = "";
	const img = document.createElement("img");
	const h2 = document.createElement("h2");
	const button = document.createElement("button");
	img.src = dog.image;
	h2.textContent = dog.name;
	if (dog.isGoodDog) {
		button.textContent = "Good Dog!";
	} else {
		button.textContent = "Bad Dog!";
	}
	//add another event listener to button
	button.addEventListener("click", (e) => {
		//check button content (if/else)
		//e.target.textContent, button.textContent
		let curVal = e.target.textContent;
		if (curVal === "Good Dog!") {
			e.target.textContent = "Bad Dog!";
		} else {
			e.target.textContent = "Good Dog!";
		}
	});
	info.append(img);
	info.append(h2);
	info.append(button);
}

//make fetch statement to grab the info
fetch(`${url}/pups`) //returns a promise
	.then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw "no";
		}
	})
	.then((data) => {
		//create new elements: img, h2, button
		//update those elements values
		//append to info
		//use data we already have (via our fetch) and look at first dog
		renderDog(data[0]);
		//foreach dog create a new nav/span element
		data.forEach((dog) => {
			//create a new element <span> and put in dog name
			let span = document.createElement("span");
			span.textContent = dog.name;
			//append span to dog-bar
			nav.append(span);
			//addEventListener for click (span)
			span.addEventListener("click", () => {
				renderDog(dog);
			});
		});
	});
