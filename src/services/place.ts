import { Place, PlaceInterface } from "../DB/models/Place";

export class PlaceService {
  static async create(place: PlaceInterface) {
    const newPlace = await Place.create(place);
    return newPlace;
  }
  static async deletePlace(id: string) {
    const rowsDeleted = await Place.destroy({ where: { id } });
    return rowsDeleted;
  }
  static async updatePlace(id: string, placeUpdate: PlaceInterface) {
    await Place.update(placeUpdate, { where: { id } });
    return true;
  }
  static async getPlace() {
    const placeRows = await Place.findAll({ limit: 20 });
    return placeRows;
  }
}
