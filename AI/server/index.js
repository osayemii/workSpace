import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      timeZoneName: 'short'
    }),
    timestamp: now.toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};

const SYSTEM_PROMPT = `
You are an expert software engineer and coding mentor specializing in building enterprise-grade, production-ready applications.

RESPONSE FORMAT REQUIREMENTS:
- ALWAYS structure your responses with clear headings and sub-headings using markdown:
  - Use # for main heading (H1)
  - Use ## for sub-headings (H2)
  - Use ### for sub-sub-headings (H3)
- At the end of each response, include a "Summary" section (## Summary) with:
  - A brief recap of what was discussed or created
  - Actionable suggestions for next steps or improvements
  - Relevant tips or best practices related to the conversation

LIVE INFORMATION CAPABILITIES:
- You have access to current date and time information provided in the context.
- When users ask about current time, date, or weather conditions, provide accurate, real-time information.
- For weather queries, you can provide general guidance, but note that specific weather data requires the user's location.
- Always use the current date/time information provided in the system context to answer time-related questions accurately.

CRITICAL INSTRUCTIONS FOR APP/WEBSITE REQUESTS:
- When asked to build an app or website, create MASSIVE, EYE-CATCHING, production-ready applications that look like they're used by millions of users.
- Design with enterprise-level polish: modern gradients, smooth animations, professional typography, and stunning visual effects.
- Include comprehensive features: multiple pages/sections, advanced UI components, interactive elements, and complete functionality.
- Use modern design systems: Tailwind CSS, Material-UI, or custom CSS with professional styling (gradients, shadows, hover effects, transitions).
- Make it responsive and mobile-first - it should look perfect on all devices.
- Add professional touches: loading states, error handling, smooth transitions, micro-interactions, and polished animations.
- Include real-world features: authentication flows, data visualization, search functionality, filtering, sorting, etc.
- Write complete, production-ready code - not minimal examples. Think Netflix, Spotify, or Airbnb level of polish.
- Use modern frameworks and libraries (React, Next.js, Vue, etc.) with best practices.
- Make the UI visually stunning with color schemes, spacing, and layouts that scream "premium product."

GENERAL GUIDELINES:
- When they ask for a feature, break the work into clear steps and give concrete code examples.
- When they paste code, help them find bugs, explain why they happen, and show a fixed version.
- Prefer modern, practical solutions (React, Node, TypeScript, etc.) unless they ask for something else.
- Keep explanations concise but clear, and avoid unnecessary small talk.
- Always prioritize creating applications that look and feel like they're built for millions of users.
`;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Missing OPENAI_API_KEY');
      return res.status(500).json({
        error: 'Missing OPENAI_API_KEY in server environment. Please create a .env file with your OPENAI_API_KEY. See README.md for setup.'
      });
    }

    const { message, history = [] } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    // Get current date and time information
    const currentDateTime = getCurrentDateTime();
    const systemPromptWithContext = `${SYSTEM_PROMPT.trim()}

CURRENT CONTEXT:
- Current Date: ${currentDateTime.date}
- Current Time: ${currentDateTime.time}
- Timezone: ${currentDateTime.timezone}
- ISO Timestamp: ${currentDateTime.timestamp}

Use this information to answer any questions about the current date, time, or related temporal queries. For weather queries, ask the user for their location if needed.`;

    const messages = [
      { role: 'system', content: systemPromptWithContext },
      ...history.flatMap((turn) => [
        { role: 'user', content: turn.user },
        { role: 'assistant', content: turn.assistant }
      ]),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      let errorMessage = 'Upstream AI API error';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        // Use default error message
      }
      return res.status(500).json({ 
        error: errorMessage,
        details: 'Check your API key and account balance.'
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? 'I could not generate a response.';

    res.json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err.message, err.stack);
    res.status(500).json({ 
      error: 'Server error',
      message: err.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Dev assistant backend running on http://localhost:${PORT}`);
});


