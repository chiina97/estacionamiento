export class Patent {
  id!: number;
  patent!: String;
  user!: {
    id: number;
  };

  constructor(patent: String, idUser: number) {
    this.patent = patent;
    this.user = { id: idUser };
  }
}
