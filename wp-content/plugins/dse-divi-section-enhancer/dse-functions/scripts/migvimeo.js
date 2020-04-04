let migvimeoplayer = function () {

    let dseUrl = dseData.url;



    // CREATE SCRIPT
    const docHeader = document.getElementsByTagName("head")[0];
    let vimeoPy = document.createElement('script');

    vimeoPy.setAttribute("src", 'https://player.vimeo.com/api/player.js');
    vimeoPy.setAttribute("type", 'text/javascript');

    docHeader.appendChild(vimeoPy);

    //AFTER THE SCRIPT WAS LOADED, RUN THE VIMEO FUNCTION
    window.addEventListener("load", function (e) {



        // GET ALL DOCUMENT SELECTORS AND CREATE A VIDEO PLAYER FOR EACHONE
        let playerContainers = document.querySelectorAll('.divi_se_vimeobg');


        playerContainers.forEach(function (thisContainer) {

            // GET  GENERAL SIZES TO ADJUST VALUES LATER DEPENDING ON USER SELECTION
            let playerContainerWidth = thisContainer.offsetWidth;
            let playerContainerHeight = thisContainer.offsetHeight;
            let screenHeight = window.screen.availHeight;


            // CREATE AN OUTER AN INNER WRAPPER TO ADJUST THE SIZE TO CONTAINER AND ALSO OVERSIZE THE INNER ONE
            let videoOuterWrapper = document.createElement("div");
            videoOuterWrapper.setAttribute("class", "mig-vimeo-outer-wrapper");


            let vimeoWrapper = document.createElement("div");
            vimeoWrapper.setAttribute("class", "mig-vimeo-wrapper");

            let vimeoOverlay = document.createElement("div");
            vimeoOverlay.setAttribute("class", "mig-vimeo-overlay");


            thisContainer.prepend(videoOuterWrapper);
           
            videoOuterWrapper.prepend(vimeoWrapper);
            videoOuterWrapper.prepend(vimeoOverlay);


            let defaultoptions = {
                id: "15069551",
                width: playerContainerWidth,
                autopause: false,
                autoplay: true,
                byline: false,
                controls: false,
                height: null,
                loop: true,
                maxheight: null,
                maxwidth: null,
                playsinline: true,
                portrait: false,
                muted: true,
                title: false,
                transparent: true,
                speed: false,
            };

            let data, customoptions = {};
            if (thisContainer.getAttribute("data-vimeobg") !== null) {
                data = JSON.parse(thisContainer.getAttribute("data-vimeobg"));
                customoptions = JSON.parse(thisContainer.getAttribute("data-vimeobg"));
                delete customoptions.widthT;
                delete customoptions.widthP;
                delete customoptions.preloader;



                // create variable to notify vimeo events when is neccesary apply preloader

                if (data.preloader !== "none" && data.preloader !== undefined) {


                    customoptions.autoplay = false;
                    let vimeoLoader = document.createElement("div");
                    vimeoLoader.setAttribute("class", "mig-vimeo-loader");
                    if (data.preloader !== "black") {
                        vimeoLoader.style.backgroundImage = `url("${dseUrl}/dse-functions/images/${data.preloader}.gif")`;
                    }

                    videoOuterWrapper.appendChild(vimeoLoader);
                }


                // FIRST WE ADJUST VALUES DEPENDING ON SCREEN WIDTH
                if (playerContainerWidth < 980) {

                    // adjust preloader position on mobile devices to prevent wrong display on large sections
                    if (thisContainer.querySelector(".mig-vimeo-loader")) {
                        thisContainer.querySelector(".mig-vimeo-loader").style.backgroundPositionY = `${screenHeight / 2}px`;
                    }

                    (data.widthP) ? customoptions.width = data.widthP : customoptions.width = data.width;
                }


                // ADJUST VIDEO HEIGHT AND WIDTH
                if (customoptions.width == "height") {
                    let overSizeWidth = playerContainerHeight * 2.65;
                    if(overSizeWidth <= playerContainerWidth){
                        overSizeWidth = playerContainerWidth;
                    }
                    customoptions.width = overSizeWidth;
                    vimeoWrapper.style.width = overSizeWidth + "px";

                    vimeoWrapper.style.marginLeft = "-" + ((overSizeWidth - playerContainerWidth) / 2 + "px");

                }
                else if (customoptions.width == "screen") {
                    let overSizeScreen = screenHeight * 2.65;
                    customoptions.width = overSizeScreen;
                    vimeoWrapper.style.width = overSizeScreen + "px";

                    vimeoWrapper.style.marginLeft = "-" + ((overSizeScreen - playerContainerWidth) / 2 + "px");

                }
                else if (customoptions.width == "parallax") {
                    let overSizeScreen = screenHeight * 2.65;
                    customoptions.width = overSizeScreen;
                    vimeoWrapper.style.width = overSizeScreen + "px";

                    vimeoWrapper.style.marginLeft = "-" + ((overSizeScreen - playerContainerWidth) / 2 + "px");


                    window.addEventListener("scroll", function (e) {

                        //console.log(window.scrollY);
                        //console.log(thisContainer.offsetTop);

                        if (window.scrollY >= thisContainer.offsetTop &&
                            window.scrollY <= thisContainer.offsetTop + thisContainer.offsetHeight
                            
                        ) {
                            thisContainer.querySelector(".mig-vimeo-wrapper").style.position = "fixed";
                        }
                        else {
                            thisContainer.querySelector(".mig-vimeo-wrapper").style.position = "relative";
                        }
                    })

                }
                else {
                    delete customoptions.width;
                }


            }


            let finaloptions = { ...defaultoptions, ...customoptions };


            let embedHere = thisContainer.querySelector(".mig-vimeo-wrapper");

            let videoPlayer = new Vimeo.Player(embedHere, finaloptions);


            videoPlayer.on("loaded", function () {

                if(data.preloader != "none"){
                    videoPlayer.play()
                    .then(function(event){})
                    .catch(function(error){
                        console.log("error vimeo");
                        videoPlayer.setVolume(0).then(function(){
                            videoPlayer.play();
                        });
                        
                    });
                } 

            })

            videoPlayer.on("play", function () {

                if (data.preloader != "none") {
                    if (thisContainer.querySelector(".mig-vimeo-loader")) {
                        setTimeout(function () {
                            thisContainer.querySelector(".mig-vimeo-loader").style.backgroundColor = "transparent";
                            thisContainer.querySelector(".mig-vimeo-loader").style.backgroundImage = "none";
                        }, data.delay);
                    }
                }

            })

        })


    })


};
migvimeoplayer();







