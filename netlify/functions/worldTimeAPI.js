import fetch from 'node-fetch';

exports.handler = async function(event, context, param1, param2) {
    const response = await fetch(process.env.WorldTimeURL)
    const data = await response.json()

    return{
    statusCode: 200,
    body: JSON.stringify({message: data})
    }
}