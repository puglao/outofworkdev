# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pulumi infrastructure-as-code project for "outofworkdev". It uses TypeScript as the programming language and Bun as the package manager.

## Commands

```bash
# Install dependencies
bun install

# Preview infrastructure changes
pulumi preview

# Deploy infrastructure
pulumi up

# Destroy infrastructure
pulumi destroy

# View stack outputs
pulumi stack output
```

## Architecture

- **index.ts**: Main Pulumi program entry point where infrastructure resources are defined
- **Pulumi.yaml**: Project configuration specifying the runtime (Node.js with Bun) and project metadata
- Stack configuration files (Pulumi.*.yaml) contain environment-specific settings and secrets

## Key Patterns

- All infrastructure is defined declaratively using the Pulumi TypeScript SDK (`@pulumi/pulumi`)
- Add cloud provider packages as needed (e.g., `@pulumi/aws`, `@pulumi/gcp`, `@pulumi/azure`)
- Export stack outputs from index.ts to make values available to other stacks or external systems
