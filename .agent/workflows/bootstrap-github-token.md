---
description: Bootstrap GitHub Access Token for K3s/1Password
---

# Bootstrap GitHub Access Token

This workflow describes how to set up the GitHub Access Token for the `mtgibbs.xyz` application in the K3s environment using 1Password.

## 1. Generate GitHub Token
> **Note:** We are using **Classic Tokens** because Fine-grained tokens currently have limited GraphQL support for fetching user profile `pinnedItems` (requires specific Profile Read access that is inconsistent in Fine-grained scopes).

1.  Go to [GitHub Trusted Tokens](https://github.com/settings/tokens).
2.  Generate a new **Classic Token**.
3.  **Scopes:**
    *   `public_repo` (Required for repository data)
    *   `read:user` (Required for profile/pinned items)
4.  Copy the token (starts with `ghp_`).

## 2. Add to 1Password
1.  Open your 1Password vault (`pi-cluster` or equivalent).
2.  Create a new Login or Password item named `mtgibbs-github`.
3.  Add a field named `token` and paste the `ghp_...` token there.
4.  Ensure the URI matches: `op://pi-cluster/mtgibbs-github/token`.

## 3. Configure Kubernetes (1Password Operator)
Ensure your `OnePasswordItem` resource fetches this new secret.

```yaml
apiVersion: onepassword.com/v1
kind: OnePasswordItem
metadata:
  name: mtgibbs-github-secrets
  namespace: mtgibbs-xyz
spec:
  itemPath: "vaults/pi-cluster/items/mtgibbs-github"
```

## 4. Verify Local Development
Your `.env.template` has been updated to look for:
`GITHUB_ACCESS_TOKEN="op://pi-cluster/mtgibbs-github/token"`

Run `npm run dev` (which uses `op run`) to verify it pulls the secret correctly.
