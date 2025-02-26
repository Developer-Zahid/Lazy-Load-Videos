/* Lazy Load Videos Functions */
if ($('[data-lazy-video-src]').length > 0) {
    $('[data-lazy-video-src]').each(function(index) {
        const $figure = $(this);
        const videoSrc = $figure.attr('data-lazy-video-src');
        const videoType = $figure.attr('data-lazy-video-type') || 'mp4';
        const $posterImage = $figure.find('img');
        const $posterImageClass = $posterImage.attr('class');
        function replaceImageWithVideo() {
            console.log("Poster Image Loaded, Replacing with Video : ", index);
            const $highResVideo = $('<video>', {
                autoplay: true,
                muted: true,
                loop: true,
                playsinline: true,
                preload: 'none',
                fetchpriority: 'low',
                decoding: 'async',
                class: $posterImageClass,
            });
            $highResVideo.prop('muted', true);
            const $videoSource = $('<source>', {
                src: videoSrc,
                type: `video/${videoType}`
            });
            $highResVideo.append($videoSource);
            $highResVideo.on('loadeddata', function() {
                $posterImage.remove(); // Remove the low-quality image
                $figure.append($highResVideo); // Append the <video> to the <figure>
                $figure.removeAttr('data-lazy-video-src'); // Optionally remove the attribute
                console.log("Video Loaded and Rendered : ", index);
            }).on('error', function() {
                console.error("Video failed to load. ", index);
            });
            // Start loading the video data manually
            $highResVideo[0].load();
        };
        // Check if the image has already loaded
        if ($posterImage[0].complete) {
            replaceImageWithVideo();
        } else {
            // If the image is not yet loaded, add an event listener
            $posterImage.on('load', replaceImageWithVideo());
        }
    });
};