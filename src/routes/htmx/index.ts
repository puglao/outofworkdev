import { Elysia } from "elysia"
import { layout } from "../../views/layout";

export const htmxRoutes = new Elysia()
  .get("/", () => {
    return layout(`
      <div class="max-w-4xl mx-auto">
        <!-- Theme Toggle -->
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

        <!-- Header Section -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white rounded-xl p-8 mb-8 shadow-lg">
          <h1 class="text-4xl font-bold mb-3">Knowledge Base</h1>
          <p class="text-blue-100 dark:text-blue-200 text-lg">A single source of truth consumable by AI agents</p>
        </div>

        <!-- Main Content Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-6 transition-colors">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Getting Started</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            This knowledge base system helps organizations build centralized documentation that AI agents can easily consume and reference.
          </p>

          <div class="flex gap-4 mb-8">
            <a
              href="/api/openapi"
              class="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View OpenAPI Spec
            </a>
            <button
              hx-get="/api/hello"
              hx-target="#demo"
              hx-swap="innerHTML"
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Test HTMX Demo
            </button>
          </div>

          <div id="demo" class="empty:hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-l-4 border-green-500 dark:border-green-400 p-4 rounded-r-lg"></div>
        </div>

        <!-- Info Cards -->
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
    `);
  })
  .get("/api/hello", () => {
    return `<p class="text-green-600 dark:text-green-400 font-medium">Hello from HTMX! 🎉</p>`;
  })
