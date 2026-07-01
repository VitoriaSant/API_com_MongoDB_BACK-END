//Express
import { Router } from "express";
//Controllers
import Teste from "./controllers/teste.controller";
import ClienteController from "./controllers/clientes/ClienteController";
import LivrosController from "./controllers/livros/LivrosController";
import ReservasController from "./controllers/reservas/ReservasController";

const router = Router();
const teste = new Teste();
const clienteController = new ClienteController();
const livrosController = new LivrosController();
const reservasController = new ReservasController();

router.get("/", teste.teste);

//Clientes
router.post("/clientes/criar", clienteController.criar);
router.get("/clientes/listar", clienteController.listar);
router.delete("/clientes/deletar/:id", clienteController.deletar);
router.put("/clientes/atualizar/:id", clienteController.atualizar);
router.get("/clientes/pesquisar/:id", clienteController.pesquisar);

//Livros
router.post("/livros/criar", livrosController.criar);
router.get("/livros/listar", livrosController.listar);
router.delete("/livros/deletar/:id", livrosController.deletar);
router.put("/livros/atualizar/:id", livrosController.atualizar);
router.get("/livros/pesquisar/:id", livrosController.pesquisar);

//Reservas
router.post("/reservas/criar", reservasController.criar);
router.get("/reservas/listar", reservasController.listar);
router.delete("/reservas/deletar/:id", reservasController.deletar);
router.put("/reservas/atualizar/:id", reservasController.atualizar);
router.get("/reservas/pesquisar/:id", reservasController.pesquisar);


export default router;
