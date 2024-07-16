import { APIGatewayProxyHandler } from 'aws-lambda';

const namesList = [
    'David Smith 大卫 斯密斯',
    'Yueling Zhang 月林张',
    'Huawen Wu 华文吴',
    'Annie Lee 李安妮',
    'vineeth'
];

export const handler: APIGatewayProxyHandler = async (event) => {
    const inputName = event.queryStringParameters?.name || '';

    if (!inputName.trim()) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Input name cannot be empty or null',
            }),
        };
    }

    const bestMatch = findBestMatch(inputName, namesList);

    if (!bestMatch) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'Match not found',
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Ready to match',
            input: inputName,
            match: bestMatch
        }),
    };
};

function findBestMatch(input: string, names: string[]): string | null {
    const inputParts = input.trim().toLowerCase().split(/\s+/).sort();
    let bestMatch: string | null = null;
    let bestMatchScore = -1;

    for (const name of names) {
        const nameParts = name.trim().toLowerCase().split(/\s+/).sort();
        
        // Check if all input parts match at least one name part
        if (inputParts.every(part => nameParts.some(namePart => namePart.includes(part)))) {
            return name; // Return the first matching name
        }
    }

    return null; // Return null if no match found
}
