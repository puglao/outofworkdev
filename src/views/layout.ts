export function layout(content: string, title = "Knowledge Base"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
<body hx-boost="true" class="bg-gray-50 min-h-screen">
  <main id="content" class="container mx-auto px-4 py-8">
    ${content}
  </main>
</body>
</html>`;
}
