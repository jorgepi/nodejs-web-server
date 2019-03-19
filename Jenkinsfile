node {
   def commit_id
   stage('Pull Code') {
     checkout scm
     sh "git rev-parse --short HEAD > .git/commit-id"
     commit_id = readFile('.git/commit-id').trim()
   }
   stage('Pull and Test') {
     def myTestContainer = docker.image('node:4.6')
     myTestContainer.pull()
     myTestContainer.inside {     
       sh 'npm install'
       sh 'npm test'
     }
   }               
   stage('Build and Push') {            
     docker.withRegistry('https://index.docker.io/v1/', 'docker-hub') {
       def app = docker.build("jorgepi/nodejs-web-server:${env.BUILD_NUMBER}", '.')
       app.push("latest")
     }                                     
   }                                       
}
