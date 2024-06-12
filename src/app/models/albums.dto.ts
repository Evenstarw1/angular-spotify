export class Album {
  id: string;
  name: string;
  imageUrl: string;

  constructor(id: string, name: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  static fromApiResponse(item: any): Album {
    return new Album(item.id, item.name, item.images[0]?.url);
  }
}
