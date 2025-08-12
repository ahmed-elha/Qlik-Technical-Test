# Qlik-Technical-Test

# Palindrome Service

## 1️⃣ Présentation du projet
Ce projet est une API **Node.js** qui vérifie si un mot ou une phrase est un **palindrome**.  

Fonctionnalités :  
- `GET /health` → Vérifie si le service est opérationnel  
- `POST /palindrome` → Envoie la chaine de caractères

Conçu pour être exécuté :  
- **En local** avec Docker  
- **Sur Kubernetes** via Helm et Minikube  

---

## 2️⃣ Dépendances
### Backend
- Node.js → Exécution JavaScript côté serveur
- 
### Conteneurisation & Déploiement
- Docker → Création et packaging de l’application  
- Docker Hub → Registry pour stocker l’image  
- Helm → Gestionnaire de chartes Kubernetes  
- Minikube → Cluster Kubernetes local  
- kubectl → CLI Kubernetes  

---

## 3️⃣ Lancer le projet

### 3.1 Avec Docker
```bash
# Build l'image
docker build -t ahmedelha59/palindrome-service:latest .

# Lancer en local
docker run -p 9091:9091 ahmedelha59/palindrome-service:latest

# Tester
curl http://localhost:9091/api/v1/messages
