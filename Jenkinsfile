pipeline {
    agent { docker { image 'maven:3.3.3' } }
    stages {
        stage('build') {
            steps {
                dir("backend") {
                    sh 'mvn compile'
                }
            }
        }
        stage('test') {
            steps {
                dir("backend") {
                    sh 'mvn test'
                }
            }
        }
    }
}
