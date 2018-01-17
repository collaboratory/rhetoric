// @flow
import mitt from "mitt";
import MapFactory from "@collaboratory/map-factory";

function emitterFactory(name) {
  return mitt();
}

export const instance = new MapFactory(emitterFactory);
export default instance;
