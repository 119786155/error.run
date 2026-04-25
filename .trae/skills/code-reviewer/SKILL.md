---
name: "code-reviewer"
description: "Reviews code for SOLID principle violations. Invoke when user asks for code review, before merging changes, or when analyzing code quality."
---

# Code Reviewer

A code review skill focused on SOLID principles - five fundamental design principles for writing maintainable, scalable, and robust software.

## SOLID Principles

### S - Single Responsibility Principle (SRP)
**Definition**: A class should have only one reason to change.

**Red Flags**:
- Class handles multiple concerns (data, logic, UI, persistence)
- Methods that do too many things
- Large classes with many unrelated methods
- God classes that know too much

**Review Questions**:
- Does this class have one clear purpose?
- Would a change in requirements only affect this class in one way?
- Are the methods tightly related to the class's main responsibility?

### O - Open/Closed Principle (OCP)
**Definition**: Software entities should be open for extension but closed for modification.

**Red Flags**:
- Frequent modifications to existing code to add new features
- Conditional logic that changes based on type checking
- Switch statements that need updating for new cases
- Inheritance hierarchies that require changing parent classes

**Review Questions**:
- Can new behavior be added without modifying existing code?
- Are you using inheritance, composition, or polymorphism effectively?
- Is the code designed to be extended rather than modified?

### L - Liskov Substitution Principle (LSP)
**Definition**: Objects of a superclass should be replaceable with objects of a subclass without affecting correctness.

**Red Flags**:
- Subclasses that override methods with empty implementations
- Throwing NotImplementedException in subclass methods
- Subclass methods with weaker preconditions or stronger postconditions
- Type checking before calling type-specific methods

**Review Questions**:
- Can subclasses be used interchangeably with their parent?
- Do subclasses honor the contract of the parent class?
- Are overridden methods truly substitutable?

### I - Interface Segregation Principle (ISP)
**Definition**: Clients should not be forced to depend on interfaces they do not use.

**Red Flags**:
- Large interfaces with many unrelated methods
- Classes that implement interfaces but don't use all methods
- Empty method implementations in implementing classes
- Fat interfaces causing ripple effects on changes

**Review Questions**:
- Are interfaces small and focused?
- Do classes only depend on methods they actually use?
- Should interfaces be split into smaller, more specific ones?

### D - Dependency Inversion Principle (DIP)
**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Red Flags**:
- Direct instantiation of concrete classes in constructors
- High-level classes depending on low-level implementation details
- Tight coupling between layers
- Hard-coded dependencies instead of injected ones

**Review Questions**:
- Do high-level classes depend on abstractions (interfaces)?
- Are dependencies injected rather than created internally?
- Is there loose coupling between modules?

## Code Review Workflow

### 1. Preparation
- Understand the requirements and context
- Identify the files to review
- Run tests to establish baseline

### 2. Quick Scan
- Check for obvious violations of any SOLID principle
- Look for code smells (duplicate code, dead code, commented code)
- Verify naming conventions and code formatting

### 3. Deep Analysis
- For each file, systematically check against all 5 principles
- Trace data flows to understand dependencies
- Check error handling and edge cases

### 4. Reporting
- List findings with principle violated
- Provide specific line references
- Suggest improvements with examples

## Review Checklist

### General
- [ ] Code compiles without errors
- [ ] Tests pass
- [ ] No hardcoded secrets or credentials
- [ ] Proper error handling
- [ ] Logging is appropriate

### SRP
- [ ] Classes have single responsibility
- [ ] Methods do one thing well
- [ ] No God classes

### OCP
- [ ] Code open for extension
- [ ] No modification of stable code for new features
- [ ] Uses polymorphism effectively

### LSP
- [ ] Subclasses are proper substitutes
- [ ] No weakening of contracts
- [ ] Override methods are callable

### ISP
- [ ] Interfaces are focused
- [ ] No empty implementations
- [ ] Cohesive interface design

### DIP
- [ ] Dependencies are abstractions
- [ ] No tight coupling
- [ ] Dependency injection used

## Output Format

When reviewing code, present findings in this format:

```
## Code Review Report

### Summary
[One paragraph overview of the code quality]

### Findings

#### [Principle] - [Issue Title]
**File**: `path/to/file.ts`
**Severity**: High/Medium/Low
**Description**: [What's wrong]

**Current Code**:
```typescript
[problematic code]
```

**Suggested Fix**:
```typescript
[improved code]
```

**Rationale**: [Why this violates the principle]
```

## Usage Examples

### Invoking the Skill
When user says:
- "Review this code"
- "Check for SOLID violations"
- "Code review before merge"
- "Analyze code quality"

### Review Process
1. Load the files to review
2. Apply the checklist systematically
3. Generate findings report
4. Provide actionable suggestions