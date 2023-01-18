import Photo from "./../models/Photo.js";
import Video from "./../models/Video.js";

export default class MediaFactory {
  constructor(media) {
      // Si le type correspond à une vidéo
      if (media.video !== undefined) {
          return new Video(media)
      // Si le type correspond à une photo
      } else if (media.video == undefined) {
          return new Photo(media)
      // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
      } else {
          throw 'Unknown type format'
      }
  }
}