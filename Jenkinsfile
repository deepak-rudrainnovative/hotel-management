pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
    stage('setup') {
      steps {
        git 'https://github.com/deepak-rudrainnovative/hotel-management.git'
      }
    }
        
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

   stage('deploy') {
      steps {
        sh 'git push https://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@github.com/deepak-rudrainnovative/hotel-management.git HEAD:master -f'
      }
    }
  }
}