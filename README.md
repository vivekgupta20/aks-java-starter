
# AKS Java Microservices Starter

This repository contains three minimal Spring Boot microservices (`order-svc`, `catalog-svc`, `identity-svc`) and a simple web app served by NGINX. It is designed to build Docker images and push them to **Azure Container Registry (ACR)** so **AKS** can pull and run them.

## Quick Start

1. **Prereqs**
   - Azure CLI logged in (`az login`)
   - Docker installed and logged in to your ACR (`az acr login -n <ACR_NAME>`) 
   - ACR name (e.g., `myacr`) and registry login server `myacr.azurecr.io`

2. **Build images locally**
   ```bash
   # order-svc
   docker build -t myacr.azurecr.io/order-svc:1.0.0 apps/order-svc
   # catalog-svc
   docker build -t myacr.azurecr.io/catalog-svc:1.0.0 apps/catalog-svc
   # identity-svc
   docker build -t myacr.azurecr.io/identity-svc:1.0.0 apps/identity-svc
   # webapp
   docker build -t myacr.azurecr.io/webapp:1.0.0 apps/webapp
   ```

3. **Push to ACR**
   ```bash
   docker push myacr.azurecr.io/order-svc:1.0.0
   docker push myacr.azurecr.io/catalog-svc:1.0.0
   docker push myacr.azurecr.io/identity-svc:1.0.0
   docker push myacr.azurecr.io/webapp:1.0.0
   ```

4. **Let AKS pull from ACR**
   ```bash
   az aks update -g <resource-group> -n <aks-name> --attach-acr myacr
   ```

5. **Deploy to AKS (basic)**
   Edit images in `deploy/k8s/*.yaml` to your registry and apply:
   ```bash
   kubectl apply -f deploy/k8s/namespace.yaml
   kubectl apply -f deploy/k8s/order-svc-deployment.yaml
   kubectl apply -f deploy/k8s/order-svc-service.yaml
   kubectl apply -f deploy/k8s/catalog-svc-deployment.yaml
   kubectl apply -f deploy/k8s/catalog-svc-service.yaml
   kubectl apply -f deploy/k8s/identity-svc-deployment.yaml
   kubectl apply -f deploy/k8s/identity-svc-service.yaml
   kubectl apply -f deploy/k8s/webapp-deployment.yaml
   kubectl apply -f deploy/k8s/webapp-service.yaml
   ```

## Optional: GitHub Actions CI
See `.github/workflows/build-and-push.yml` for automated builds to ACR.

## Optional: Azure PostgreSQL
Each service includes profile `azure` to connect to PostgreSQL via JDBC (SSL required). Set env vars `JDBC_URL`, `DB_USER`, `DB_PASSWORD` and run with `SPRING_PROFILES_ACTIVE=azure`. Liquibase changelog creates basic tables.

## Structure
```
apps/
  order-svc/
  catalog-svc/
  identity-svc/
  webapp/
deploy/
  k8s/
.github/workflows/
```
