import { Elysia } from "elysia"
import { isHtml, Html } from "@elysiajs/html";
import { Layout } from "./layout";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { getUserById, updateUser, createUser } from "../../services/user";
import { eq } from "drizzle-orm";

const HomePage = () => (
  <Layout>
    <div class="max-w-4xl mx-auto">
      {/* Theme Toggle */}
      <div class="flex justify-end mb-4">
        <button
          onclick="toggleTheme()"
          class="p-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all"
          aria-label="Toggle theme"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-yellow-300 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg class="w-6 h-6 text-yellow-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>

      {/* Header Section */}
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white rounded-xl p-8 mb-8 shadow-lg">
        <h1 class="text-4xl font-bold mb-3">Knowledge Base</h1>
        <p class="text-blue-100 dark:text-blue-200 text-lg">A single source of truth consumable by AI agents</p>
      </div>

      {/* Main Content Card */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-6 transition-colors">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Getting Started</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          This knowledge base system helps organizations build centralized documentation that AI agents can easily consume and reference.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <a
            href="/api/openapi"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View API Documentation
          </a>
          <a
            href="/users"
            class="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium rounded-lg shadow-sm transition-colors justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            View Users
          </a>
          <a
            href="/api/healthz"
            class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition-colors justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Health Check
          </a>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Available API Endpoints</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2">
              <span class="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded font-mono text-xs">GET</span>
              <code class="text-gray-700 dark:text-gray-300">/api/users/:id</code>
              <span class="text-gray-500 dark:text-gray-400">- Get user by ID</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded font-mono text-xs">POST</span>
              <code class="text-gray-700 dark:text-gray-300">/api/users/</code>
              <span class="text-gray-500 dark:text-gray-400">- Create new user</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded font-mono text-xs">PATCH</span>
              <code class="text-gray-700 dark:text-gray-300">/api/users/:id</code>
              <span class="text-gray-500 dark:text-gray-400">- Update user</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Documentation</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Centralized knowledge accessible by AI agents</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">API First</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">REST & AsyncAPI for seamless integration</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Real-time</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Live updates via WebSocket & SSE</p>
        </div>
      </div>
    </div>
  </Layout>
);

const UsersPage = ({ users }: { users: any[] }) => (
  <Layout>
    <div class="max-w-6xl mx-auto">
      {/* Header */}
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Users</h1>
          <p class="text-gray-600 dark:text-gray-400">Manage and view all users in the system</p>
        </div>
        <a
          href="/"
          class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </a>
      </div>

      {/* Action Buttons */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <div class="flex gap-3">
          <button
            hx-get="/users/create"
            hx-target="#create-user-form"
            hx-swap="innerHTML"
            class="p-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg shadow-sm transition-colors"
            title="Create User"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            hx-get="/users/list"
            hx-target="#users-list"
            hx-swap="innerHTML"
            class="p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors"
            title="Refresh Users"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Create User Form Container */}
      <div id="create-user-form" class="mb-6"></div>

      {/* Users List Container */}
      <div id="users-list" class="min-h-[200px]">
        <UsersList users={users} />
      </div>
    </div>
  </Layout>
);

const UserCard = ({ user }: { user: any }) => (
  <div id={`user-${user.id}`} class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div class="ml-4">
          <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-lg">{user.name}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">ID: {user.id}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          hx-get={`/users/${user.id}/edit`}
          hx-target={`#user-${user.id}`}
          hx-swap="outerHTML"
          class="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Edit user"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          hx-delete={`/users/${user.id}`}
          hx-target={`#user-${user.id}`}
          hx-swap="outerHTML swap:1s"
          hx-confirm="Are you sure you want to delete this user?"
          class="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Delete user"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    <div class="space-y-2 text-sm">
      <div class="flex items-center text-gray-600 dark:text-gray-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {user.email}
      </div>
      <div class="flex items-center text-gray-600 dark:text-gray-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Age: {user.age}
      </div>
    </div>
  </div>
);

const UserEditForm = ({ user }: { user: any }) => (
  <div id={`user-${user.id}`} class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-blue-500 dark:border-blue-600">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-lg">Edit User</h3>
      <button
        hx-get={`/users/${user.id}/card`}
        hx-target={`#user-${user.id}`}
        hx-swap="outerHTML"
        class="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title="Cancel"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <form
      hx-patch={`/users/${user.id}`}
      hx-target={`#user-${user.id}`}
      hx-swap="outerHTML"
      class="space-y-4"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={user.age}
          min="1"
          max="150"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div class="flex gap-2">
        <button
          type="submit"
          class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          hx-get={`/users/${user.id}/card`}
          hx-target={`#user-${user.id}`}
          hx-swap="outerHTML"
          class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

const CreateUserForm = () => (
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-green-500 dark:border-green-600">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-lg">Create New User</h3>
      <button
        onclick="document.getElementById('create-user-form').innerHTML = ''"
        class="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <form
      hx-post="/users/create"
      hx-target="#users-grid"
      hx-swap="afterbegin"
      hx-on--after-request="this.reset(); document.getElementById('create-user-form').innerHTML = ''"
      class="space-y-4"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input
          type="text"
          name="name"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
        <input
          type="number"
          name="age"
          min="1"
          max="150"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      <div class="flex gap-2">
        <button
          type="submit"
          class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Create User
        </button>
        <button
          type="button"
          onclick="this.closest('form').reset(); document.getElementById('create-user-form').innerHTML = ''"
          class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

const UsersList = ({ users }: { users: any[] }) => (
  <>
    {users.length === 0 ? (
      <div class="text-center text-gray-500 dark:text-gray-400 py-12">
        <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-lg font-medium mb-2">No users found</p>
        <p class="text-sm">Create your first user via the API</p>
      </div>
    ) : (
      <div id="users-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => <UserCard user={user} />)}
      </div>
    )}
  </>
);

export const webRoutes = new Elysia()
  .onAfterHandle(({responseValue, set}) => {
    if(isHtml(responseValue)) {
      set.headers["Content-Type"] = "text/html; charset=UTF-8";
    }
  })
  .get("/", HomePage)
  .get("/users", async () => {
    const users = await db.select().from(usersTable);
    return <UsersPage users={users} />;
  })
  .get("/users/list", async () => {
    const users = await db.select().from(usersTable);
    return <UsersList users={users} />;
  })
  .get("/users/create", () => {
    return <CreateUserForm />;
  })
  .post("/users/create", async ({ body }) => {
    const formData = body as any;
    const newUser = await createUser(formData.name, parseInt(formData.age), formData.email);
    return <UserCard user={newUser} />;
  })
  .get("/users/:id/edit", async ({ params }) => {
    const user = await getUserById(parseInt(params.id));
    if (!user) return <div>User not found</div>;
    return <UserEditForm user={user} />;
  })
  .get("/users/:id/card", async ({ params }) => {
    const user = await getUserById(parseInt(params.id));
    if (!user) return <div>User not found</div>;
    return <UserCard user={user} />;
  })
  .patch("/users/:id", async ({ params, body }) => {
    const formData = body as any;
    const updatedUser = await updateUser(parseInt(params.id), {
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age)
    });
    if (!updatedUser) return <div>User not found</div>;
    return <UserCard user={updatedUser} />;
  })
  .delete("/users/:id", async ({ params }) => {
    await db.delete(usersTable).where(eq(usersTable.id, parseInt(params.id)));
    return "";  // Return empty string to remove the element
  });
