---
name: "security-check"
description: "Checks code for security issues like password leaks, private information exposure, API key leaks, and other sensitive data risks. Invoke when user asks to check code security or review code for security vulnerabilities."
---

# Security Check

This skill scans and analyzes code to identify potential security vulnerabilities and sensitive information leaks.

## Capabilities

- Detect hardcoded passwords or secrets
- Identify API keys, tokens, and credentials
- Find private/sensitive information exposure (PII)
- Detect IP address leaks (internal/server IPs)
- Check for insecure configurations
- Identify potential injection vulnerabilities
- Detect overly permissive file permissions
- Detect local absolute paths that affect skill portability

## When to Use

Invoke this skill when:
- User asks to check code for security issues
- User requests a security review of their code
- User wants to ensure code is safe before committing
- User asks to find potential password leaks or secret exposures
- User wants to verify sensitive data is properly protected

## Common Security Checks

| Issue Type | What to Look For |
|------------|------------------|
| Passwords | Hardcoded credentials, password in comments |
| API Keys | AWS keys, GitHub tokens, database connection strings |
| Private Info | Email addresses, phone numbers, SSNs in plain text |
| IP Addresses | Internal IPs, server IPs, database IPs in code/config |
| Config Issues | Debug mode enabled, CORS misconfigurations |
| Local Paths | Absolute paths like `/Users/`, `/home/`, `C:\Users\` that affect portability |

## Output Format

When performing a security check, provide:
1. **Severity Level**: Critical / High / Medium / Low
2. **Location**: File and line number
3. **Issue Description**: What the problem is
4. **Recommendation**: How to fix or mitigate the issue
