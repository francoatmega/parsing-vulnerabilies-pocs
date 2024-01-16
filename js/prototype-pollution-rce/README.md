### PoC of RCE with prototype pollution

This Proof of Concept (PoC) is based on the research and findings presented in the following [article](https://github.com/yuske/silent-spring/blob/master/silent-spring-full-version.pdf), and all credit goes to the authors for their discoveries and research.

Traditionally, prototype pollution leading to Remote Code Execution (RCE) was often associated with scenarios where a poisonous property, typically processed with 'eval' or similar functions, was exploited. However, the article [Silent Spring: Prototype Pollution Leads to Remote Code Execution in Node.js] introduces a novel approach and attack surface for prototype pollution by utilizing gadgets. These gadgets can originate from a package or even Node.js internals.

This PoC aims to emulate an application that resizes images (though the concept can be extended to more complex tasks) using GraphicsMagick (GM) with Command Line Interface (CLI). The application also necessitates user registration. (Note: This is for PoC purposes only; feel free to envision a more sophisticated and vulnerable application for your exploration.)

PoC video:

https://github.com/francoatmega/parsing-vulnerabilities-pocs/assets/8761008/658cd5f7-a4de-4a6a-8dbe-5a42095a34ea

## How to run

To run the PoC follow the steps:

* Install GM via CLI in your machine
* Run npm i 
* Run ./exploit.sh
* Run the reverse shell
* Pwned!

## OBS

For this PoC works some preconditions are needed:

* A prototype pollution vulnerability (In this PoC we are the vulnerable version of lodash 4.17 and above [CVE-2018-3721])
* A user controlled input to exploit the vulnerability (In this PoC the route PUT /users/:id)
* A gadget to achive RCE (In this case the endpoint POST /resise using execSync)
