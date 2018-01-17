import LocalForage from "localforage";
import MapFactory from "@collaboratory/map-factory";

function storageFactory(name, options) {
  return LocalForage.createInstance({
    name,
    ...options
  });
}

export const instance = new MapFactory(storageFactory);
export default instance;
