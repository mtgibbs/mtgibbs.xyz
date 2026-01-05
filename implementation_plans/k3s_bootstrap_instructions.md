# K3s / 1Password Spotify Secrets Guide

## Objective
Add Spotify credentials to the Pi Cluster's 1Password vault so `mtgibbs.xyz` can display music stats.

## Secrets to Add

Create a new item in the relevant 1Password Vault (e.g., "Dev / Cluster Secrets") named **`mtgibbs-spotify`** with the following fields:

| Field | Value | Notes |
| :--- | :--- | :--- |
| `client-id` | `[Provided by user]` | App Client ID |
| `client-secret` | `[Provided by user]` | App Client Secret |
| `refresh-token` | `[Provided by user]` | Generated via `scripts/get-refresh-token.js` |

## Kubernetes Manifest Update (for K3s Agent)

Once the secrets are in the vault, update the `ExternalSecret` and `Deployment` manifests for `mtgibbs.xyz`:

### 1. Update/Verify `ExternalSecret`
Ensure the ExternalSecret is fetching these new keys.

```yaml
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: mtgibbs-spotify
  namespace: mtgibbs-site
spec:
  refreshInterval: 24h
  secretStoreRef:
    name: onepassword          # Your ClusterSecretStore
    kind: ClusterSecretStore
  target:
    name: mtgibbs-spotify
    creationPolicy: Owner
  data:
    - secretKey: SPOTIFY_CLIENT_ID
      remoteRef:
        key: mtgibbs-spotify/client-id
    - secretKey: SPOTIFY_CLIENT_SECRET
      remoteRef:
        key: mtgibbs-spotify/client-secret
    - secretKey: SPOTIFY_REFRESH_TOKEN
      remoteRef:
        key: mtgibbs-spotify/refresh-token
```

### 2. Update `Deployment`
Map the secrets to environment variables in the container using `envFrom`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mtgibbs-xyz
spec:
  template:
    spec:
      containers:
      - name: web
        envFrom:
        - secretRef:
            name: mtgibbs-spotify
        env:
        # ... existing envs ...
```

### 3. Update `kustomization.yaml`
Add the new external secret manifest to your kustomization resources.

```yaml
resources:
  - external-secret.yaml
  # ... other resources
```
