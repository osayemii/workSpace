# Dev Assistant Chatbot

A web-based chatbot focused on **software development help** – things like:

- building web apps (React, Node, etc.)
- finding and explaining errors in your code
- suggesting improvements and best practices

The frontend is built with **React + Vite**, and it talks to a small **Node/Express** backend that calls the OpenAI Chat Completions API with a software-dev-focused system prompt.

## 1. Prerequisites

- Node.js 18+ (for built-in `fetch` in Node)
- An OpenAI API key

## 2. Setup

From the workspace root:

```bash
cd dev-chatbot
npm install
```

Then create a `.env` file inside `dev-chatbot`:

```bash
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

> **Never commit your real API key to GitHub or share it publicly.**

## 3. Run the app

In the `dev-chatbot` folder:

```bash
npm run dev
```

This runs:

- the backend on `http://localhost:5000`
- the React app on `http://localhost:5173` (Vite), with a proxy from `/api` → backend

Open `http://localhost:5173` in your browser to use the chatbot.

## 4. How it behaves

- The backend sends a **system prompt** that tells the model to act as an expert software engineer.
- The frontend sends:
  - your latest message
  - a small recent **history** of your conversation
- The model is encouraged to:
  - give step-by-step guidance
  - include concrete code samples
  - keep explanations clear and focused

You can ask things like:

- “Build a React todo app that stores items in localStorage.”
- “Here is a TypeScript error, help me fix it: …”
- “Why does this Express middleware never run?”


