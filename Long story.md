Introduction.
Best password policy is 12 characters with all caps/number/symbol, no common passwords, no password reuse, MFA, 

The best military-grade password policy is one that is based on the latest security recommendations and tailored to the specific needs of the organization. However, there are some general best practices that can be followed to create a strong password policy:
•	Require long passwords. The longer a password is, the more difficult it is to crack. Military-grade passwords should be at least 12 characters long, and longer is even better.
•	Discourage password reuse. Users should be prohibited from reusing old passwords, as this makes it easier for attackers to gain access to multiple accounts if they compromise one.
•	Ban common passwords. There are many lists of common passwords that are widely available online. Attackers often use these lists to try to crack passwords, so it is important to ban common passwords from your organization's policy.
•	Require a mix of character types. Passwords should contain a mix of uppercase and lowercase letters, numbers, and symbols. This makes them more difficult to crack because attackers have to guess more possible combinations.

Usual users use about 190 resources where password required. Taking into mind that no password should be reused it is practically impossible to memorize all those passwords. 
So, the password managers arise.  
Firstly, we’ve got password vault integrated in our browsers, and we know how easy it was to get an access to all passwords in a browser’s settings. Later-on standalone managers became popular. They are more secure, they encrypt the vault and use more advanced technology to guarantee confidence.
After local password vaults were discarded by users who work across several machines the decision has been made to offer cloud vaults. Probably it is true that a professional company can offer more security for your password, but we now have a 3-d party in our secret life. And here a huge question of trust appeared.
Even though we still consider that the user is the main security vulnerability in a system, we still have user specific complains like
-	I need this password to use on different machines where no manager installed.
-	This resource is not so important to hustle around with difficult password.
-	Password managers are hard to install and hard to use.
-	I don’t want to spend so much time on periodical authentication with password managers.
There are also company specific worries like 
-	How can we trust to 3rd party?
-	We do not want to give any 3rd party access to our passwords.
-	Compromised one password is an issue but all passwords compromised in one time is a much bigger problem
-	Big password-storing clouds attract more attention from more sophisticated hackers, so our password list may become available on dark-web, even though they would never go for us if we keep our passwords separately
And really, password managers became a sweet target for a lot of bad actors. Especially those who keep password in the cloud. Braking one you get access to many!

•	n 2015, a vulnerability was discovered in LastPass that could have allowed attackers to steal users' passwords. The vulnerability was exploited by attackers to steal the passwords of over 70 million LastPass users.
•	In 2016, a vulnerability was discovered in 1Password that could have allowed attackers to export users' passwords in plain text. The vulnerability was fixed by 1Password, but it is a reminder that even the most popular password managers can be vulnerable.
•	In 2017, a vulnerability was discovered in Dashlane that could have allowed attackers to steal users' passwords. The vulnerability was fixed by Dashlane, but it is another reminder that password managers are not perfect.
•	2018, a vulnerability was discovered in Keeper that could have allowed attackers to steal users' passwords if they had access to the user's device
•	In August 2022, a security researcher discovered a vulnerability in Bitwarden that could have allowed attackers to steal users' passwords if they had access to the user's device and were able to intercept traffic between the Bitwarden app and the Bitwarden server. The vulnerability was fixed by Bitwarden in the same month.
•	In September 2022, a security researcher discovered a vulnerability in LastPass that could have allowed attackers to steal users' passwords if they were able to trick a user into opening a malicious link. The vulnerability was fixed by LastPass in the same month.
•	In January 2023, a security researcher discovered a vulnerability in 1Password that could have allowed attackers to steal users' passwords if they were able to trick a user into installing a malicious version of the 1Password app. The vulnerability was fixed by 1Password in the same month.
In addition to these specific examples, there are a few other potential security vulnerabilities that could affect password managers. For example, password managers could be vulnerable to phishing attacks, malware attacks, and supply chain attacks.

So – the question is – what shall we do to improve password security and still give flexibility for our users?
I asked this question ChatGPT and funny enough what I’ve got:
1.	Educate and Train Users: Start by educating your users on the importance of strong passwords and the potential risks associated with weak ones. Make sure they understand that their accounts and sensitive information could be compromised if they use easily guessable passwords.
2.	Simplify the Password Policy: Review your existing password policy and consider making it more user-friendly while maintaining security. For example:
•	Reduce complexity requirements: Allow users to create passwords with fewer special characters or make them optional.
•	Increase password length: Require longer passwords rather than complex ones.
•	Encourage passphrases: Suggest the use of passphrases (a series of words or a sentence) instead of traditional passwords, which are easier to remember and can be strong.
3.	Two-Factor Authentication (2FA):
So, We started with hardening and now speaking about easing…
And what if I tell you that 2FA in lastPass (one of the most trusted Password Managers) works only when there is an Internet connection. No connection and your local vault available only with a passphrase.

So, we decided to introduce our new vision on password management. 123Pass!
Fool-proof, easy to use, globally accessible yet nothing trusted to 3rd party, fully confidential – you do not give us any of your PI - no telephone no e-mail, no user database kept together with passwords.
You download our browser extension, set it up, and when it is time to enter a password, you will get a popup window which will ask you for your easy to remember password. In a second this password will be converted into very strong, any character length password which you will use for the entrance. 
For lazy users, who do not want to change password for each website, we added some entropy derived from the web domain itself.
Our application will not keep your password and will not write it to the disk. It also does not have a connection to any of our servers. Once used – we forgot about it – no traces. 
You also can use our app to remind you your passwords from other services like ssh access, corporate domain access or local applications. You download it from any computer in the world, enter your easy password and get your strong password which you used before. 
Never mind how short is your easy password, your strong password will be perfectly strong and of any required length. And the key to your password will be only you!

