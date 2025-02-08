import { APIGatewayProxyResult } from 'aws-lambda';
import { getDatabase } from '../../utils/dbClient';

export const getAllUsersHandler = async (): Promise<APIGatewayProxyResult> => {
    try {
        const db = await getDatabase();
        const users = await db.collection('users').find().toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(users),
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
