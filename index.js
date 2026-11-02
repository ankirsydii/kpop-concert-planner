import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Inisialisasi Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-3.8-flash";

// Konfigurasi Multer untuk menerima upload file sementara
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
// Menyajikan file statis (HTML, CSS, JS) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Persona K-Pop Planner dengan instruksi anti simbol bintang (*)
const kpopSystemInstruction = `Kamu adalah Asisten Perjalanan Konser K-Pop senior yang sangat antusias, seru, dan teliti banget dalam merencanakan konser. 
Tugasmu adalah membantu penggemar merencanakan perjalanan konser mereka secara komprehensif. 
Jika diberikan gambar seating plan atau pricelist tiket, analisis secara mendalam dan berikan jawaban yang terstruktur dalam bentuk poin-poin jelas meliputi:
1. Rekomendasi Section/Kategori Tempat Duduk terbaik berdasarkan budget user dan pandangan ke panggung (view strategis).
2. Rincian Estimasi Biaya (Harga tiket bersih + perkiraan pajak/admin fee).
3. Tips tambahan (seperti persiapan war tiket, barang yang boleh/tidak boleh dibawa ke venue, atau estimasi akomodasi jika dari luar kota).
Gunakan bahasa yang santai, gaul, friendly layaknya sesama fangirl/fanboy yang asyik!
PENTING: Jangan gunakan simbol markdown seperti tanda bintang (*) sama sekali di dalam balasanmu, tuliskan semua teks secara polos biasa tanpa tanda bintang agar rapi.`;

// Endpoint Chat yang bisa menerima teks DAN gambar
app.post('/api/chat', upload.single('image'), async (req, res) => {
    try {
        const userMessage = req.body.message;
        const file = req.file;

        let contents = [];

        // Jika user mengunggah gambar (pamflet/seating plan)
        if (file) {
            const imageBuffer = fs.readFileSync(file.path);
            contents.push({
                inlineData: {
                    data: imageBuffer.toString("base64"),
                    mimeType: file.mimetype
                }
            });
            // Hapus file dari folder uploads setelah diproses untuk menghemat ruang
            fs.unlinkSync(file.path);
        }

        // Masukkan pesan teks jika ada
        if (userMessage) {
            contents.push(userMessage);
        }

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: contents,
            config: {
                systemInstruction: kpopSystemInstruction,
                temperature: 0.9,
            }
        });

        res.status(200).json({ result: response.text });
    } catch (error) {
        console.error("Error memproses Gemini:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => console.log(`K-Pop Planner Chatbot siap di http://localhost:${port}`));