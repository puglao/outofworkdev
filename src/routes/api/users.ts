import { Elysia, status, t } from "elysia";
import { createSelectSchema, createInsertSchema } from 'drizzle-typebox';
import { usersTable } from '../../db/schema';
import { createUser, getUserById, updateUser } from '../../services/user';

// Reusable schema definitions from Drizzle
const _selectUser = createSelectSchema(usersTable, {
    id: (schema) => ({ ...schema, minimum: 1 }),
    name: (schema) => ({ ...schema, minLength: 1, maxLength: 255 }),
    age: (schema) => ({ ...schema, minimum: 1, maximum: 150 }),
    email: (schema) => ({ ...schema, maxLength: 255, format: 'email' })
});
const _insertUser = createInsertSchema(usersTable, {
    name: (schema) => ({ ...schema, minLength: 1, maxLength: 255 }),
    age: (schema) => ({ ...schema, minimum: 1, maximum: 150 }),
    email: (schema) => ({ ...schema, maxLength: 255, format: 'email' })
});

// Avoid infinite type loop - assign to variable first
const UserSchema = _selectUser;
const CreateUserSchema = t.Omit(_insertUser, ['id']);
const UpdateUserSchema = t.Partial(t.Omit(_insertUser, ['id']));

const ErrorSchema = t.Object({
    error: t.String()
});

export const usersRoute = new Elysia({ prefix: '/users' })
    .get("/:id", async ({ params }) => {
        const user = await getUserById(params.id);
        if (!user) {
            status(404);
            return { error: "User not found" };
        }
        return user;
    },
        {
            params: t.Object({
                id: t.Number()
            }),
            response: {
                200: UserSchema,
                404: ErrorSchema
            },
            detail: {
                description: "Get user by ID",
                tags: ['User Management']
            }
        })
    .post("/", async ({ body }) => {
        return createUser(body.name, body.age, body.email)
    },
        {
            body: CreateUserSchema,
            response: {
                200: UserSchema,
                400: ErrorSchema
            },
            detail: {
                description: "Create a new user",
                tags: ['User Management']
            }
        }
    )
    .patch("/:id", async ({ params, body }) => {
        const user = await updateUser(params.id, body);
        if (!user) {
            status(404);
            return { error: "User not found" };
        }
        return user;
    },
        {
            params: t.Object({
                id: t.Number()
            }),
            body: UpdateUserSchema,
            response: {
                200: UserSchema,
                404: ErrorSchema,
                400: ErrorSchema
            },
            detail: {
                description: "Update a user",
                tags: ['User Management']
            }
        }
    );
