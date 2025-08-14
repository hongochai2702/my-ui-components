pipeline {
    agent any
    tools { nodejs "Node20" } // Tên NodeJS installation trong Jenkins

    environment {
        NEXUS_URL = 'http://your-nexus-host/repository/npm-hosted/'
        NEXUS_CREDENTIALS_ID = 'nexus-credentials' // ID của credentials trong Jenkins (username/password)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test' // Nếu có script test
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'npm run build-storybook' // Optional: Build Storybook
            }
        }

        stage('Publish to Nexus') {
            when {
                branch 'main' // Chỉ publish trên branch main
            }
            steps {
                withCredentials([usernamePassword(credentialsId: "${NEXUS_CREDENTIALS_ID}", usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
                    sh """
                    echo "registry=${NEXUS_URL}" > .npmrc
                    echo "${NEXUS_URL}:_auth=\$(echo -n '${NEXUS_USER}:${NEXUS_PASS}' | base64)" >> .npmrc
                    echo "always-auth=true" >> .npmrc
                    npm publish
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Dọn dẹp workspace
        }
    }
}