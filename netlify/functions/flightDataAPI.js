import fetch from 'node-fetch';

options = {
    method: 'GET',
    headers: {
        'X-Access-Token': process.env.FlightDataToken,
        'xRapidAPIHost': process.env.xRapidAPIHost,
        'X-RapidAPI-Key': process.env.FlightDataKey,
    }
};

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
        let response = await fetch(`https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/week-matrix?destination=${eventBody.flyTo}&origin=${eventBody.flyFrom}&currency=${eventBody.currency}&show_to_affiliates=true&depart_date=${eventBody.departureDate}&return_date=${eventBody.returnDate}`, options);
        response = await response.json()
        return{
            statusCode: 200,
            body: JSON.stringify(response),
        }
    }
}