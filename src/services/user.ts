import { db } from '../db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export const createUser = async (name: string, age: number, email: string) => {
    const result = await db.insert(usersTable).values({ name, age, email }).returning();
    return result[0]; // Return single user object
}

export const getUserById = async (id: number) => {
    const user = await db.select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .limit(1);
    return user[0]; // Return single user object or undefined
}

export const updateUser = async (id: number, data: { name?: string; age?: number; email?: string }) => {
    const result = await db.update(usersTable)
        .set(data)
        .where(eq(usersTable.id, id))
        .returning();
    return result[0]; // Return updated user object or undefined
}
