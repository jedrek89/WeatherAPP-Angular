import fetch from 'node-fetch';

exports.handler = async function(event, context, callback) {
    if (typeof event.queryStringParameters.location == 'undefined') {
        return{
            statusCode: 200,
            body: JSON.stringify("bad request") 
        }
    }
    
    // if body from POST method exist
    else{
        // API call
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${event.queryStringParameters.location}&units=metric&lang=en&&appid=${process.env.OpenWeatherKEY}`);
        response = await response.json()
        return{
            statusCode: 200,
            body: JSON.stringify(response),
        }
    }
}
