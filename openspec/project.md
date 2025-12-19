# Project Context

## Purpose
A full-stack knowledge base system that helps organizations build a single source of truth consumable by AI agents. When making business decisions, users can refer to this centralized knowledge base to avoid conflicts and inconsistencies.

## Tech Stack
- TypeScript
- Bun.js
- elysia
- HTMX
- tailwindcss
- OpenAPI
- AsyncAPI
- NATS
- PostgreSQL
- mastra
- Pulumi
- kubernetes
- civo

## Project Conventions

### Code Style
[Describe your code style preferences, formatting rules, and naming conventions]

### Architecture Patterns
For simplicity, in the MVP phase we use a single service/binary to serve all features, but we modularize the codebase to maintain feasibility for distributed deployment in the future.
AsyncAPI and NATS are the primary systems for backend processing.
The frontend uses WebSocket or SSE for data queries.
REST API endpoints are available for third-party webhook/API integrations.

### Testing Strategy
[Explain your testing approach and requirements]

### Git Workflow
[Describe your branching strategy and commit conventions]

## Domain Context
[Add domain-specific knowledge that AI assistants need to understand]

## Important Constraints
To maximize AI effectiveness and provide proper context, all DevOps operations should be done in this repo via Pulumi.

## External Dependencies
- Stripe
- WorkOS
