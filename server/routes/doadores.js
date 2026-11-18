import express from 'express';
const router = express.Router();

// Rota de exemplo para listar doadores
router.get('/', (req, res) => {
  res.json([]);
});

// Rota de exemplo para cadastrar um doador
router.post('/', (req, res) => {
  res.status(201).json({ message: "Doador cadastrado com sucesso!" });
});

export default router;