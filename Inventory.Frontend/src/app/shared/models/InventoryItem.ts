export class InventoryItem {
  id: number = 0;
  name: string = '';
  type: number = 0;
  expirationDate : Date = new Date();

  public constructor(id: number, name: string, type: number, expirationDate : Date) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.expirationDate = expirationDate;
  }
}