let migyoutubeplayer = function () {
    window.migYtplayersLoaded = {};



    const mainWindow = this;

    let dseUrl = dseData.url;
    


    let migYoutubePlayers = [];
    window.migYoutubePlayers = migYoutubePlayers;

    //AFTER THE SCRIPT WAS LOADED, RUN THE YOUTUBE FUNCTION
    window.addEventListener("load", function (e) {
        // CREATE SCRIPT
    const docHeader = document.getElementsByTagName("head")[0];
    let youtubePy = document.createElement('script');

    youtubePy.setAttribute("src", 'https://www.youtube.com/iframe_api');
    youtubePy.setAttribute("type", 'text/javascript');

    docHeader.appendChild(youtubePy);


        // GET ALL DOCUMENT SELECTORS AND CREATE A VIDEO PLAYER FOR EACHONE
        let playerContainers = document.querySelectorAll('.divi_se_youtubebgnew');


        playerContainers.forEach(function (thisContainer, index) {

            // GET  GENERAL SIZES TO ADJUST VALUES LATER DEPENDING ON USER SELECTION
            let playerContainerWidth = thisContainer.offsetWidth;
            let playerContainerHeight = thisContainer.offsetHeight;
            let screenHeight = window.screen.availHeight;


            // CREATE AN OUTER AN INNER WRAPPER TO ADJUST THE SIZE TO CONTAINER AND ALSO OVERSIZE THE INNER ONE
            let videoOuterWrapper = document.createElement("div");
            videoOuterWrapper.setAttribute("class", "mig-youtube-outer-wrapper");


            let youtubeWrapper = document.createElement("div");
            youtubeWrapper.setAttribute("class", "mig-youtube-wrapper");

            let youtubeWrapperIframe = document.createElement("div");
            youtubeWrapperIframe.setAttribute("class", "mig-youtube-wrapper-iframe");

            let youtubeOverlay = document.createElement("div");
            youtubeOverlay.setAttribute("class", "mig-youtube-overlay");


            thisContainer.prepend(videoOuterWrapper);
            videoOuterWrapper.prepend(youtubeWrapper);
            videoOuterWrapper.prepend(youtubeOverlay);
            youtubeWrapper.prepend(youtubeWrapperIframe);
            







            let defaultoptions = {
                    height: "100%",
                    width: playerContainerWidth,
                    videoId: 'M7lc1UVf-VE',
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        disablekb: 1,
                        enablejsapi: 1,
                        fs: 0,
                        iv_load_policy: 3,
                        loop: 0,
                        modestbranding: 1,
                        origin: window.location.origin,
                        rel: 0,
                        showinfo: 0,
                        start: null,
                        end: null
                    },
                    
                    events: {
                        'onReady': migYTReady,
                        'onStateChange' : migYTPlay,
                        'onError' : migYTError
                    }
                };

            let customoptions = {};
            if (thisContainer.getAttribute("data-youtubebg") !== null) {
                customoptions = JSON.parse(thisContainer.getAttribute("data-youtubebg"));
            

                // create variable to notify youtube events when is neccesary apply preloader

                if (customoptions.preloader !== "none" && customoptions.preloader !== undefined) {


                    
                    let youtubeLoader = document.createElement("div");
                    youtubeLoader.setAttribute("class", "mig-youtube-loader");
                    if (customoptions.preloader !== "black") {
                        youtubeLoader.style.backgroundImage = `url("${dseUrl}/dse-functions/images/${customoptions.preloader}.gif")`;
                    }

                    videoOuterWrapper.appendChild(youtubeLoader);
                }


                // FIRST WE ADJUST VALUES DEPENDING ON SCREEN WIDTH
                if (playerContainerWidth < 980) {

                    // adjust preloader position on mobile devices to prevent wrong display on large sections
                    if (thisContainer.querySelector(".mig-youtube-loader")) {
                        thisContainer.querySelector(".mig-youtube-loader").style.backgroundPositionY = `${screenHeight / 2}px`;
                    }

                    (customoptions.widthP) ? customoptions.width = customoptions.widthP : customoptions.width = customoptions.width;
                }


                // ADJUST VIDEO HEIGHT AND WIDTH
                if (customoptions.width == "width") {
                    let adjustedHeight = playerContainerWidth * 0.562;
                   
                    customoptions.height = adjustedHeight
                }

                if (customoptions.width == "height") {
                    let overSizeWidth = playerContainerHeight * 2.65;
                    if(overSizeWidth <= playerContainerWidth){
                        overSizeWidth = playerContainerWidth;
                    }
                    customoptions.width = overSizeWidth;
                    youtubeWrapper.style.width = overSizeWidth + "px";

                    youtubeWrapper.style.marginLeft = "-" + ((overSizeWidth - playerContainerWidth) / 2 + "px");
                    customoptions.height = playerContainerHeight * 1.05;
                }
                else if (customoptions.width == "screen") {
                    let overSizeScreen = screenHeight * 2.65;
                    customoptions.width = overSizeScreen;
                    youtubeWrapper.style.width = overSizeScreen + "px";

                    youtubeWrapper.style.marginLeft = "-" + ((overSizeScreen - playerContainerWidth) / 2 + "px");
                    customoptions.height = screenHeight * 1.05;
                }
                else if (customoptions.width == "parallax") {
                    let overSizeScreen = screenHeight * 2.65;
                    customoptions.width = overSizeScreen;
                    youtubeWrapper.style.width = overSizeScreen + "px";

                    youtubeWrapper.style.marginLeft = "-" + ((overSizeScreen - playerContainerWidth) / 2 + "px");
                    customoptions.height = screenHeight * 1.05;

                    window.addEventListener("scroll", function (e) {

                        //console.log(window.scrollY);
                        //console.log(thisContainer.offsetTop);

                        if (window.scrollY >= thisContainer.offsetTop &&
                            window.scrollY <= thisContainer.offsetTop + thisContainer.offsetHeight
                            
                        ) {
                            thisContainer.querySelector(".mig-youtube-wrapper").style.position = "fixed";
                        }
                        else {
                            thisContainer.querySelector(".mig-youtube-wrapper").style.position = "relative";
                        }
                    })

                }
                else {
                    delete customoptions.width;
                }


            }


            let finaloptions = { ...defaultoptions, ...customoptions };
           (customoptions.start !== null)? finaloptions.playerVars.start = customoptions.start : "";
           (customoptions.end !== null)? finaloptions.playerVars.end = customoptions.end : "";

            
            //ASIGN AN ID INDEX DEPENDENT AND THEN INSERT IN THE MAIN OBJECT LO RESCUE LATER ON YOUTUBE FUNCTION
            thisContainer.querySelector(".mig-youtube-wrapper").setAttribute("id", `mig-youtube-wrapper-${index}`);
           
           
            finaloptions.selector = `mig-youtube-wrapper-${index}`;
            migYoutubePlayers.push(finaloptions);
            thisContainer.querySelector(".mig-youtube-wrapper-iframe").setAttribute("data-youtubebg", JSON.stringify(finaloptions));
            
            
           
        })


        mainWindow.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
            let ytPlayers = window.migYoutubePlayers;

            ytPlayers.forEach(function(player){
                let selector = document.querySelector(`#${player.selector}`).querySelector(".mig-youtube-wrapper-iframe");
                let playerOptions = {
                    height: player.height,
                    width: player.width,
                    videoId: player.videoId,
                    playerVars: player.playerVars,
                    events: player.events
                }
                
                new YT.Player(selector, playerOptions);
            })
            
        }

        // 4. The API will call this function when the video player is ready.
        function migYTReady(event) {
            let windowWidth = window.screen.width;
            let iframe = event.target.getIframe();
            
            let data = JSON.parse(iframe.getAttribute("data-youtubebg"));
            let id = `migYt-${iframe.getAttribute("id")}`;
            if(data.muted == "true"){
                event.target.mute();
            }
            if(windowWidth < 980){
                event.target.mute();
            }
            
            

            setTimeout(function(){
                if(window.migYtplayersLoaded[id] != "loaded"){
                    console.log("muting video and try to play again");
                    event.target.mute();
                    event.target.playVideo();
                }

            }, 3000);
            

            event.target.playVideo();
            window.migYtplayersLoaded[id] = "unloaded";
            
        }

        function migYTPlay(event){
            let iframe = event.target.getIframe();

            var done = false;
            let data = JSON.parse(iframe.getAttribute("data-youtubebg"));
            let selector = document.querySelector(`#${data.selector}`);
            let loaderContainer = selector.nextSibling;
            let id = `migYt-${iframe.getAttribute("id")}`;

            if (event.data == YT.PlayerState.PLAYING && !done) {
                
                window.migYtplayersLoaded[id] = "loaded";
               
                if (data.preloader != "none") {
                    if (loaderContainer.classList.contains("mig-youtube-loader")) {
                        
                        setTimeout(function () {
                            loaderContainer.style.backgroundColor = "transparent";
                            loaderContainer.style.backgroundImage = "none";
                        }, data.delay);
                    }
                }
            }
            else if(event.data == 0 && data.loop == "true"){
                event.target.seekTo(data.playerVars.start);
            }

        }


        function migYTError(event){
          
        }

    })


};
migyoutubeplayer();
