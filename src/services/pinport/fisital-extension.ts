import { Pinport, PinportClient } from "@pinport/client";

export class FisitalViewExtension {
  constructor(
    private createPinsBase: PinportClient<any>["createPins"],
    // private getPins: PinportClient<any>["getPins"],
    // private updatePins: PinportClient<any>["updatePins"],
    // private deletePins: PinportClient<any>["deletePins"],
    // private getMetadata: PinportClient<any>["getMetadata"],
  ) {}

  public createAlert(pins: {
    position: Pinport.Pin['position'],
    meta_id: string,
    html: string,
  }[]) {
    this.createPinsBase(pins.map((pin) => ({
      ...pin,
      alert: true,
    })))
  }
}

export const PinportFisitalViewExtension = {
  key: 'fisitalView',
  instance: FisitalViewExtension
} as const;