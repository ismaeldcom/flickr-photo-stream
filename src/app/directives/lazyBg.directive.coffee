angular.module 'flickrPhotoStream'
  .directive 'lazyBg', ->
    conf = tolerance: 500, detectElement: true
    imagesToLazyLoad = []
    isLoading = null

    detectElement = (element) ->
      if !element.css('min-width') or element.css('min-width') == '0px'
        element.css 'min-width', '1px'
      if !element.css('min-height') or element.css('min-height') == '0px'
        element.css 'min-height', '1px'

    loadImages = ->
      angular.forEach imagesToLazyLoad, (element, key) ->
        if element.isVisible() and element.inViewport(conf.tolerance)
          image = new Image
          image.onload = ->
            element.css 'background-image': "url(#{@src})"
            element.parent().css 'opacity': 1
          image.src = element.attr('lazy-bg')
          imagesToLazyLoad.splice key, 1
      if imagesToLazyLoad.length == 0
        clearInterval isLoading

    restrict: 'A'
    link: (scope, element, attributes) ->
      if conf.detectElement
        detectElement element
      imagesToLazyLoad.push element
      clearInterval isLoading
      isLoading = setInterval((->
        loadImages()
      ), 50)

angular.element::isVisible = ->
  element = @[0]
  element.offsetWidth > 0 and element.offsetHeight > 0

angular.element::inViewport = (tolerance) ->
  element = @[0]
  rect = element.getBoundingClientRect()
  rect.top >= 0 - tolerance and rect.left >= 0 - tolerance and rect.bottom <= (window.innerHeight or document.documentElement.clientHeight) + tolerance and rect.right <= (window.innerWidth or document.documentElement.clientWidth) + tolerance
