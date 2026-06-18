//Express
import { Router } from "express";
//Controllers
import Teste from "./controllers/teste.controller";
import ClienteController from "./controllers/clientes/ClienteController";

const router = Router();
const teste = new Teste();
const clienteController = new ClienteController();

router.get("/", teste.teste);
router.post("/clientes/criar", clienteController.criar);
router.get("/clientes/listar", clienteController.listar);
router.delete("/clientes/deletar/:id", clienteController.deletar);
router.put("/clientes/atualizar/:id", clienteController.atualizar);
router.get("/clientes/pesquisar/:id", clienteController.pesquisar);

export default router;
