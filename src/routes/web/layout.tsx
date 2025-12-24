import { Html } from "@elysiajs/html";

export const Layout = ({ children }: { children: JSX.Element }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Knowledge Base</title>
      <script src="https://unpkg.com/htmx.org@2.0.4"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>{`
        tailwind.config = {
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                primary: '#3b82f6',
                secondary: '#6366f1',
              }
            }
          }
        }

        // Theme toggle function
        function toggleTheme() {
          const html = document.documentElement;
          const isDark = html.classList.toggle('dark');
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        // Initialize theme from localStorage
        (function() {
          const theme = localStorage.getItem('theme');
          if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          }
        })();
      `}</script>
    </head>
    <body class="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div class="container mx-auto px-4 py-8">
        {children}
      </div>
    </body>
  </html>
);
