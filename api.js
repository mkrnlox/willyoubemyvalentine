// api/my-function.js
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);  // Парсим тело запроса
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Request received', data: data })
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }
};
