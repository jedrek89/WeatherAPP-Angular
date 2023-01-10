import fetch from 'node-fetch';

exports.handler = async function(event, context, callback) {
    if (typeof event.body === 'undefined') {
        return{
            statusCode: 200,
            body: JSON.stringify("bad request") 
        }
    }

    // if body from POST method exist
    else{
        let eventBody = JSON.parse(event.body); // convert JSON fromat to object
        // API call
        console.log("event.body", event.body);
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=warsaw&units=metric&lang=en&&appid=${process.env.OpenWeatherKEY}`);
        response = await response.json()
        return{
            statusCode: 200,
            body: JSON.stringify(response),
        }
    }
}