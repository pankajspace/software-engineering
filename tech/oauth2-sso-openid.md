[<- TECH](tech-quick.md)

# OAuth2
What is OAuth2, explain in detail with analogy and example. Also explain different components or aspects of it and how they interact together to make OAuth2 work.

## 🔑 What is OAuth 2.0?

**OAuth 2.0** (which stands for "Open Authorization") is a security standard that allows one application to access your data from another application on your behalf, **without giving it your password**.

It's a protocol for **delegated authorization**. It's not about *who you are* (that's **authentication**), but about *what you're allowing an app to do* (that's **authorization**).

You see it every day when an app says, "Sign in with Google" or "This app wants to access your Google Photos." You are giving that app *permission* to act on your behalf, but you are giving your password only to Google, never to the app itself.

-----

## 🚗 The Analogy: The Valet Key

This is the classic and clearest analogy for OAuth 2.0.

  * **Your Password = Your Master Key:** Your car's master key can do everything: start the car, open the doors, open the trunk, and open the glove box (where you keep your sensitive documents). You would never give this key to a valet.
  * **The App = The Valet:** The valet is a third-party service that needs to perform a *specific job* (park your car).
  * **The OAuth Token = The Valet Key:** Instead of your master key, you give the valet a "valet key." This special key (the **Access Token**) has limited permissions (its **scope**):
      * It **CAN** start the car and open the driver's door.
      * It **CANNOT** open the trunk or the glove box.
      * It might also be temporary (it only works for the night).

With this key, the valet can do their job (park the car) without you having to give them full, risky access to everything you own. You, the car owner, have *delegated* the "park the car" permission to the valet, without sharing your master key.

-----

## 🧩 The Core Components (The "Roles")

OAuth 2.0 works by defining four distinct roles. Let's use a real-world example: *You want to use a (fictional) app called `PhotoPrinter.com` to print photos from your `Google Photos` account.*

1.  **Resource Owner (The User):**

      * This is **you**. You own the data (your photos). You are the only one with the power to grant access to it.

2.  **Client (The Application):**

      * This is the third-party application that wants to access your data.
      * **Example:** `PhotoPrinter.com`.

3.  **Authorization Server (The "Gatekeeper"):**

      * This is the system that manages your identity and authorization. It's the one that asks you for your username/password and shows you the "Allow/Deny" consent screen.
      * **Example:** Google's Login & Identity Service.

4.  **Resource Server (The "Vault"):**

      * This is the server that actually hosts your protected data (the "resource").
      * **Example:** The Google Photos API (the "vault" that holds your pictures).

Often, the **Authorization Server** and **Resource Server** are run by the same company (like Google in this case).

-----

## 🔄 How They Interact: The Step-by-Step Flow

This is how the components "talk" to each other. The most common and secure flow is called the **Authorization Code Grant**.

Let's stick with our `PhotoPrinter.com` example.

1.  **Authorization Request:**

      * You are on `PhotoPrinter.com` and click "Import from Google Photos."
      * `PhotoPrinter.com` (the **Client**) doesn't ask for your Google password. Instead, it redirects your browser to Google (the **Authorization Server**) with a specific request: "Hi Google, I am `PhotoPrinter.com` (`client_id`), and I'd like to request permission to `read_photos` (`scope`) from this user. When you're done, please send the user back to `photoprinter.com/callback` (`redirect_uri`)."

2.  **User Authentication & Consent:**

      * Your browser is now at a `google.com` login page. You (the **Resource Owner**) securely enter your Google username and password.
      * Google (the **Authorization Server**) authenticates you and then shows you a consent screen: "https://www.google.com/url?sa=E\&source=gmail\&q=PhotoPrinter.com wants to **View your Google Photos**."
      * You click **"Allow."**

3.  **Authorization Code Issued:**

      * Google (the **Authorization Server**) now knows you've given permission.
      * It redirects your browser back to the `redirect_uri` (`photoprinter.com/callback`) and attaches a short-lived, one-time-use **Authorization Code**.

4.  **Access Token Request (The "Secret" Step):**

      * Your browser lands on `PhotoPrinter.com` with this `code`.
      * *Crucially, this next step happens in the background, server-to-server.*
      * `PhotoPrinter.com`'s *backend server* (the **Client**) takes that temporary `code` and makes a direct, secure call to Google (the **Authorization Server**).
      * It says: "Hi Google, here is the `code` you just gave the user, and here is my `client_secret` (my private password, proving I am really `PhotoPrinter.com`). Please exchange this for a real token."

5.  **Access Token Issued (The "Valet Key"):**

      * Google (the **Authorization Server**) verifies the `code` and the `client_secret`.
      * If everything checks out, it responds by giving `PhotoPrinter.com`'s server the all-important **Access Token**. This is the "valet key."

6.  **Accessing the Resource:**

      * `PhotoPrinter.com` (the **Client**) now wants to show you your photos.
      * It makes an API call to the Google Photos API (the **Resource Server**), and in the request header, it includes the token: "Authorization: Bearer `[THE_ACCESS_TOKEN]`".
      * It's essentially saying, "Here is my valet key."

7.  **Resource Granted:**

      * The Google Photos API (the **Resource Server**) receives this request, validates the **Access Token**, checks its permissions (the `scope`), and confirms that this token is indeed allowed to `read_photos`.
      * It then sends the photos back to `PhotoPrinter.com`, which displays them for you.

At no point did `PhotoPrinter.com` ever see, or need to see, your Google password. And if you later decide you no longer trust `PhotoPrinter.com`, you can go into your Google account settings and "revoke" its access, making its "valet key" useless.

-----

# SSO
What is SSO (Single Sign-On), explain in detail with analogy and example. Also explain different components or aspects of it and how they interact together to make SSO work.

## 🔑 What is Single Sign-On (SSO)?

**Single Sign-On (SSO)** is an authentication service that allows a user to log in **one time** with a **single set of credentials** (like a username and password) and gain access to multiple, independent software applications without having to log in to each one separately.

Instead of you remembering a different password for your email, your HR portal, your project management tool, and your cloud storage, you log in just once to a central system. That system then "vouches" for your identity to all the other applications, logging you in automatically.

---

## 🎪 The Analogy: A VIP Theme Park Wristband

Imagine all your work applications (Slack, Gmail, Salesforce, etc.) are different rides and attractions inside a giant theme park.

* **Without SSO:** This is the old-fashioned way. To get into the park, you buy a main ticket. But then, to ride the "Space Coaster" (e.g., Salesforce), you have to go to its specific ticket booth, show your ID, and buy a separate ticket. To enter the "Haunted Mansion" (e.g., Slack), you have to go to *its* ticket booth, show your ID again, and buy *another* ticket. It's frustrating and you have a pocket full of different tickets you might lose.

* **With SSO:** This is the modern, VIP way.
    1.  **The Main Gate:** You go to the theme park's main entrance **one time**. This is the **Identity Provider (IdP)**.
    2.  **Authentication:** You show your ID and your main pass (your username and password) to the security guard at the gate.
    3.  **The "Token":** The guard verifies you are who you say you are and gives you a secure, scannable **VIP wristband**. This is your **SSO Token**.
    4.  **Accessing Rides:** You walk up to the "Space Coaster" (the **Service Provider, SP**). The attendant doesn't ask for your ID or a ticket. They just scan your wristband. The scan confirms, "This wristband was issued by our trusted main gate and is valid." You're in.
    5.  **Seamless Experience:** You finish the ride and walk over to the "Haunted Mansion." You scan the *same wristband*, and you're in instantly.

You only had to prove your identity *once* (at the main gate), and the wristband (token) now grants you access to all the rides (applications) that trust the main gate.

---

## 🧩 The Core Components of SSO

SSO is built on a "trust relationship" between two main types of systems.

1.  **Identity Provider (IdP):**
    * **This is the "Main Gate."** It is the central, authoritative system that **manages and authenticates** your identity.
    * **Its Job:** It stores the user's credentials (or connects to a directory that does, like Active Directory). It is responsible for verifying you are who you say you are (by checking your password, sending you an MFA push, etc.).
    * **Examples:** **Okta**, **Azure Active Directory (Azure AD)**, **Google Identity**, Ping Identity, Auth0.

2.  **Service Provider (SP):**
    * **This is the "Ride" or "Attraction."** It is the application or service the user wants to access.
    * **Its Job:** It provides a service (e.g., email, CRM, project tracking). It does *not* want the responsibility of storing and managing user passwords. It **delegates** the job of authentication to the IdP.
    * **Examples:** **Salesforce**, **Slack**, **Google Workspace (Gmail/Drive)**, **AWS**, **Jira**.

3.  **The Token (or Assertion):**
    * **This is the "VIP Wristband."** It's a secure, digitally signed piece of data that the IdP passes to the SP *after* the user is authenticated.
    * **Its Job:** It's the proof that the IdP sends to the SP, saying, "I, the trusted IdP, have successfully authenticated this user. Their email is `user@company.com`. You can trust me and let them in."
    * **Protocols:** This exchange is standardized. The two most common "languages" for this token are:
        * **SAML (Security Assertion Markup Language):** The classic, robust standard, very common for enterprise web applications. It uses an XML-based token.
        * **OIDC (OpenID Connect):** A modern, lightweight standard built on OAuth 2.0. It uses a JSON-based token (called a JWT, or JSON Web Token) and is very common for mobile and consumer apps ("Sign in with Google" often uses OIDC).

---

## 🔄 How They Interact: The SSO Flow (Step-by-Step)

This "redirect dance" is how the components work together. The most common flow is called the **SP-Initiated Flow**.

**Scenario:** You are not logged in to anything. You want to access your company's Salesforce account.

1.  **Step 1: User Accesses the SP**
    * You open your browser and go to `company.salesforce.com` (the **Service Provider**).

2.  **Step 2: SP Redirects to IdP**
    * Salesforce (SP) sees you don't have a valid session.
    * Instead of showing you a Salesforce login page, it says, "I don't handle logins. I trust Okta for that." (This trust was set up by your IT admin beforehand).
    * Salesforce generates an authentication request and **redirects** your browser to your company's Okta login page: `company.okta.com/login`.

3.  **Step 3: User Authenticates with IdP**
    * Your browser is now at the Okta login page (the **Identity Provider**).
    * You enter your single, trusted set of credentials (your company username, password, and maybe an MFA code).

4.  **Step 4: IdP Verifies and Generates Token**
    * Okta (IdP) validates your credentials. They are correct.
    * Okta generates a **SAML token** (the "wristband"). This token contains your identity information (like your email address) and is digitally signed by Okta's private key.

5.  **Step 5: IdP Redirects Back to SP (with Token)**
    * Okta **redirects** your browser *back* to Salesforce (the SP).
    * This redirect is sent to a special URL on Salesforce's side (called the Assertion Consumer Service or ACS). The signed token is invisibly included in this redirect (as a `POST` request).

6.  **Step 6: SP Verifies Token and Grants Access**
    * Salesforce (SP) receives the token. It checks the token's digital signature using Okta's public key (which was shared during the one-time setup).
    * The signature is valid! This proves the token is authentic and came from the trusted IdP.
    * Salesforce reads the user's email from the token, creates a local session for you, and logs you in.

**The "SSO" Magic:**
You are now in Salesforce. A minute later, you open a new tab and go to `company.slack.com`.
* Slack (another SP) sees you have no session and redirects you to Okta (IdP).
* But Okta sees you *already* have a valid session (from when you logged in for Salesforce).
* It skips the login page entirely and *immediately* redirects you back to Slack with a new token.
* You are logged into Slack instantly, without typing anything.

That is the power of Single Sign-On.

-----

# OpenID
What is OpenID, explain in detail with analogy and example. Also explain different components or aspects of it and how they interact together to make OpenID work.

OpenID is a protocol for **authentication** (proving who you are). It allows you to use a single digital identity from a trusted source to log in to many different websites and applications.

Its primary job is to answer the question: **"Who is this user?"**

You use it every day with buttons like "Sign in with Google," "Sign in with Apple," or "Sign in with Facebook."

### The Crucial Clarification: OpenID vs. OpenID Connect (OIDC)

When people talk about "OpenID" today, they almost always mean **OpenID Connect (OIDC)**.

  * **OpenID (Old):** An early version of this idea.
  * **OAuth 2.0:** The protocol for **authorization** (what you're allowed to *do*), which I explained previously. It gives out "Access Tokens" (the valet key).
  * **OpenID Connect (OIDC):** The modern, universal standard. It is **an identity layer built *on top of* OAuth 2.0.**

Think of it this way:

> **OAuth 2.0** provides the "valet key" (Access Token) to access resources.
> **OIDC** adds a "passport" (ID Token) to the process, which proves your identity.

An application that *only* needs to log you in uses OIDC. An application that needs to log you in *and* access your data (like your Google Photos) uses OIDC *and* OAuth 2.0 together (which OIDC is designed to do).

-----

## 🛂 The Analogy: The International Passport Check

This analogy helps distinguish OIDC (identity) from OAuth 2.0 (permission).

  * **Your (OAuth) Valet Key:** Lets a valet park your car. It says nothing about *who you are*.
  * **Your (OIDC) Passport:** Proves your name, your date of birth, and your nationality. It's all about **your identity**.

**Scenario:** You (the **User**) want to check into a hotel in a foreign country (the **Application** or **Relying Party**).

1.  **The Request:** You go to the hotel's front desk. They don't know you. You can't just say "I'm me, give me a key." You need to prove *who you are*.
2.  **The "Passport":** You present your passport. This passport is your **ID Token**.
3.  **The "Issuer":** The hotel's front desk doesn't know you, but they **trust** the government that issued your passport (e.g., the U.S. government). This is the **OpenID Provider** (like Google or Apple).
4.  **Verification:** The front desk clerk (the App) inspects the passport. They check its security features (its digital signature) to make sure it's not a fake. They see it was issued by a trusted government (the OP) and that the photo matches your face.
5.  **Access Granted:** Now that they have verified *who you are*, they "log you in" by giving you a room key.

The hotel never had to know your "home password" (like the keys to your house). They just needed to see and trust your passport.

-----

## 🧩 The Core Components of OpenID Connect (OIDC)

The names are slightly different from OAuth 2.0, but the roles are similar.

1.  **User:**

      * This is **you**, the person who wants to log in.

2.  **OpenID Provider (OP):**

      * This is the "passport office." It's the system that **manages your identity** and **authenticates you** (checks your username/password).
      * It issues the "passport."
      * **Examples:** **Google's Identity Service**, **Apple ID**, **Auth0**, **Okta**. (This is the same as the "Authorization Server" in OAuth 2.0).

3.  **Relying Party (RP):**

      * This is the "hotel front desk." It's the application or website that **needs to know who you are**.
      * It "relies" on the OpenID Provider to verify your identity.
      * **Examples:** `Canva.com`, `Slack`, or any app that has a "Sign in with..." button. (This is the same as the "Client" in OAuth 2.0).

4.  **The ID Token (This is the key\!):**

      * This is the "passport" itself. It's a secure, digitally signed piece of data called a **JSON Web Token (JWT)**.
      * It contains information about you (called **"claims"**), such as your name, email address, and a unique ID.
      * The Relying Party (the app) reads this token to find out who you are.

-----

## 🔄 How They Interact: The "Sign in with Google" Flow

Let's use a real example: You go to `Canva.com` (Relying Party) and click "Sign in with Google" (OpenID Provider).

1.  **Step 1: The Request (RP to OP)**

      * `Canva` (the RP) sees you want to use Google. It crafts a request and redirects your browser to Google's login page (the OP).
      * This request is just like the OAuth 2.0 request, but it *must* include a special `scope` called `openid`. This is the magic switch that tells Google, "I'm not just here for a valet key, I also need a passport\!"

2.  **Step 2: User Authentication & Consent**

      * Your browser is now at `google.com`.
      * You enter your Google username and password (authenticating with the OP).
      * Google shows you a consent screen: "`Canva.com` wants to: **Know who you are** and **View your email address**."
      * You click **"Allow."**

3.  **Step 3: Tokens Are Issued (OP to RP)**

      * This is where OIDC's magic happens. Google's server now has your permission.
      * It redirects your browser back to `Canva`. As part of this, it sends `Canva`'s backend an **Authorization Code** (just like in OAuth 2.0).
      * `Canva`'s backend server *exchanges* this code with Google's server. Google then sends back a package containing:
          * An **Access Token:** The OAuth 2.0 "valet key." `Canva` might use this if it *also* needed to access your Google Drive files, for example.
          * An **ID Token:** The OIDC "passport."

4.  **Step 4: Identity Verification (RP logs you in)**

      * `Canva` (the RP) receives this **ID Token**.
      * It first checks the token's digital signature to prove it's authentic and really came from Google.
      * It then opens the token (which is just a block of text) and reads the "claims" inside:
        ```json
        {
          "iss": "https://accounts.google.com",
          "sub": "1098...56",
          "email": "you@gmail.com",
          "name": "Your Name",
          "picture": "https://.../your-photo.jpg"
        }
        ```
      * `Canva`'s system now says, "Aha\! This person is `you@gmail.com`." It then creates an account for you (or logs you into your existing one) and you are successfully signed in.

**In summary:** OAuth 2.0 is the *framework* for letting apps do things on your behalf (giving a "valet key"). OpenID Connect is a layer *on top* of it that adds a "passport" (ID Token) to prove *who you are*.

-----

# OAuth2 vs SSO vs OpenID Connect: Similarities and Differences. Are they dependent on each other? Or can they work independently?

This is a fantastic question, as it gets to the heart of modern identity and security. Here's the breakdown.

The simplest way to think about it is by their **primary job**:

* **OAuth 2.0 (Authorization):** Answers "**What can this app *do*?**" It's about delegating *permission*.
* **OpenID Connect (Authentication):** Answers "**Who *is* this user?**" It's about proving *identity*.
* **SSO (Experience):** Is **not** a protocol. It's a *concept* or *service* that means "log in once, access many." It's the *goal* you want to achieve.

---

### 📊 Quick Comparison Table

Using our analogies from before, here is how they stack up:

| Feature          | SSO (Single Sign-On)                                 | OAuth 2.0                              | OpenID Connect (OIDC)                  |
| :--------------- | :--------------------------------------------------- | :------------------------------------- | :------------------------------------- |
| **Main Purpose** | A **concept** or **service**.                        | A **protocol** for **Authorization**.  | A **protocol** for **Authentication**. |
| **Analogy**      | 🎟️ **Theme Park Wristband**                           | 🚗 **Valet Key**                        | 🛂 **Passport**                         |
| **Answers...**   | "Is this user already logged in?"                    | "What can this app *do* on my behalf?" | "Who *is* this user?"                  |
| **Key Token**    | Varies. (Could be a SAML token, or an OIDC session). | `Access Token`                         | `ID Token`                             |

---

### 🤔 Similarities

* **User Experience:** They all work to reduce "password fatigue." You don't have to (or shouldn't) share your primary password with every app.
* **Redirects:** They all use a similar browser-based "redirect dance" where the user is sent from the app to a trusted provider (like Google) and then back to the app.
* **Tokens:** They all rely on passing secure, digitally-signed *tokens* (like JWTs or SAML assertions) to prove something.
* **Centralization:** They all rely on a central, trusted authority (an Identity Provider or Authorization Server) to manage the process.

---

### 🧩 Dependencies & How They Work Together

This is the most important part. Here are the rules of their relationship:

1.  **OIDC is DEPENDENT on OAuth 2.0.**
    * You **cannot** have OpenID Connect without OAuth 2.0.
    * OIDC is literally just an *identity layer* built on top of the OAuth 2.0 framework.
    * When an app requests authentication using OIDC, it *must* include `scope=openid` in its OAuth 2.0 request. This "magic switch" tells the server: "Hey, in addition to an OAuth `Access Token` (valet key), I also need an OIDC `ID Token` (passport)."

2.  **OAuth 2.0 can work INDEPENDENTLY.**
    * You can use OAuth 2.0 all by itself. This is very common for server-to-server or API-based scenarios where an application just needs *permission* but doesn't need to know the *identity* of a specific end-user.
    * **Example:** A script that automatically backs up your Google Photos to another service. The script needs *permission* (an `Access Token`) but doesn't need to "log in" as you.

3.  **SSO is a CONCEPT that uses OIDC (or SAML).**
    * You can *achieve* an SSO experience using OIDC.
    * **How?** You use "Sign in with Google" (OIDC) on `Canva.com`. Google authenticates you and sets a session cookie in your browser. Then, you go to `Figma.com` and click "Sign in with Google." Google sees your session cookie, knows you're already logged in, and instantly sends `Figma` the tokens it needs without you re-entering your password.
    * **That's it!** You just experienced **SSO** (the concept) that was *implemented* using **OIDC** (the protocol).
    * *Note:* SSO can also be implemented using an older, XML-based protocol called **SAML**, which is very common in corporate environments (e.g., Okta logging you into Salesforce).

### 💡 Final Summary: How to Think About It

* Use **OAuth 2.0** when you just need **permission** ("Let this app access my photos").
* Use **OpenID Connect** when you need to **log a user in** ("Who is this person?").
* **SSO** is the *result* when you use OIDC (or SAML) to access *multiple* applications after logging in only once.

This technical overview of OAuth 2.0 and OpenID Connect can help visualize how they fit together.