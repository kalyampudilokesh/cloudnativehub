pipeline {

    agent any

    stages {

        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing application dependencies...'

                dir('applications/client') {
                    sh 'npm ci'
                }

                dir('applications/server') {
                    sh 'npm ci'
                }
            }
        }

        stage('Add Configuration') {
            steps {
                echo 'Validating project configuration...'

                sh '''
                    test -f docker-compose.yaml
                    test -f applications/client/Dockerfile
                    test -f applications/server/Dockerfile
                '''
            }
        }

        stage('SonarQube Scan') {
            steps {
                echo 'Running SonarQube analysis...'

                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=cloudnativehub \
                          -Dsonar.projectName=CloudNativeHub \
                          -Dsonar.sources=applications \
                          -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker images...'

                sh 'docker compose build'
            }
        }

        stage('Delete Previous Version') {
            steps {
                echo 'Stopping previous containers...'

                sh '''
                    docker compose down || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo 'Starting CloudNativeHub containers...'

                sh '''
                    docker compose up -d
                '''
            }
        }

    }

    post {

        success {
            echo '======================================'
            echo 'CloudNativeHub pipeline SUCCESS'
            echo '======================================'

            sh 'docker compose ps'
        }

        failure {
            echo '======================================'
            echo 'CloudNativeHub pipeline FAILED'
            echo '======================================'

            sh 'docker compose ps || true'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}