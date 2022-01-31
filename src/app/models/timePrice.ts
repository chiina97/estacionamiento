export class TimePriceDTO {
  patent!: String;
  hours!: number;
  minutes!: number;
  price!: number;
  constructor(patent: String, hours: number, minutes: number, price: number) {
    this.patent = patent;
    this.hours = hours;
    this.minutes = minutes;
    this.price = price;
  }
}
