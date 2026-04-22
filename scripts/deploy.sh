#!/bin/bash
set -e

SOURCE=~/.zshrc

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

check_changed_files() {
    if [ -n "$(git status --porcelain)" ]; then
        log "Changes detected after formatting"
        log "Adding changed files to git stage..."
        git add -A
        log "Changed files added to stage"
    else
        log "No changes detected after formatting"
    fi
}

if [ ! -f "$SOURCE" ]; then
    log "ERROR: $SOURCE not found"
    exit 1
fi

log "Loading aliases from $SOURCE"
source "$SOURCE"

log "=== Step 1: Running format ==="
pnpm run format
check_changed_files

log "=== Step 2: Running tests ==="
pnpm run test

log "=== Step 3: Building project ==="
pnpm run build

log "=== Step 4: Starting deployment ==="
deploy_error
log "=== Deployment completed ==="