pipeline {
    agent { docker { image 'maven:3.3.3' } }
    stages {
        stage('build') {
            steps {
                dir("backend") {
                    sh 'pwd'
                }
            }
        }
    }
}
