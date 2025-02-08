import { MongoClient } from 'mongodb';

async function testConnection() {
    const uri = '';
    const client = new MongoClient(uri);

    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected successfully');
        const db = client.db('motiv');
        console.log('Database:', db.databaseName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

testConnection();
