
async function getWeather() {
    const weather = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/cape-town?key=RYVZ9HUDWNFTC464734F3YQK6")
        .catch(function (err) {
            console.error(err);
            throw err;
        });
    return weather.json();
}

function displayWeather(weather) {
    if (!weather) {
        console.log("Fetch error");
        return;
    }
    console.log("Date: " + weather.days[0].datetime);
}

async function main() {
    const weather = await getWeather();
    displayWeather(weather);
}

main();
