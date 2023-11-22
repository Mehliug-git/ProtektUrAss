const animate = gsap.timeline({ paused: false });
    const animateBackground = new TimelineMax({ paused: false });
    let toggle = false;

    animateBackground
        .to("body", 0.1, { backgroundImage: "none", backgroundColor: "#111" }, 0.2)
        .set(".switch", { boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" })
        .to(".text p", 0.1, { color: "#FFF" }, 0.2);

    animate
        .to(".toggle-button", 0.2, { scale: 0.7 }, 0)
        .set(".toggle", { backgroundColor: "#FFF" })
        .set(".circle", { display: "none" })
        .to(".moon-mask", 0.2, { translateY: 20, translateX: -10 }, 0.2)
        .to(".toggle-button", 0.2, { translateY: 49 }, 0.2)
        .to(".toggle-button", 0.2, { scale: 0.9 })


    document.getElementsByClassName("switch")[0].addEventListener("click", () => {
        if(toggle){
            animate.restart();
            animateBackground.restart();
            //test ison = true
        } else {
            animate.reverse();
            animateBackground.reverse();
        }
        toggle = !toggle;
    });


    chrome.storage.sync.get('etat_switch', function(data) {
        var isSwitchOn = data.etat_switch || false;
      
        // Applique l'animation en fonction de l'état actuel du switch
        if (isSwitchOn) {
            //pour checked restart pour le faire aller de on a off et reverse pour linverse

            animate.reverse();
            animateBackground.reverse();
        }
      });




      