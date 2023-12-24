### PoC of RCE with prototype pollution

This PoC has made based on the research and work of this articles, all credit for the discovers and research.

We always saw that prototype pollution could lead to RCE, the main samples provide was if a poison property was used with eval of it's similars. But the article '' provide a new away and attack suffarce for prototype pollution using gadgets. This gadgets can be from a package or even from node internals itself.

This PoC tries to simulate an application that resize images (but can be more complex tasks) using GM with CLI to achieve that. The application also requires a user registration. (Only for PoC purpose, you can use your imagine and think in a more fancy vulnerable application)

[PoC Video](https://github.com/francoatmega/parsing-vulnerabilities-pocs/blob/main/js/prototype-pollution-rce/video.mov)

## How to run

To run the PoC follow the steps:

* Install GM via CLI in your machine
* Run npm i 
* Run ./exploit.sh
* Run the reverse shell
* Pwned!

## OBS

For this PoC works some preconditions are needed:

* A prototype pollution vulnerability (In this PoC we are the vulnerable version of lodash 4.17 and above)
* A user controlled input to exploit the vulnerability (In this PoC the route PUT /users/:id)
* A gadget to achive RCE (In this case the endpoint POST /resise using execSync)
