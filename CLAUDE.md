# CLAUDE.md

<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack knowledge base system that helps organizations build a single source of truth consumable by AI agents. Built with TypeScript, Bun, and Elysia for the backend; HTMX + TailwindCSS for the frontend; NATS for messaging; PostgreSQL for persistence; and deployed to Civo Kubernetes via Pulumi.

## Commands

```bash
# Install dependencies (root)
bun install

# Run development server (port 3000)
bun run dev

# Install deploy dependencies
cd deploy && bun install

# Infrastructure commands (in deploy/)
pulumi preview    # Preview changes
pulumi up         # Deploy
pulumi destroy    # Tear down
```

## Architecture

### Monorepo Structure
- `src/` - Main application (Elysia server)
- `deploy/` - Pulumi infrastructure-as-code
- `openspec/` - Spec-driven development system

### Backend Patterns
- **Single binary MVP**: All features in one service, modularized for future distribution
- **Messaging**: AsyncAPI + NATS for backend processing
- **Frontend data**: WebSocket or SSE for queries
- **REST API**: Available for third-party webhook/API integrations

### External Dependencies
- Stripe (payments)
- WorkOS (auth)

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. Before making significant changes:

1. Check `openspec/project.md` for project conventions
2. Run `openspec list` to see active changes
3. Run `openspec list --specs` to see existing capabilities

For new features, breaking changes, or architecture shifts, create a change proposal:
```bash
openspec validate <change-id> --strict
```

See `openspec/AGENTS.md` for the full workflow.