What is under the hood?
During the setup user required to input required password length and a secret word or phrase which they can easily remember but which is also hard to guess. This string will be used as pre-salt (s1). 
Using user-determined salts, where each user provides their own unique salt, will give us considerable advantages 
1.	User Control: Allowing users to provide their own salts gives them a sense of control over their password security. They can choose a salt they can easily remember.
2.	Unique Salts: User-determined salts would be unique for each user, which means that even if multiple users have the same password, their salts would make the resulting hashes different.
3.	Improved Security: If users choose strong and unique salts, it can significantly enhance the security of their passwords, even if their actual passwords are relatively weak.
4.	Balanced Usability: This approach can strike a balance between security and usability. Users can have strong and unique salts without the need to remember complex passwords.

Later this s1 will be hashed and this hash will be used as a real salt (s2). By this we avoid the potential issue with weak salt. 
The system will not store s1 but instead it will store encrypted s2. The key to the storage will be autogenerated during setup using unique machine and time parameters. (advanced users have an option not to store the salt at all). When a user inputs his/her easy password our app adds s2 and provides triple Argon2 hashing. Then it will carve needed password length and provide it to the user. The user may auto send it to the password line or copy it to the clipboard to use with other applications.
As all encryption happens on a local machine the only risk, we can see from this stage is the unlucky event when a bad actor takes over this computer. There is no password storage anywhere, so if the easy password was not so easy, we are safe. But we realize that such a promise like using easy passwords may lead to user awareness loss and absolute simplification of passwords. In this case it will be possible to run a wordlist with local salt to create a new wordlist with resulting hashes and then exploit a bruteforcer to find a password. To do this operation harder we encrypt salt so it can not be derived from the application, and we slow down the creation process to prevent automation. So even if somebody got an access to the local machine it will be impossible to get salt to the hacker’s machine and even if he could do password creation process on the local machine it will be so slow so discovering hashes for a list like rockyou.txt will take more than a year of continuous work. For those concerned with this we offer not to store salt on a hard drive but use operative memory instead and reenter salt string every time they restart the application (probably it will be once a day). We also offer user to chose the working directory for the application, so he may assign it to USB flash drive to store the salt separately from the machine. 
In addition to all security precautions we implemented security alerts which will make an alert the users if their salt or hashed password is being accessed or used in an unexpected or suspicious way.
To gain community trust we decided to make our code open, so anyone could try it and see there are no backdoors or any hidden facilities.


-	All calculations are made in memory.
-	User input: salt, working directory, “do you want to store your salt?”
-	UI – password string and use or copy buttons.
-	Salt stored encrypted with ChaCha20 algorithm and deciphered only when required strictly into memory with time limit. 
-	Hashing done with Argon2 and then carved for desired length. 
-	we need to ensure compliance with website’s password policy for Capital letters/numbers/symbols. 
-	Access to working directory by anyone other than the application causes alert.
We start with Chrome Extension
1.	Start/Finish
a.	Extension must start in the background together with it’s browser, and listens to “password/passphrase” form on active tab.
b.	Extension pops up either on spotted “password/passphrase’ form or manually by clicking on the extension icon.
c.	Popup window should not have any browser specific details as tabs, tab name, address path etc. it will close itself as user clicks outside the extension window.
d.	Background process closes with browser closing.
e.	With closing background process memory should be emptied
2.	Appearance. 
a.	There are two working pages – usual, from which it starts – popup.html and setup page – options.html
b.	Both pages occupy same rectangle in the upper-right corner of the active tab
c.	All blocks inside the window are put in a horizontal row
d.	Size of the window and elements in it must have ability to dynamically change dependent on screen resolution

Options.html
On this page we do initial inputs: Master-Passphrase, SaveLocal Y/N, Pathway to save locally if Y, and Apply button. We need to add asteric masking to Master-Passphrase and unmasking button, change colour of the tickbox to white, add default storage to .\storage
Check if MasterPassthrase is more than 8 character length.
If SaveToAFile set to Y the pathway must be set either to default or user defined. If it is set to N, we do not need pathway to be enterd.
After Apply button hit following logic must happen – MasterPassphrase hashed with Argon2 and resulting hash will become Salt. We erase MasterPassphrase from memory and store in memory only Salt. If SaveToAFile set to Y, we also save it to local file, using supplied Path, for future use. Check if the file saved and report errors.
Close setup page and go tp popup page.

Popup.html
This is our main page. When popped up, the extension will wait for EasyPass passphrase and other user inputs. When GeneratePassword button hit, we check EasyPass length (it must be  between 4 and 20 Then check if Salt available in memory. If not – check if Salt available in storage location specified in Setup. If available – put it in memory. If not available – offer to do Setup. 
If all requirements met, we take EasyPass add to it Domain (if use domain checked)  add to it Salt and hash it with Argon2. After we got the hash carve a portion of necessary symbols as requested by user Length input. 
Display new window with generated password and allow copy sybol.
Fill Password form from the active tab with generated password.
All extension windows closed when user clicks the area outside the extension.
We do not allow any syncing and do not permit use of any received data by Chrome or other than our extension applications. 

After user hit Generate button the Generated Pass will appear on a new button. when you click on it the password will be copied to the clipboard and also it will be populated to the Password field on the Active tab together with the Username.

Please try and share your feedback!



