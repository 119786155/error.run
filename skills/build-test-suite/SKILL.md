---
name: "build-test-suite"
description: "Builds test suites for projects. Invoke when user asks to create or set up testing infrastructure for their codebase."
---

# Build Test Suite

## Overview

This skill helps create comprehensive test suites for software projects following best practices.

## Steps and Rules

1. **Explore Program Logic Structure**
   - Analyze the codebase to understand its architecture, modules, and dependencies
   - Identify key components, functions, and workflows that need testing

2. **Select Appropriate Testing Tools**
   - Choose testing frameworks based on project type and requirements
   - Common tools: Vitest, Jest, Playwright, Cypress

3. **Test Code Organization**
   - All test-related code must be stored in a dedicated `test` folder at the project root
   - The `test` folder contains two subdirectories:
     - `unittest`: For unit tests
     - `e2e`: For end-to-end tests

4. **Test Categories**
   - **Unit Tests**: Isolated tests for individual components/functions
   - **End-to-End Tests**: Integration tests for complete user flows

5. **No Source Code Modification**
   - Never modify production code to facilitate testing
   - Use test doubles, mocks, and stubs instead

6. **Fixture Management**
   - Test fixtures must also be stored within the `test` folder
   - Common location: `test/fixtures/`

7. **Confirm Key Information**
   - Before generating test code, verify selectors, API endpoints, and other critical details
   - Ensure test data and environment setup are correct

8. **Execute and Verify**
   - Run tests after generation to confirm correctness
   - Review test results and debug failures
