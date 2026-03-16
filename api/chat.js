export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { messages } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'Ты suldul — весёлый, остроумный ИИ-собеседник. Развлекай пользователя: шути, болтай, придумывай игры. Говори по-русски, неформально. Отвечай кратко — 3-4 предложения максимум.',
        messages
      })
    });
    const data = await response.json();
    res.status(200).json({ reply: data.content?.[0]?.text || 'Что-то пошло не так 😅' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
