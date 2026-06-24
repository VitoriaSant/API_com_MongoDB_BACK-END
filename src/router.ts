//Express
import { Router } from "express";
//Controllers
import Teste from "./controllers/teste.controller";
import ClienteController from "./controllers/clientes/ClienteController";
import LivrosController from "./controllers/livros/LivrosController";

const router = Router();
const teste = new Teste();
const clienteController = new ClienteController();
const livrosController = new LivrosController();

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


export default router;
