tap
===

A multitenant realtime streaming framework.

“Tap” project which provides a cloud based real-time streaming using in-memory cloud hash(redis) and nodejs. This provides a powerful idea on streaming based on an URL. 

This approach can be extend to cloud integration using our RESTful connector bed(deccanplato) which provides connectors for various Cloud Application(Salesforce, Google App..Zoho, Xero…).

### Requirements

> 
[Node.js +](http://nodejs.org/)
[Socket.io +](http://socket.io/)
[Express framework ]
[Redis](http://redis.io/)
[Logstash](http://logstash.net/)
[deccanplato](https://github.com/indykish/deccanplato/)[(Optional)]

### Logstash Configuration file

```
input {
  file {
    type => "tomcat-access-log"
    path => "/home/ubuntu/tomcat/logs/localhost_access_log.2013-03-06.txt"
  }
}
 
output {
  stdout { debug => true debug_format => "json"}
  redis {
     key => "logstashTest"
     data_type => "channel"
     host => "redis"
  }
}
```
Logstash Agent will be run on every node using a configurable ”<x>.conf” file which says “What log file to watch, and where to drop it in ?”.

Let us watch the following  log location “/home/ubuntu/tomcat/logs/localhost_access_log.2013-03-06.txt” and dumps it to the output channel “logstashtest“.

### Configuring `app.yaml`

The default contents of `app.yaml` is as follows:

```
default:
  server:
    port: 7000
    host: '127.0.0.1'
  redis:
    port: 6379                # redis server port
    host: '127.0.0.1'         # redis host
    password: ''              # to use with AUTH
    db: 1                     # the test db
    options: {}
test:
  redis:
    db: 12
production:
  server:
    port: 8000
    host: '127.0.0.1'
  redis:
    port: 6379                # redis server port
    host: 'redis-master.megam.co.in'         # redis host
    password: ''              # to use with AUTH
    db: 1                     # the test db
    options: {}
```
You can flip the switch in tap_cluster.js to (“–conf=development” or “–conf==production” when you start the tap_monitor.js)

You can "-conf=development" or "-conf=production" then check `~/public/javascripts/tap_client.js` for connection address 

For example switch on "-conf=development" then `socket = io.connect('http://localhost:7000/')`

###Sample run

###1. Clone Tap

`$ git clone https://github.com/indykish/tap.git`

###2. Start Tap
 	
`$ node tap_monitor.js`

###3. Start Redis server

`$ redis-server`

###4. Run Logstash -  type following command in your terminal

`$ java -jar logstash-1.1.9-monolithic.jar agent -f test1.conf`

###5. Start a Tomcat container in port 8080.

Ensure that you perform something on the tomcat container, just to make sure the logs get populated. You should notice some activity in your logstash console.

###6. Type the URL on your favorite browser and enjoy the live streaming http://localhost:7000/streams/logstashtest


We are glad to help if you have questions, or request for new features..

[twitter](http://twitter.com/indykish) [email](<rajthilak@megam.co.in>)

# License


|                      |                                          |
|:---------------------|:-----------------------------------------|
| **Author:**          | Rajthilak (<rajthilak@megam.co.in>)
| **Copyright:**       | Copyright (c) 2012-2013 Megam Systems.
| **License:**         | Apache License, Version 2.0

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


