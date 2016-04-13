angular.module 'flickrPhotoStream'
  .controller 'MainController', (Flickr) ->
    @photos = []
    @loadDisabled = false
    @clearMode = false

    Flickr.publicPhotos (photos) => @photos = photos

    @loadMore = =>
      @loadDisabled = true
      Flickr.publicPhotos (photos) =>
        @photos = _.uniq @photos.concat(photos), (x) -> x.link
        @loadDisabled = false

    return
