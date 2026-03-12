import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const GENRES = ['Hip-Hop', 'Pop', 'R&B', 'Jazz', 'Classical', 'Electronic', 'Afrobeats', 'Flamenco', 'World Music', 'Ambient', 'Rock', 'Soul', 'Gospel', 'Blues', 'Latin', 'Indian Classical', 'Fusion', 'Cinematic', 'Experimental'];
const INSTRUMENTS = ['Guitar', 'Piano', 'Violin', 'Viola', 'Cello', 'Drums', 'Percussion', 'Vocals', 'Synthesizer', 'Bass', 'Saxophone', 'Trumpet', 'Mixing', 'Mastering', 'Sound Design', 'Ableton Live', 'Beat Making', 'Film Scoring'];

// POST /api/search/parse
// Body: { query: string }
// Calls Claude to extract structured filters from a natural language query
router.post('/parse', async (req: Request, res: Response) => {
  const { query } = req.body as { query?: string };

  if (!query?.trim()) {
    return res.json({ q: '', genre: 'All Genres', instrument: 'All Instruments', service: 'all', sortBy: 'featured' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Natural language search not configured. Set ANTHROPIC_API_KEY in server/.env.' });
  }

  const prompt = `You are parsing a natural language search query for a musician hiring marketplace.
Extract structured search filters from this query: "${query.replace(/"/g, '\\"')}"

Available options:
- genres: ${GENRES.join(', ')}
- instruments: ${INSTRUMENTS.join(', ')}
- service types: tracks (remote session recording), teach (teaching/lessons), inPerson (in-person gig/event), wedding (wedding performance), online (online lessons)
- sortBy: featured, rating (top rated), price_asc (cheapest first), price_desc (most expensive first), reviews (most reviewed)

Return ONLY valid JSON with exactly these fields:
{
  "q": "remaining keywords for name/text search — empty string if the query is fully captured by other filters",
  "genre": "matched genre exactly as listed above, or 'All Genres' if not mentioned",
  "instrument": "matched instrument exactly as listed above, or 'All Instruments' if not mentioned",
  "service": "matched service value (tracks/teach/inPerson/wedding/online), or 'all' if not mentioned",
  "sortBy": "matched sort option (featured/rating/price_asc/price_desc/reviews), or 'featured' if not mentioned"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json() as any;
    const text = data.content?.[0]?.text ?? '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in Claude response');

    const parsed = JSON.parse(jsonMatch[0]);
    res.json(parsed);
  } catch (err) {
    console.error('[search/parse] Error:', err);
    res.status(500).json({ error: 'Failed to parse natural language query' });
  }
});

export default router;
