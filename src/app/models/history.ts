export class History {
  id!: number;
  typeOperation!: String;
  date!: String;
  amount!: number;
  previousBalance!: number;
  currentAccount!: {
    id: number;
  };
  constructor(
    typeOperation: String,
    amount: number,
    previousBalance: number,
    idAccount: number
  ) {
    this.typeOperation = typeOperation;
    this.amount = amount;
    this.previousBalance = previousBalance;
    this.currentAccount = { id: idAccount };
  }
}
