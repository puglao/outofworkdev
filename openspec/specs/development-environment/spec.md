# development-environment Specification

## Purpose
TBD - created by archiving change add-drizzle-user-crud. Update Purpose after archive.
## Requirements
### Requirement: Docker Compose Local Development Environment

The system SHALL provide a Docker Compose configuration for local development with PostgreSQL database and management tools.

#### Scenario: Docker Compose file location
- **WHEN** developer initializes local environment
- **THEN** docker-compose.yml exists in project root
- **AND** file defines all required services

#### Scenario: PostgreSQL service configuration
- **WHEN** Docker Compose is started
- **THEN** PostgreSQL 17 service starts in Alpine Linux container
- **AND** database is initialized with name "knowledge_base"
- **AND** default credentials are postgres/postgres
- **AND** database port 5432 is exposed to host

#### Scenario: CloudBeaver service configuration
- **WHEN** Docker Compose is started
- **THEN** CloudBeaver database management UI starts
- **AND** CloudBeaver is accessible at http://localhost:8978
- **AND** service includes pre-configured PostgreSQL datasource

#### Scenario: Database connection from application
- **WHEN** application starts locally
- **THEN** application connects to PostgreSQL at localhost:5432
- **AND** connection uses credentials from environment or defaults
- **AND** connection succeeds if PostgreSQL service is running

### Requirement: Pre-Configured Database Datasource

The system SHALL provide pre-configured CloudBeaver datasource for automatic PostgreSQL connection.

#### Scenario: Datasource configuration file
- **WHEN** CloudBeaver service starts
- **THEN** datasource configuration is loaded from cloudbeaver-datasources.json
- **AND** configuration is mounted into CloudBeaver workspace directory

#### Scenario: Automatic datasource registration
- **WHEN** developer opens CloudBeaver web UI
- **THEN** PostgreSQL datasource appears in connection list
- **AND** datasource is pre-configured with correct host, port, database, and credentials
- **AND** developer can connect without manual configuration

#### Scenario: Datasource connection details
- **WHEN** datasource is configured
- **THEN** connection points to postgres:5432 (Docker network hostname)
- **AND** connection uses database name "knowledge_base"
- **AND** connection uses postgres user credentials

### Requirement: Local Development Workflow

The system SHALL support streamlined local development workflow with minimal manual setup.

#### Scenario: Starting local environment
- **WHEN** developer runs docker-compose up
- **THEN** all services start successfully
- **AND** PostgreSQL is ready within 5 seconds
- **AND** CloudBeaver is accessible within 15 seconds
- **AND** logs indicate successful startup

#### Scenario: Stopping local environment
- **WHEN** developer runs docker-compose down
- **THEN** all services stop gracefully
- **AND** containers are removed
- **AND** data persists in Docker volumes (if configured)

#### Scenario: Database persistence
- **WHEN** Docker Compose services are restarted
- **THEN** database data persists between restarts
- **AND** previously created tables and data remain available

### Requirement: Development Database Connection String

The system SHALL use environment-based configuration for database connection with sensible defaults.

#### Scenario: Environment variable configuration
- **WHEN** DATABASE_URL environment variable is set
- **THEN** application uses provided connection string
- **AND** application does not use default connection string

#### Scenario: Default connection string
- **WHEN** DATABASE_URL environment variable is not set
- **THEN** application defaults to postgresql://postgres:postgres@localhost:5432/knowledge_base
- **AND** application connects successfully to Docker Compose PostgreSQL

#### Scenario: Connection string format
- **WHEN** connection string is used
- **THEN** format includes protocol (postgresql://), credentials, host, port, and database name
- **AND** format is compatible with postgres-js driver

### Requirement: CloudBeaver Access and Management

The system SHALL enable database management through CloudBeaver web interface.

#### Scenario: CloudBeaver web UI access
- **WHEN** developer navigates to http://localhost:8978
- **THEN** CloudBeaver web interface loads
- **AND** interface is fully functional for database management

#### Scenario: Database schema inspection
- **WHEN** developer connects to PostgreSQL via CloudBeaver
- **THEN** developer can view all tables, columns, and constraints
- **AND** developer can inspect table data
- **AND** developer can execute SQL queries

#### Scenario: Data manipulation via CloudBeaver
- **WHEN** developer uses CloudBeaver
- **THEN** developer can insert, update, and delete records
- **AND** changes are immediately reflected in application
- **AND** database constraints are enforced

