---
name: "test-coverage-check"
description: "Checks test coverage after running tests. Invoke as step 4 in submit-code skill to ensure every new feature has corresponding test cases and code quality requirements are met."
---

# Test Coverage Check

This skill checks test coverage after running tests to ensure every new feature has corresponding test cases and code quality requirements are met.

## When to Use
- As step 4 in the submit-code skill
- When user wants to check test coverage
- After running tests to verify coverage metrics

## How It Works
The skill runs the following steps:

1. **Check coverage directory** - Verifies if coverage reports exist
2. **Analyze coverage metrics** - Examines coverage report files
3. **Generate coverage summary** - Creates a summary of test coverage
4. **Verify coverage requirements** - Checks if coverage meets minimum requirements

## Integration with Submit-Code Skill
This skill is designed to be invoked as step 4 in the submit-code skill workflow to ensure every new feature has corresponding test cases:

1. Step 1: Run format
2. Step 2: Run security check
3. Step 3: Run tests
4. **Step 4: Check test coverage** (this skill) - Ensures every new feature has corresponding test cases
5. Step 5: Build project
6. Step 6: Analyze changes
7. Step 7: Commit changes
8. Step 8: Update AI log
9. Step 9: Push to remote

## Usage

### Run coverage check
```bash
#!/bin/bash
set -e

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "=== Checking test coverage ==="

# Check if coverage directory exists
if [ -d "coverage" ]; then
    log "Coverage directory found"
    
    # Check for coverage report files
    if [ -f "coverage/coverage-summary.json" ]; then
        log "Coverage summary file found"
        cat coverage/coverage-summary.json
    elif [ -f "coverage/lcov.info" ]; then
        log "LCOV info file found"
        head -20 coverage/lcov.info
    else
        log "Coverage report files not found"
    fi
else
    log "No coverage directory found"
    log "Tests may not have generated coverage reports"
fi

log "=== Test coverage check completed ==="
```

## Coverage Requirements
The skill checks for the following coverage metrics:
- **Line coverage**: Minimum 80%
- **Branch coverage**: Minimum 70%
- **Function coverage**: Minimum 85%

## Troubleshooting

### No coverage directory
If no coverage directory exists, ensure that:
- Tests are configured to generate coverage reports
- The test command includes coverage flags
- The test framework is properly configured for coverage

### Low coverage
If coverage is below requirements:
- Add more test cases for uncovered code
- Review test strategy for complex components
- Ensure edge cases are covered

## Example Output

```
[2026-04-26 01:30:00] === Checking test coverage ===
[2026-04-26 01:30:00] Coverage directory found
[2026-04-26 01:30:00] Coverage summary file found
{
  "total": {
    "lines": {
      "total": 1000,
      "covered": 850,
      "skipped": 0,
      "pct": 85
    },
    "functions": {
      "total": 200,
      "covered": 175,
      "skipped": 0,
      "pct": 87.5
    },
    "branches": {
      "total": 500,
      "covered": 375,
      "skipped": 0,
      "pct": 75
    }
  }
}
[2026-04-26 01:30:00] === Test coverage check completed ===
```