// server/index.js (ou server.js)
import express from "express";
import cors from "cors";

// Importe os arquivos de rotas do backend
import doadoresRouter from "./routes/doadores.js";
import doacoesRouter from "./routes/doacoes.js";
import itensRouter from "./routes/itens.js";

const app = express();

app.use(cors());
app.use(express.json());

// REGISTRO DAS ROTAS DA API
// Note que usamos o prefixo '/doadores', '/doacoes', etc.
app.use("/doadores", doadoresRouter);
app.use("/doacoes", doacoesRouter);
app.use("/itens", itensRouter);

// Rota de teste de saúde
app.get("/health", (req, res) => {
  res.json({ status: "ok", banco: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});