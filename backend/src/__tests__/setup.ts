/**
 * Test setup: connect/disconnect MongoDB for integration tests.
 * Use in beforeAll/afterAll of test files that need the database.
 */
import { connectDB, disconnectDB } from '../config/database';

export async function setupDb(): Promise<void> {
  await connectDB();
}

export async function teardownDb(): Promise<void> {
  await disconnectDB();
}
