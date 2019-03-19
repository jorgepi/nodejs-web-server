node {
   def commit_id
   stage('Pull_Code') {
     checkout scm
     sh "git rev-parse --short HEAD > .git/commit-id"
     commit_id = readFile('.git/commit-id').trim()
   }
   stage('test') {
     def myTestContainer = docker.image('node:4.6')
     myTestContainer.pull()
     myTestContainer.inside {
       sh 'npm install --only=dev'
       sh 'npm test'
     }
   }                                  
   stage('docker build/push') {            
     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
       def app = docker.build("jorgepi/nodejs-web-server:${commit_id}", '.').push()
     }                                     
   }                                       
}
