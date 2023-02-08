export default class RatingSorterApi {
  static async sorter(media, orderBy) {
      if (orderBy === 'title') {
                  const result = {
                      key: orderBy,
                      media: Array.from(media).sort(function(a, b) {
                        const titleA = a.title.toUpperCase();
                        const titleB = b.title.toUpperCase();
                        if (titleA > titleB) {
                            return 1;
                          }
                          if (titleA < titleB) {
                            return -1;
                          }
                          return 0;
                      }),
                  }
                  return result;
      } else if (orderBy === 'date') {
        const result = {
            key: orderBy,
            media: Array.from(media).sort(function(a, b) {
              const dateA = parseInt(a.date.split('-')[0]);
              const dateB = parseInt(b.date.split('-')[0]);
              if (dateA > dateB) {
                  return 1;
                }
                if (dateA < dateB) {
                  return -1;
                }
                return 0;
            }),
        }
        return result;
      } else if (orderBy === 'like') {
            const result = {
                key: orderBy,
                media: Array.from(media).sort(function(a, b) {
                const likeA = a.likes;
                const likeB = b.likes;
                if (likeA > likeB) {
                    return -1;
                    }
                    if (likeA < likeB) {
                    return 1;
                    }
                    return 0;
                }),
            }
            return result;
      } 
      else {
          throw 'unknow orderBy type'
      }
  }
}