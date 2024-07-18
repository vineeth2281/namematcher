import { APIGatewayProxyHandler } from 'aws-lambda';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const stringSimilarity = require('string-similarity');


const apiKey = process.env.API_KEY;


const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const prompt = "Extract name and normalize it to english from the following: ";
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

const fullPrompt = `${prompt}${inputName}`;

const result = await model.generateContent(fullPrompt);
const response = await result.response; 
const text = response.text();
const bestMatch = findBestMatch(text, namesList);

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
        message: 'Match found !',      
        inputName: inputName,         
        bestmatch: bestMatch            
    }),
};

    
};

function findBestMatch(input: string, names: string[], threshold = 0.5): string | null {
    const inputNormalized = input.trim().toLowerCase();
    const matches = names.map(name => {
        const nameNormalized = name.trim().toLowerCase();
        const similarity = stringSimilarity.compareTwoStrings(inputNormalized, nameNormalized);
        return { name, similarity };
    });
    matches.sort((a, b) => b.similarity - a.similarity);

    if (matches.length > 0 && matches[0].similarity >= threshold) {
        return matches[0].name;
    } else {
        return null;
    }
}

