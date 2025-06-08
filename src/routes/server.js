import express from 'express';
import cors from 'cors';
import { LocalazyApiClient } from '@localazy/api-client';
console.log(Localazy);

const app = express();
app.use(cors());
app.use(express.json());

const client = new LocalazyApiClient({ apiKey: 'SUA_CHAVE_LOCALAZY_AQUI' });

app.post('/api/translate', async (req, res) => {
  try {
    const { text, source, target } = req.body;
    const result = await client.translate({
      text,
      sourceLanguage: source,
      targetLanguage: target,
    });
    res.json({ translated: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro na tradução' });
  }
});

app.listen(3001, () => {
  console.log('Backend rodando em http://localhost:3001');
});
