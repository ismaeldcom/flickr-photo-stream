angular.module 'flickrPhotoStream'
  .service 'Flickr', ($log, $http) ->
    apiURL = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK'

    @publicPhotos = (callback) ->
      $http.jsonp(apiURL)
        .then (response) ->
          response.data.items.map (i) ->
            i.author = i.author[19...-1]
            i.description = i.description.replace(/<p><.+?<\/p>/g, '').trim()[3...-5]
            i.tags = if i.tags is "" then [] else i.tags.split ' '
            i
          callback response.data.items
        .catch (error) -> callback []

    return
