pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub')
        IMAGE_NAME = 'k8sgurus1/cicd-sample-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'git@github.com:k8s-gurus/cicd-sample-app.git', branch: 'main', credentialsId: 'github-ssh-key'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
                        docker.image("${IMAGE_NAME}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    kubectl.apply(file: 'manifests/deployment.yaml')
                    kubectl.apply(file: 'manifests/service.yaml')
                    kubectl.apply(file: 'manifests/ingress.yaml')
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}