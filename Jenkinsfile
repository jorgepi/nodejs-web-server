node {
   def commit_id
   stage('Pull Code') {
     checkout scm
     sh "git rev-parse --short HEAD > .git/commit-id"
     commit_id = readFile('.git/commit-id').trim()
   }
   stage('Build Docker') {
     app = docker.build("jorgepi/nodejs-web-server:${commit_id}")
   }
   stage('test') {
     app.inside {
       sh 'npm install --only=dev'
       sh 'npm test'
     }
   }                                  
   stage('docker push') {            
     docker.withRegistry('https://index.docker.io/v1/', 'docker-hub') {
       app.push("${env.BUILD_NUMBER}")
       app.push("latest")
     }                                     
   }                                       
}
