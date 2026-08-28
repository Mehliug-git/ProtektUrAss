# ProtektUrAss 🍑

yeah i know, dumb name, deal with it.

this is a chrome extension i made to stop websites from fingerprinting the shit out of you. fingerprinting = when a site can still recognize "oh it's that guy again" just from your browser's fingerprint (canvas, webgl, audio, user agent, etc) even if you clear cookies / go incognito / whatever. this thing messes with all that so sites get garbage data instead of your real info.

made this mostly for fun / to learn / to actually protect my own ass while browsing (hence the name). use at your own risk, i'm not responsible if some site breaks on you.

## what it actually does

when you flip the switch ON:

- changes your User-Agent, Accept-Language, Accept and a few other headers on every request (random identity based on what device type you pick in settings: PC / phone / bot / other)
- ALSO spoofs the same stuff at the JS level (navigator.userAgent, platform, hardwareConcurrency, languages, etc) so what the header says and what JS reports actually match up. if they don't match that's worse than not spoofing at all, sites can smell that instantly
- adds noise to canvas fingerprinting (toDataURL, getImageData) so every site gets a slightly different "photo" of your canvas
- fakes your GPU info (webgl vendor/renderer) instead of leaking your real graphics card
- adds a tiny bit of noise to AudioContext fingerprinting too
- blocks WebRTC from leaking your real local IP (yeah, that thing snitches on you even behind a VPN)
- deletes cookies when you turn it on
- checks for punycode domains (fake lookalike urls, like using cyrillic letters to fake apple.com)

also comes with:
- a settings page to pick what kind of device you wanna pretend to be
- a built-in temp mail page (tmpmail) so you don't gotta give sketchy sites your real email, runs on mail.tm behind the scenes

## installing it

no chrome web store, gotta load it manually:

1. clone or download this repo
2. open chrome, go to `chrome://extensions`
3. turn on "Developer mode" (top right)
4. click "Load unpacked"
5. select the folder you just downloaded
6. done, you should see the little peach icon in your toolbar 🍑

no npm install, no build step, nothing. it's just vanilla js, it just works.

## how to use it

- click the icon, flip the switch to turn protection ON/OFF
- little menu at the bottom right of the popup takes you to settings (pick your fake device type) or the temp mail page
- the "Header" button shows your current fake user-agent, click it to copy

## heads up

- some sites WILL break with a fake user-agent, that's just how it is, turn the switch off on those
- this is not some military grade privacy tool, it's a side project, don't bet your life on it
