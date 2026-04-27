# Interview Guide: Lost & Found Portal

Use these simple explanations if the interviewer asks "How does this work?" or "Why did you do it this way?"

## 1. Authentication (The "Name Tag" System)
**Question:** "How do you keep users logged in?"
**Answer:** "I use **Cookies**. When a user logs in, the server sends a small piece of data (a cookie) to the browser. The browser 'wears' this cookie like a name tag. Every time the user sends a request (like posting an item), the server looks at the name tag to see who they are."

## 2. Security (The "Secret Code")
**Question:** "Why did you use Bcrypt?"
**Answer:** "Security is important. I used **Bcrypt** to hash passwords. This means even if a hacker gets into the database, they only see a long string of random characters, not the user's real password. We never store plain passwords."

## 3. Middleware (The "Security Guard")
**Question:** "What is the `protect` function in your routes?"
**Answer:** "That is a **Middleware**. Think of it as a security guard standing at the door of certain routes (like 'Post Item'). Before letting anyone in, the guard checks their cookie. If they aren't logged in, the guard stops them and says 'Please login first'."

## 4. Database Models (The "Blueprints")
**Question:** "What is a Mongoose Schema?"
**Answer:** "It's a **blueprint** or a template. It tells the database exactly what fields an 'Item' should have—like a name, a description, and a location. This keeps our data organized and prevents mistakes."

## 5. Problem Solving (The "Real World" Value)
**Question:** "What problem does this app solve?"
**Answer:** "It helps common people recover lost items. But more than that, it helps with the **legal steps**. For example, the 'Mobile Lock' section connects users to the official government portal (CEIR) to block their stolen phone's IMEI, making the phone useless to thieves."

## 6. Logic (The "Matchmaker")
**Question:** "How do you match lost and found items?"
**Answer:** "I wrote a simple function that checks the database. If someone posts a 'Lost Wallet', the system automatically searches for a 'Found Wallet' in the same area. For mobiles, it matches the unique **IMEI number** for 100% accuracy."

---

### If you get stuck:
Just say: *"I wanted to build something that actually helps people. I focused on a clean UI and making sure the core features—like authentication and matching—work smoothly to solve the user's problem."*
