export default class CCliente {
  name: string;
  email: string;
  status: boolean;
  constructor(name: string, email: string, status: boolean) {
    this.name = name;
    this.email = email;
    this.status = status;
  }
}
