## ADDED Requirements

### Requirement: User CRUD API Endpoints

The system SHALL provide REST API endpoints for user management with full CRUD operations.

#### Scenario: Create user endpoint
- **WHEN** client sends POST request to /api/users with valid user data (name, age, email)
- **THEN** server creates new user in database
- **AND** server returns HTTP 201 status
- **AND** response body contains created user with generated id

#### Scenario: List all users endpoint
- **WHEN** client sends GET request to /api/users
- **THEN** server returns HTTP 200 status
- **AND** response body contains array of all users

#### Scenario: Get single user endpoint
- **WHEN** client sends GET request to /api/users/:id with valid user ID
- **THEN** server returns HTTP 200 status
- **AND** response body contains user matching the ID

#### Scenario: Get non-existent user
- **WHEN** client sends GET request to /api/users/:id with invalid user ID
- **THEN** server returns HTTP 404 status
- **AND** response body contains error message

#### Scenario: Update user endpoint
- **WHEN** client sends PATCH request to /api/users/:id with partial user data
- **THEN** server updates specified fields in database
- **AND** server returns HTTP 200 status
- **AND** response body contains updated user

#### Scenario: Delete user endpoint
- **WHEN** client sends DELETE request to /api/users/:id
- **THEN** server deletes user from database
- **AND** server returns HTTP 200 status
- **AND** response body contains success message

### Requirement: API Input Validation

The system SHALL validate all API inputs using TypeBox schemas generated from database schemas.

#### Scenario: Valid input acceptance
- **WHEN** client submits valid user data matching schema
- **THEN** request proceeds to handler
- **AND** data is processed without validation errors

#### Scenario: Invalid input rejection
- **WHEN** client submits invalid user data
- **THEN** server returns HTTP 422 status
- **AND** response body contains validation error details
- **AND** database operation is not attempted

#### Scenario: Name validation
- **WHEN** client submits name with less than 1 character or more than 255 characters
- **THEN** validation fails with clear error message

#### Scenario: Age validation
- **WHEN** client submits age outside range 1-150
- **THEN** validation fails with clear error message

#### Scenario: Email validation
- **WHEN** client submits invalid email format
- **THEN** validation fails with clear error message

#### Scenario: Partial update validation
- **WHEN** client sends PATCH request with subset of fields
- **THEN** only provided fields are validated
- **AND** missing fields are not required

### Requirement: Service Layer Abstraction

The system SHALL use a service layer to encapsulate database operations and business logic.

#### Scenario: Service layer usage in API
- **WHEN** API endpoint needs to perform database operation
- **THEN** endpoint calls service layer function
- **AND** endpoint does not directly access database

#### Scenario: Service layer returns
- **WHEN** service layer function completes
- **THEN** function returns typed result (user object, array, or undefined)
- **AND** function does not return database-specific types

#### Scenario: Service layer error handling
- **WHEN** database operation fails in service layer
- **THEN** service layer throws error with clear message
- **AND** API endpoint can catch and convert to appropriate HTTP response

### Requirement: OpenAPI Documentation for User API

The system SHALL include user endpoints in OpenAPI specification with detailed schemas and descriptions.

#### Scenario: User API in OpenAPI spec
- **WHEN** client requests /api/openapi
- **THEN** specification includes all user CRUD endpoints
- **AND** each endpoint has description, parameters, request body, and responses documented

#### Scenario: Schema definitions in OpenAPI
- **WHEN** OpenAPI spec is generated
- **THEN** User schema is defined in components section
- **AND** CreateUser and UpdateUser schemas are defined
- **AND** schemas match TypeBox validation schemas

#### Scenario: API tagging
- **WHEN** user endpoints are documented
- **THEN** endpoints are tagged with "Users" for grouping
- **AND** tag appears in OpenAPI UI navigation

### Requirement: API Response Consistency

The system SHALL return consistent JSON response formats across all endpoints.

#### Scenario: Success response format
- **WHEN** API operation succeeds
- **THEN** response contains data in consistent structure
- **AND** response uses appropriate HTTP status code (200, 201)

#### Scenario: Error response format
- **WHEN** API operation fails
- **THEN** response contains error message
- **AND** response uses appropriate HTTP error status code (404, 422, 500)

#### Scenario: Content-Type header
- **WHEN** API endpoint returns response
- **THEN** Content-Type header is set to application/json
- **AND** response body is valid JSON
