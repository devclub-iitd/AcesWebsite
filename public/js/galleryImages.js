'use strict';

(function() {

    var gallery = document.querySelector('.gallery');

    function newImage(eventName, images) {
        var li = document.createElement('li');
        var main = '';
        images.forEach(image => {
            if (image.split('.')[0] == 'main') main = image;
        });
        main = main || images[0];
        //console.log(eventName);
        li.innerHTML = '<h3>' + eventName + '</h3><a class="open_fancybox" href=' + '\"./img/events/' + eventName + '/' + main + '\"><img class="top img-responsive" src=' + '\"./img/events/' + eventName + '/' + main + '\" width="350" height="300" /></a>';
        gallery.append(li);

    }

    var imagesPromise = new Promise(function(resolve, reject) {
        ajaxFunctions.ready(function() {
            ajaxFunctions.ajaxRequest('GET', appUrl + '/images', function(data) {
                resolve(JSON.parse(data));
            });
        });
    });

    imagesPromise.then(function(data) {
        data.forEach(events => {
            newImage(events[0], events.slice(1));
        });
        return data;
    }).then(function(data) {
        var images = {};
        //console.log(data);
        data.forEach(function(event, index) {
                images[index+1] = [];
                event.slice(1).forEach(function(image, pos) {
                    if (image!=".DS_Store"){
                        images[index+1].push({
                            'href': './img/events/'+ event[0]+ '/' + image,
                            'title': 'Gallery '+ event[0] + ' - ' + (pos + 1)
                        });
                    }
                });
        });
        return images
    }).then(function(images) {

        $(".open_fancybox").click(function() {
            //console.log(images[$(this).parent().index() + 1]);
            $.fancybox.open(images[$(this).parent().index() + 1], {
                padding: 0
            });
            return false;
        });
    });


})();
