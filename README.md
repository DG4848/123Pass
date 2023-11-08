# 123Pass is a Crome extension for password hardening and managing.

Never trust your secrets to third parties!
This extension helps you to create and remember unique and strong password for each resource while remembering only easy to memorize words.
Once you installed the extension go to setup page and input your MasterPassphrase (this meant to be more strong part of your secret but there is no major requirements for it)
and default username if you wish it will be substituted when asked. You also may opt out from local storing your MasterPassphrase. (Storage pathway in order to store secret to USB drive is not implemented yet.) 
After you hit Apply, your MasterPassphrase hashed and stored in this hashed state. It called Deterministic Salt lately. (Encrypting the Salt is our next step, not implemented yet). 
Being on the main page you invited to enter EasyPass which is your favorite password. you probably may use even 1111 though I do not recommend this.
You also input desired password length and opt for using a domain name as additional source of entropy.
Hitting Generate concatenates EasyPass + Domain + Salt and hash it with SHA256. Finally this hash modified to desired length, excluded undesired symbols and ensuring the 
first symbol will always be a special symbol from the list.

With this easy idea you will always have same result if you use same inputs. This means you do not need to use Cloud storage to keep your passwords. It is enough to 
remember several words instead. bit mevertheless you will have unique password to each of your domains. You also may use this extension for password generating to your 
non-web applications and domains. Simply input some other name instead of Domain initially proposed.

Please ask your questions and share your ideas for improvement.

PS: This code is a beta version. please check it yourself. I also encourage you to rise concerns and offer solutions to the functionality.

PPS: I put this project under open licence so anyone can use the code freely but this does not mean that I will not put this application on the market for commercial use lately. 
