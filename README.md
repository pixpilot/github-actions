# GitHub Actions

A collection of reusable GitHub composite actions for common CI/CD workflows.

## Available Actions

### 🔄 Dependabot Auto-Merge (`dependabot-auto-merge`)

Automatically merges Dependabot PRs after CI passes, with smart semantic commit type rewriting for proper release triggering.

**Features:**

- Detects production dependency updates
- Rewrites commit types from `chore(deps)` → `fix(deps)` for semantic releases
- Enables auto-merge with GitHub CLI
- Works with protected branches when using GitHub App tokens

**Usage:**

```yaml
- name: Auto-merge Dependabot PRs
  uses: pixpilot/github-actions/dependabot-auto-merge@v1
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 🚀 Semantic Release Protected Branch (`semantic-release-protected-branch`)

Performs semantic release for protected branches using GitHub App authentication.

**Features:**

- Works with protected branch restrictions
- Uses GitHub App for elevated permissions
- Supports NPM package publishing
- Handles semantic versioning and changelog generation

**Usage:**

```yaml
- name: Semantic Release
  uses: pixpilot/github-actions/semantic-release-protected-branch@v1
  with:
    GITHUB_TOKEN: ${{ secrets.RELEASER_APP_TOKEN }}
    USER_ID: ${{ secrets.RELEASER_ID }}
    APP_SLUG: ${{ secrets.RELEASER_APP_SLUG }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Development

This repository uses pnpm workspaces and Turborepo for managing multiple actions.

```bash
# Install dependencies
pnpm install

# Lint all actions
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.

## License

MIT © [Pixpilot](https://github.com/pixpilot)
