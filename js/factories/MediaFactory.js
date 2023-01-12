export default class MediaFactory {
  constructor(media, type) {
      // Si le type correspond à une vidéo
      if (type === 'video') {
          return new Video(media)
      // Si le type correspond à une photo
      } else if (type === 'photo') {
          return new Work(media)
      // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
      } else {
          throw 'Unknown type format'
      }
  }
}