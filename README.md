# CloudNativeHub

CloudNativeHub is a production-oriented DevOps learning project built around a simple MERN Task Manager application.

The application is intentionally simple. The main goal of the project is to learn how to build, containerize, provision, secure, deploy, and operate an application using modern DevOps and cloud-native tools.

---

## 🚀 Project Overview

CloudNativeHub is a Task Management application built with:

- React.js
- Node.js
- Express.js
- MongoDB

The application supports:

- Create tasks
- View tasks
- Complete / undo tasks
- Delete tasks
- Health check endpoint

The application will progressively be deployed using AWS and Kubernetes.

---

## 🏗️ Current Architecture

```text
                    User
                      |
                      v
              React Frontend
                      |
                      v
             Node.js / Express
                      |
                      v
                  MongoDB

📁 Project Structure:

cloudnativehub/
│
├── applications/
│   │
│   ├── client/
│   │   └── React frontend
│   │
│   └── server/
│       ├── models/
│       ├── routes/
│       ├── server.js
│       ├── Dockerfile
│       └── package.json
│
├── terraform/
│   ├── provider.tf
│   ├── variables.tf
│   ├── vpc.tf
│   ├── routes.tf
│   ├── outputs.tf
│   └── terraform.tfvars
│
├── docker-compose.yaml
├── Jenkinsfile
├── sonar-project.properties
├── .gitignore
└── README.md

