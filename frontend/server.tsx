import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Frontend server started on port ${PORT}`);
});
