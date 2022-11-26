# webxr-demo

Web VR and AR demos using the following libraries:

- three.js: https://threejs.org/
- A-Frame: https://aframe.io/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber/

## Run demo

1. Install the dependencies

```sh
npm install
```

2. Run the dev command

```sh
npm run dev
```

3. Open http://localhost:1234/

## Enable HTTPS on localhost

Open `vitest.config.ts` and set `EXPOSE_TO_LOCAL_NETWORK` to `true`.

## Connect to Chrome on an Android device

1. Activate developer options on the phone
2. Activate USB debugging on the phone
3. Open chrome://inspect/#devices on the computer
4. Connect the phone via USB and allow USB debugging
5. Enable port forwarding: https://developer.chrome.com/docs/devtools/remote-debugging/local-server/
6. Open Google Chrome on the phone
7. Visit local URL on the phone
