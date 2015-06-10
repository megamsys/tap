tap
===

A multitenant realtime streaming framework.

“Tap” project which provides a cloud based real-time streaming using in-memory cloud message(rabbitmq) and nodejs. This provides a powerful idea on streaming based on an URL. 

This approach can be extend to cloud integration using our RESTful connector bed(deccanplato) which provides connectors for various Cloud Application(Salesforce, Google App..Zoho, Xero…).

### Requirements

> 
[Node.js +](http://nodejs.org/)
[Socket.io +](http://socket.io/)
[Express framework ]

[heka](https://hekad.readthedocs.org/)

[deccanplato](https://github.com/indykish/deccanplato/)[(Optional)]

### heka Configuration file(hekad.toml)

```
[logOUT]
type = "LogstreamerInput"
log_directory = "/var/log/nginx/"
file_match = 'access.log'
differentiator = ["log_out"]

[logERR]
type = "LogstreamerInput"
log_directory = "/var/log/nginx/"
file_match = 'error.log'
differentiator = ["log_error"]

[AMQPOutput]
url = "amqp://username:password@www.megam.rabbitmq.co/"
exchange = "megam_exc"
queue = true
exchangeType = "fanout"
message_matcher = 'TRUE'
encoder = "JsonEncoder"

[JsonEncoder]
fields = [ "Timestamp", "Type", "Logger", "Payload", "Hostname" ]

```
Heka demon will be run on every node using a configurable ”<x>.toml” file which says “What log file to watch, and where to drop it in ?”.

Let us watch the following  log location “/var/log/nginx/access.log” and dumps it to the output queue “log_out“.

### Configuring `app.yaml`

The default contents of `app.yaml` is as follows:

```
default:
  server:
    port: 7000
    host: '127.0.0.1'
  amqp:
    host: 'localhost'
    port: 5672
    login: 'username'
    password: 'password'
    connectionTimeout: 0
    authMechanism: 'AMQPLAIN'
    noDelay: true
test:

production:
  server:
    port: 8000
    host: '127.0.0.1'
  amqp:
    host: 'localhost'
    port: 5672
    login: 'username'
    password: 'password'
    connectionTimeout: 0
    authMechanism: 'AMQPLAIN'
    noDelay: true
```
You can flip the switch in tap_cluster.js to (“–conf=development” or “–conf==production” when you start the tap_monitor.js)

You can "-conf=development" or "-conf=production" then check `~/public/javascripts/tap_client.js` for connection address 

For example switch on "-conf=development" then `socket = io.connect('http://localhost:7000/')`

###Sample run

###1. Clone Tap

`$ git clone https://github.com/megamsys/tap.git`

###2. Start Tap
 	
`$ node tap_monitor.js`

###3. Start Rabbitmq server

`$ rabbitmqctl start`

###4. Run Heka -  type following command in your terminal

`$ hekad -confid "path/to/conf.toml"`

###5. Start a Tomcat container in port 8080.

Ensure that you perform something on the nginx container, just to make sure the logs get populated. You should notice some activity in your heka console.

###6. Type the URL on your favorite browser and enjoy the live streaming http://localhost:7000/streams/log_out


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


