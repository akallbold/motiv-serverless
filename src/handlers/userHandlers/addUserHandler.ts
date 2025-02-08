import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getDatabase } from '../../utils/dbClient';
// TODO add later as argument event: APIGatewayProxyEvent
export const addUserHandler = async (): Promise<APIGatewayProxyResult> => {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    console.log('MONGODB_DB_NAME:', process.env.MONGODB_DB_NAME);

    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB_NAME) {
        throw new Error('Missing environment variables for MongoDB');
    }
    console.log('Received event:', JSON.stringify(event, null, 2)); // Log event for debugging

    try {
        const db = await getDatabase();
        const usersCollection = db.collection('users');

        const userData = JSON.parse(event.body);
        console.log('User data parsed:', userData);

        const response = await usersCollection.insertOne(userData);
        console.log('Database response:', response);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User added successfully!', response }),
        };
    } catch (error) {
        console.error('Error adding user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
