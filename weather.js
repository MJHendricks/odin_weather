const weatherDisplay = document.createElement("div");
weatherDisplay.classList.add("weather");

const locationText = document.createElement("label");
locationText.textContent = "Location: ";
locationText.classList.add("labels");

const dateText = document.createElement("label");
dateText.textContent = "Date: ";
dateText.classList.add("labels");

const descriptionText = document.createElement("label");
descriptionText.textContent = "";
descriptionText.classList.add("labels");

const tempText = document.createElement("label");
tempText.textContent = "";
tempText.classList.add("labels");




async function getWeather(location) {
    const weather = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=RYVZ9HUDWNFTC464734F3YQK6")
        .catch(function (err) {
            console.error(err);
            throw err;
        });
    return weather.json();
}

function displayWeather(weather) {
    if (!weather) {
        console.log("Location error");
        return;
    }
    locationText.textContent = "Location: " + weather.resolvedAddress;
    dateText.textContent = "Date: " + weather.days[0].datetime;
    tempText.textContent = weather.currentConditions.temp + "F";
    descriptionText.textContent = weather.description;

}

const inputBox = document.createElement("input");
inputBox.type = "text";
inputBox.placeholder = "Enter Location...";

const submitButton = document.createElement("button");
submitButton.textContent = "Submit";

//button submit is essentially "main"
submitButton.addEventListener("click", async () => {
    const loc = inputBox.value.replaceAll(" ", "-");
    const weather = await getWeather(loc);
    displayWeather(weather);
});

document.body.appendChild(inputBox);
document.body.appendChild(submitButton);



document.body.appendChild(weatherDisplay);
weatherDisplay.appendChild(locationText);
weatherDisplay.appendChild(dateText);
weatherDisplay.appendChild(tempText);
weatherDisplay.appendChild(descriptionText);


//toggle for the sake of simplicity. beats having to create two seperate buttons with styling
const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Unit";


toggleButton.addEventListener("click", () => {
    let temp = tempText.textContent.slice(0, -1);
    if (tempText.textContent.at(-1) == "F") {
        temp = (temp - 32) * 0.55;
        temp = Math.round(temp);
        tempText.textContent = temp + "C";
    }
    else {
        temp = (temp / 0.55) + 32;
        temp = Math.round(temp);
        tempText.textContent = temp + "F";
    }
});

document.body.appendChild(toggleButton);

