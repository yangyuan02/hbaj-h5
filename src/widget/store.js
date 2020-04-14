import utils from '@/widget/utils';

const store = {};

function getStorageType(storageType) {
  storageType = storageType == 'local' ? 'localStorage' : 'sessionStorage';
  return window[storageType];
}

if (utils.isLocalStorageSupported()) {
  store.set = function(key, val, storageType) {
    const storage = getStorageType(storageType);
    storage[key] = utils.serialize(val);
  };
  store.get = function(key, storageType) {
    const storage = getStorageType(storageType);

    return utils.deserialize(storage[key]);
  };
  store.remove = function(key, storageType) {
    const storage = getStorageType(storageType);
    delete storage[key];
  };
  store.clear = function(storageType) {
    const storage = getStorageType(storageType);
    storage.clear();
  };
} else {
  var windowStorage = {};

  store.set = function(key, val, storageType) {
    if (window.name) {
      windowStorage = utils.deserialize(window.name);
    } else {
      windowStorage = {};
    }

    windowStorage[key] = val;
    window.name = utils.serialize(windowStorage);
  };
  store.get = function(key, storageType) {
    if (window.name) {
      return utils.deserialize(window.name)[key];
    } else {
      return null;
    }
  };
  store.remove = function(key, storageType) {
    windowStorage = utils.deserialize(window.name);
    delete windowStorage[key];
    window.name = utils.serialize(windowStorage);
  };
  store.clear = function() {
    window.name = '';
  };
}

export default store;
