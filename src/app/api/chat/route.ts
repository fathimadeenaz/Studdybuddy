// // api/chat.ts
// import type { NextApiRequest, NextApiResponse } from 'next';

// const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// if (!OPENAI_API_KEY) {
//   throw new Error('Missing OPENAI_API_KEY in environment variables');
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Only POST method allowed' });
//   }

//   const { messages } = req.body;

//   if (!messages || !Array.isArray(messages)) {
//     return res.status(400).json({ error: 'Messages are required and should be an array' });
//   }

//   try {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'gpt-4o-mini',  // or 'gpt-4', 'gpt-3.5-turbo'
//         messages: messages,
//         max_tokens: 150,
//         temperature: 0.7,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       const botMessage = data.choices[0].message;
//       return res.status(200).json({ message: botMessage });
//     } else {
//       return res.status(response.status).json({ error: data.error.message });
//     }
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message || 'Something went wrong' });
//   }
// }
