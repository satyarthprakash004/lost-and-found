# 🔍 Lost & Found Portal

A premium community portal to reconnect people with lost items. Features automated matching, secure authentication, and a modern UI.

## 🚀 Deployment (Render)

1. **Connect GitHub**: Select this repository on Render.
2. **Environment Variables**: Add these in the 'Environment' tab:
   - `MONGO_URI`: MongoDB connection string.
   - `EMAIL_USER`: Gmail address.
   - `EMAIL_PASS`: Gmail App Password.
3. **Build & Start**:
   - Build Command: `npm install`
   - Start Command: `node server.js`

## 🛠 Local Setup

```bash
npm install
npm start
```
*Requires a `.env` file with `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`, and `PORT`.*

## 📂 Structure
- `server.js`: Entry point.
- `public/`: Frontend assets.
- `models/`: Database schemas.
- `routes/`: API endpoints.
- `utils/`: Helper functions.

---
Built by [Satyarth Prakash](https://github.com/satyarthprakash004)

