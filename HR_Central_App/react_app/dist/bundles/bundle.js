/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5b9b6a6ada4f78314aba";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\dist\\bundles";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([479,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UserColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RecruiterColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HRColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HRColumnsRecruiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ManagerColumns; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(191);
/* harmony import */ var _material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(219);
/* harmony import */ var _material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(221);
/* harmony import */ var _material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(220);
/* harmony import */ var _material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_AccountBalanceWallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(360);
/* harmony import */ var _material_ui_icons_AccountBalanceWallet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountBalanceWallet__WEBPACK_IMPORTED_MODULE_5__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const UserColumns = [{
  name: "TblFactEmployeeShiftAllowanceSummaryId",
  label: "Shift Allowance Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ManagerName",
  label: "Manager Name",
  options: {
    filter: false,
    sort: false
  }
}, {
  name: "HrName",
  label: "HR Name",
  options: {
    filter: false,
    sort: false
  }
}, {
  name: "ShiftMonth",
  label: "Shift Month",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftYear",
  label: "Shift Year",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftType",
  label: "Shift Type",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "NoOfDaysWorked",
  label: "No. of days Worked",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "TotalShiftAllowance",
  label: "Total Shift Allowance",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftAllowanceStatus",
  label: "Shift Allowance Status",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      let renderColor = '',
          iconRender = '';

      if (value.includes('Approved')) {
        renderColor = '#00c72e';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2___default.a, null);
      }

      if (value.includes('Pending')) {
        renderColor = '#ffa808';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4___default.a, null);
      }

      if (value.includes('Rejected')) {
        renderColor = '#ff073a';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3___default.a, null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        size: "small",
        icon: iconRender,
        label: value,
        color: "primary",
        style: {
          backgroundColor: renderColor
        }
      }));
    }
  }
}, {
  name: "ShiftAllowanceRejectionComments",
  label: "Rejection Comments",
  options: {
    display: false
  }
}];
const RecruiterColumns = [{
  name: "FactNewJoineeExpenseInfoId",
  label: "Expense Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "EmployeeNumber",
  label: "Employee Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "EmployeeName",
  label: "Employee Name",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "HrName",
  label: "HR Name",
  options: {
    filter: false,
    sort: false
  }
}, {
  name: "DimCostCenter",
  label: "Cost Center",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "Dimhead",
  label: "Head",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ClawBackDurationInMonths",
  label: "Clawback Duration In Months",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "DateofJoining",
  label: "D-O-J",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "TotalExpense",
  label: "Total Expense",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "DimExpenseStatus",
  label: "Expense Status",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      let renderColor = '',
          iconRender = '';

      if (value.includes('Approved')) {
        renderColor = '#00c72e';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2___default.a, null);
      }

      if (value.includes('Pending')) {
        renderColor = '#ffa808';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4___default.a, null);
      }

      if (value.includes('Rejected')) {
        renderColor = '#ff073a';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3___default.a, null);
      }

      if (value.includes('Disbursed')) {
        renderColor = '#ffc721';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountBalanceWallet__WEBPACK_IMPORTED_MODULE_5___default.a, null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        size: "small",
        icon: iconRender,
        label: value,
        color: "primary",
        style: {
          backgroundColor: renderColor
        }
      });
    }
  }
}];
const HRColumns = [{
  name: "TblFactEmployeeShiftAllowanceSummaryId",
  label: "Shift Allowance Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "EmployeeName",
  label: "Employee Name",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ManagerName",
  label: "Manager Name",
  options: {
    filter: false,
    sort: false
  }
}, {
  name: "ShiftMonth",
  label: "Shift Month",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftYear",
  label: "Shift Year",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftType",
  label: "Shift Type",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "NoOfDaysWorked",
  label: "No. of days Worked",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "TotalShiftAllowance",
  label: "Total Shift Allowance",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftAllowanceStatus",
  label: "Shift Allowance Status",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      let renderColor = '',
          iconRender = '';

      if (value.includes('Approved')) {
        renderColor = '#00c72e';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2___default.a, null);
      }

      if (value.includes('Pending')) {
        renderColor = '#ffa808';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4___default.a, null);
      }

      if (value.includes('Rejected')) {
        renderColor = '#ff073a';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3___default.a, null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        size: "small",
        icon: iconRender,
        label: value,
        color: "primary",
        style: {
          backgroundColor: renderColor
        }
      });
    }
  }
}];
const HRColumnsRecruiter = [{
  name: "FactNewJoineeExpenseInfoId",
  label: "Expense Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "EmployeeNumber",
  label: "Employee Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "EmployeeName",
  label: "Employee Name",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "RecruiterName",
  label: "Recruiter Name",
  options: {
    filter: false,
    sort: false
  }
}, {
  name: "DimCostCenter",
  label: "Cost Center",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "Dimhead",
  label: "Head",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ClawBackDurationInMonths",
  label: "Clawback Duration In Months",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "DateofJoining",
  label: "D-O-J",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "TotalExpense",
  label: "Total Expense",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "DimExpenseStatus",
  label: "Expense Status",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      let renderColor = '',
          iconRender = '';

      if (value.includes('Approved')) {
        renderColor = '#00c72e';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2___default.a, null);
      }

      if (value.includes('Pending')) {
        renderColor = '#ffa808';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4___default.a, null);
      }

      if (value.includes('Rejected')) {
        renderColor = '#ff073a';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3___default.a, null);
      }

      if (value.includes('Disbursed')) {
        renderColor = '#ffc721';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountBalanceWallet__WEBPACK_IMPORTED_MODULE_5___default.a, null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        size: "small",
        icon: iconRender,
        label: value,
        color: "primary",
        style: {
          backgroundColor: renderColor
        }
      });
    }
  }
}];
const ManagerColumns = [{
  name: "TblFactEmployeeShiftAllowanceSummaryId",
  label: "Shift Allowance Id",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "EmployeeName",
  label: "Employee Name",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "HrName",
  label: "HR Name",
  options: {
    filter: false,
    sort: false
  }
}, {
  name: "ShiftMonth",
  label: "Shift Month",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftYear",
  label: "Shift Year",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftType",
  label: "Shift Type",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "NoOfDaysWorked",
  label: "No. of days Worked",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "TotalShiftAllowance",
  label: "Total Shift Allowance",
  options: {
    filter: true,
    sort: true
  }
}, {
  name: "ShiftAllowanceStatus",
  label: "Shift Allowance Status",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      let renderColor = '',
          iconRender = '';

      if (value.includes('Approved')) {
        renderColor = '#00c72e';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutlineSharp__WEBPACK_IMPORTED_MODULE_2___default.a, null);
      }

      if (value.includes('Pending')) {
        renderColor = '#ffa808';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_UpdateSharp__WEBPACK_IMPORTED_MODULE_4___default.a, null);
      }

      if (value.includes('Rejected')) {
        renderColor = '#ff073a';
        iconRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CancelSharp__WEBPACK_IMPORTED_MODULE_3___default.a, null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        size: "small",
        icon: iconRender,
        label: value,
        color: "primary",
        style: {
          backgroundColor: renderColor
        }
      });
    }
  }
}];
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserColumns, "UserColumns", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\data_table_columns.js");
  reactHotLoader.register(RecruiterColumns, "RecruiterColumns", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\data_table_columns.js");
  reactHotLoader.register(HRColumns, "HRColumns", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\data_table_columns.js");
  reactHotLoader.register(HRColumnsRecruiter, "HRColumnsRecruiter", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\data_table_columns.js");
  reactHotLoader.register(ManagerColumns, "ManagerColumns", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\data_table_columns.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserStepper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(477);
/* harmony import */ var _material_ui_core_Step__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(475);
/* harmony import */ var _material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(476);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(315);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_StepConnector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(365);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(192);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(364);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_14__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
















const QontoConnector = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: '#784af4'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#784af4'
    }
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
})(_material_ui_core_StepConnector__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);
const useQontoStepIconStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  },
  active: {
    color: '#ffa808'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: {
    color: '#00c72e',
    zIndex: 1,
    fontSize: 25
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const {
    active,
    completed
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, {
      [classes.active]: active
    })
  }, completed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8___default.a, {
    className: classes.completed
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.circle
  }));
}

__signature__(QontoStepIcon, "useQontoStepIconStyles{classes}", () => [useQontoStepIconStyles]);

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}));
function UserStepper({
  currentStatus,
  getShiftAllowanceData
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [getSteps, setSteps] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);

  const getAndDisplayStatus = status => {
    switch (status) {
      case 1:
        setSteps(['Shift Allowance Raised', 'Pending Manager Apporval', 'Pending HR Approval']);
        setActiveStep(1);
        break;

      case 2:
        setSteps(['Shift Allowance Raised', 'Approved by Manager', 'Pending HR Approval']);
        setActiveStep(2);
        break;

      case 3:
        setSteps(['Shift Allowance Raised', 'Rejected by Manager', 'Pending HR Approval']);
        setActiveStep(1);
        break;

      case 4:
        setSteps(['Shift Allowance Raised', 'Approved by Manager', 'Approved by HR']);
        setActiveStep(3);
        break;

      case 5:
        setSteps(['Shift Allowance Raised', 'Approved by Manager', 'Rejected by HR']);
        setActiveStep(2);
        break;
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getAndDisplayStatus(currentStatus[0].DimShiftAllowanceStatusId);
  }, [currentStatus, getShiftAllowanceData]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, getAndDisplayStatus.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    container: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    item: true,
    xs: 1
  }, getShiftAllowanceData.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    className: classes.card,
    style: {
      boxShadow: 'none',
      borderRadius: '0px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    style: {
      margin: '4px',
      fontWeight: 'bold',
      color: '6D2077'
    }
  }, "Status of - ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_14___default.a, {
    strat: 0,
    end: getShiftAllowanceData[0].TblFactEmployeeShiftAllowanceSummaryId,
    duration: 1,
    useEasing: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    item: true,
    xs: 11
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    alternativeLabel: true,
    activeStep: activeStep,
    connector: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QontoConnector, null)
  }, getSteps.map(label => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Step__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    key: label
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    StepIconComponent: QontoStepIcon
  }, label))))))));
}

__signature__(UserStepper, "useStyles{classes}\nuseState{[activeStep, setActiveStep](0)}\nuseState{[getSteps, setSteps]([])}\nuseEffect{}", () => [useStyles]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(QontoConnector, "QontoConnector", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\user-stepper.js");
  reactHotLoader.register(useQontoStepIconStyles, "useQontoStepIconStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\user-stepper.js");
  reactHotLoader.register(QontoStepIcon, "QontoStepIcon", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\user-stepper.js");
  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\user-stepper.js");
  reactHotLoader.register(UserStepper, "UserStepper", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\user-stepper.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaChart; });
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122);
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(123);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






function AreaChart({
  dashboardId
}) {
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* useTheme */ "l"](_amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* useTheme */ "l"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

  const createAreaChart = () => {
    let chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* create */ "h"]("chartAreaDiv", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* XYChart */ "j"]);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [{
      "Period": "Jan-Feb",
      "CountOfShiftRequests": 370
    }, {
      "Period": "Feb-Mar",
      "CountOfShiftRequests": 300
    }, {
      "Period": "Mar-Apr",
      "CountOfShiftRequests": 250
    }, {
      "Period": "Apr-May",
      "CountOfShiftRequests": 439
    }, {
      "Period": "May-Jun",
      "CountOfShiftRequests": 320
    }, {
      "Period": "Jun-Jul",
      "CountOfShiftRequests": 389
    }, {
      "Period": "Jul-Aug",
      "CountOfShiftRequests": 510
    }];
    let categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* CategoryAxis */ "a"]());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "Period";
    categoryAxis.renderer.minGridDistance = 40;
    let valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* ValueAxis */ "i"]());
    let series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* CurvedColumnSeries */ "d"]());
    series.dataFields.categoryX = "Period";
    series.dataFields.valueY = "CountOfShiftRequests";
    series.tooltipText = "{valueY.CountOfShiftRequests}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.75;
    let hoverState = series.columns.template.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.tension = 0.4;
    chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* XYCursor */ "k"]();
    var colorSet = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* ColorSet */ "a"]();
    colorSet.list = ["#0091DA", "#483698", "#470A68", "#00338D", "#6D2077", "#00A3A1"].map(function (color) {
      return new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* color */ "g"](color);
    });
    chart.colors = colorSet; // Add distinctive colors for each column using adapter

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    }); //chart.scrollbarX = new am4core.Scrollbar();

    chart.exporting.menu = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* ExportMenu */ "c"]();
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(() => {
    createAreaChart();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    id: "chartAreaDiv",
    style: {
      width: "100%",
      height: "400px"
    }
  }));
}

__signature__(AreaChart, "useTheme{}\nuseTheme{}\nuseEffect{}");

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AreaChart, "AreaChart", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\chart\\areaChart.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieChart; });
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122);
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(123);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






function PieChart({
  dashboardId
}) {
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* useTheme */ "l"](_amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* useTheme */ "l"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

  const createPieChart = () => {
    let container = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* create */ "h"]("chartPieDiv", _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* Container */ "b"]);
    container.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* percent */ "k"](100);
    container.height = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* percent */ "k"](100);
    container.layout = "horizontal";
    let chart = container.createChild(_amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* PieChart */ "f"]);
    chart.data = [{
      "country": "Data & Analytics",
      "litres": 500,
      "subData": [{
        name: "Lighthouse",
        value: 200
      }, {
        name: "IT Advisory",
        value: 150
      }, {
        name: "KTech",
        value: 100
      }, {
        name: "Advisory Tech",
        value: 50
      }]
    }, {
      "country": "Customer Solutions- Procurement",
      "litres": 300,
      "subData": [{
        name: "Supply chain and operations",
        value: 150
      }, {
        name: "Procurement and business services",
        value: 100
      }, {
        name: "Customer solutions",
        value: 50
      }]
    }, {
      "country": "Health Care & Life Sciences",
      "litres": 200,
      "subData": [{
        name: "Health Care Operations",
        value: 110
      }, {
        name: "Care Journey",
        value: 60
      }, {
        name: "Health Care Information Technology",
        value: 30
      }]
    }, {
      "country": "PMO",
      "litres": 150,
      "subData": [{
        name: "PMO Audit Core",
        value: 80
      }, {
        name: "PMO TCoE",
        value: 40
      }, {
        name: "PMO Hub",
        value: 30
      }]
    }, {
      "country": "Source",
      "litres": 140,
      "subData": [{
        name: "Global Insights",
        value: 90
      }, {
        name: "Global Strategy Support",
        value: 40
      }, {
        name: " Global Functional Support ",
        value: 10
      }]
    }, {
      "country": "Advisory Innovation",
      "litres": 120,
      "subData": [{
        name: " Powered Maintenance ",
        value: 60
      }, {
        name: " Advisory Tech-PM ",
        value: 30
      }, {
        name: "Enterprise Performance Management",
        value: 30
      }]
    }]; // Add and configure Series

    let pieSeries = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* PieSeries */ "g"]());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0; //pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

    pieSeries.slices.template.events.on("hit", function (event) {
      selectSlice(event.target.dataItem);
    });
    let chart2 = container.createChild(_amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* PieChart */ "f"]);
    chart2.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* percent */ "k"](30);
    chart2.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* percent */ "k"](80); // Add and configure Series

    let pieSeries2 = chart2.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* PieSeries */ "g"]());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
    pieSeries2.labels.template.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* percent */ "k"](50);
    pieSeries2.labels.template.inside = true; //pieSeries2.labels.template.fill = am4core.color("#ffffff");

    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = true;
    pieSeries2.events.on("positionchanged", updateLines);
    let interfaceColors = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* InterfaceColorSet */ "d"]();
    var colorSet = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* ColorSet */ "a"]();
    colorSet.list = ["#0091DA", "#483698", "#470A68", "#00338D", "#6D2077", "#00A3A1"].map(function (color) {
      return new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* color */ "g"](color);
    });
    pieSeries.colors = colorSet;
    let line1 = container.createChild(_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* Line */ "f"]);
    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;
    let line2 = container.createChild(_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* Line */ "f"]);
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground");
    line2.isMeasured = false;
    let selectedSlice;

    function selectSlice(dataItem) {
      selectedSlice = dataItem.slice;
      let fill = selectedSlice.fill;
      let count = dataItem.dataContext.subData.length;
      pieSeries2.colors.list = [];

      for (var i = 0; i < count; i++) {
        pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
      }

      chart2.data = dataItem.dataContext.subData;
      pieSeries2.appear();
      let middleAngle = selectedSlice.middleAngle;
      let firstAngle = pieSeries.slices.getIndex(0).startAngle;
      let animation = pieSeries.animate([{
        property: "startAngle",
        to: firstAngle - middleAngle
      }, {
        property: "endAngle",
        to: firstAngle - middleAngle + 360
      }], 600, _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* ease */ "i"].sinOut);
      animation.events.on("animationprogress", updateLines);
      selectedSlice.events.on("transformed", updateLines); //var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
      //animation.events.on("animationprogress", updateLines)
    }

    function updateLines() {
      if (selectedSlice) {
        let p11 = {
          x: selectedSlice.radius * _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* math */ "j"].cos(selectedSlice.startAngle),
          y: selectedSlice.radius * _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* math */ "j"].sin(selectedSlice.startAngle)
        };
        let p12 = {
          x: selectedSlice.radius * _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* math */ "j"].cos(selectedSlice.startAngle + selectedSlice.arc),
          y: selectedSlice.radius * _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* math */ "j"].sin(selectedSlice.startAngle + selectedSlice.arc)
        };
        p11 = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* utils */ "m"].spritePointToSvg(p11, selectedSlice);
        p12 = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* utils */ "m"].spritePointToSvg(p12, selectedSlice);
        let p21 = {
          x: 0,
          y: -pieSeries2.pixelRadius
        };
        let p22 = {
          x: 0,
          y: pieSeries2.pixelRadius
        };
        p21 = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* utils */ "m"].spritePointToSvg(p21, pieSeries2);
        p22 = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* utils */ "m"].spritePointToSvg(p22, pieSeries2);
        line1.x1 = p11.x;
        line1.x2 = p21.x;
        line1.y1 = p11.y;
        line1.y2 = p21.y;
        line2.x1 = p12.x;
        line2.x2 = p22.x;
        line2.y1 = p12.y;
        line2.y2 = p22.y;
      }
    }

    chart.events.on("datavalidated", function () {
      setTimeout(function () {
        selectSlice(pieSeries.dataItems.getIndex(0));
      }, 1000);
    });
    chart.exporting.menu = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* ExportMenu */ "c"]();
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(() => {
    createPieChart();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    id: "chartPieDiv",
    style: {
      width: "100%",
      height: "400px"
    }
  }));
}

__signature__(PieChart, "useTheme{}\nuseTheme{}\nuseEffect{}");

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PieChart, "PieChart", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\chart\\pieofpieChart.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaterfallChart; });
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122);
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(123);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






function WaterfallChart({
  dashboardId
}) {
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* useTheme */ "l"](_amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* useTheme */ "l"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

  const createWaterfallChart = () => {
    let chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* create */ "h"]("chartWaterfallDiv", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* XYChart */ "j"]);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    // using math in the data instead of final values just to illustrate the idea of Waterfall chart
    // a separate data field for step series is added because we don't need last step (notice, the last data item doesn't have stepValue)

    chart.data = [{
      category: "Raised",
      value: 8000,
      open: 0,
      stepValue: 8000,
      color: '#31b3e0',
      displayValue: 8000
    }, {
      category: "Approved",
      value: 8000 - 5000,
      open: 8000,
      stepValue: 8000 - 5000,
      color: '#60c483',
      displayValue: 5000
    }, {
      category: "Rejected",
      value: 8000 - 5000 + 3000,
      open: 8000 - 5000,
      stepValue: 8000 - 5000 + 3000,
      color: '#f98483',
      displayValue: 3000
    }, {
      category: "Net Payable",
      value: 8000 - 3000,
      open: 0,
      color: '#ffc721',
      displayValue: 8000 - 3000
    }];
    let categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* CategoryAxis */ "a"]());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 40;
    let valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* ValueAxis */ "i"]());
    let columnSeries = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* ColumnSeries */ "c"]());
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";
    columnSeries.dataFields.openValueY = "open";
    columnSeries.fillOpacity = 0.8;
    columnSeries.sequencedInterpolation = true;
    columnSeries.interpolationDuration = 1500;
    let columnTemplate = columnSeries.columns.template;
    columnTemplate.strokeOpacity = 0;
    columnTemplate.propertyFields.fill = "color";
    let label = columnTemplate.createChild(_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* Label */ "e"]);
    label.text = "{displayValue.formatNumber('₹#,## a')}";
    label.align = "center";
    label.valign = "middle";
    let stepSeries = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* StepLineSeries */ "h"]());
    stepSeries.dataFields.categoryX = "category";
    stepSeries.dataFields.valueY = "stepValue";
    stepSeries.noRisers = true;
    stepSeries.stroke = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* InterfaceColorSet */ "d"]().getFor("alternativeBackground");
    stepSeries.strokeDasharray = "3,3";
    stepSeries.interpolationDuration = 2000;
    stepSeries.sequencedInterpolation = true; // because column width is 80%, we modify start/end locations so that step would start with column and end with next column

    stepSeries.startLocation = 0.1;
    stepSeries.endLocation = 1.1;
    chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[/* XYCursor */ "k"]();
    chart.cursor.behavior = "none";
    chart.exporting.menu = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[/* ExportMenu */ "c"]();
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(() => {
    createWaterfallChart();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    id: "chartWaterfallDiv",
    style: {
      width: "100%",
      height: "400px"
    }
  }));
}

__signature__(WaterfallChart, "useTheme{}\nuseTheme{}\nuseEffect{}");

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(WaterfallChart, "WaterfallChart", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\chart\\waterfallChart.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HRRecruiterDashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(258);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(157);
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(174);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(13);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _datatables_hr_recruiter_datatable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(460);
/* harmony import */ var _chart_areaChart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(318);
/* harmony import */ var _chart_pieofpieChart__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(321);
/* harmony import */ var _chart_waterfallChart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(322);
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(30);
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(41);
/* harmony import */ var _amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(122);
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(123);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(74);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(34);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};























const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(theme => ({
  root: {
    display: 'flex'
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {},
  typography: {
    fontFamily: 'Univers For KPMG',
    fontSize: '1.5em'
  },
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  verticalTabDiv: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 410
  }
}));
const AntTabs = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);
const AntTab = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
  disableRipple: true
}, props)));

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: `scrollable-auto-tabpanel-${index}`,
    "aria-labelledby": `scrollable-auto-tab-${index}`
  }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, children));
}

TabPanel.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.node,
  index: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired
};

function TabPanelVertical(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: `vertical-tabpanel-${index}`,
    "aria-labelledby": `vertical-tab-${index}`
  }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, children));
}

TabPanelVertical.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.node,
  index: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

function HRRecruiterDashboard() {
  const classes = useStyles();
  const fixedHeightPaper = Object(clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(classes.paper, classes.fixedHeight);
  const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [getKPIValues, setKPIValues] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getVerticalTabValue, setVerticalTabValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);

  const handleVertivalTabChange = (event, newValue) => {
    setVerticalTabValue(newValue);
  };

  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_22__[/* useLocation */ "h"])();
  const userDetails = location.state.params;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* useTheme */ "l"](_amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"]);
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* useTheme */ "l"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"]);

  const smallLineCharts = () => {
    // Functions that create various sparklines
    function createLineNewChart(title, data, color, chartDiv) {
      let container = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* create */ "h"](chartDiv, _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* Container */ "b"]);
      container.layout = "horizontal";
      container.fixedWidthGrid = true;
      container.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* percent */ "k"](100);
      container.height = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* percent */ "k"](100);
      let chart = container.createChild(_amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* XYChart */ "j"]);
      chart.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* percent */ "k"](45);
      chart.height = 70;
      chart.data = data;
      chart.padding(20, 5, 2, 5);
      let categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* CategoryAxis */ "a"]());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.baseGrid.disabled = true;
      categoryAxis.renderer.labels.template.disabled = true;
      categoryAxis.cursorTooltipEnabled = false;
      categoryAxis.dataFields.category = "Period";
      let valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* ValueAxis */ "i"]());
      valueAxis.min = 0;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* XYCursor */ "k"]();
      chart.cursor.lineY.disabled = true;
      chart.cursor.behavior = "none";
      let series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* LineSeries */ "e"]());
      series.tooltipText = "{Period}: [bold]{value}";
      series.dataFields.categoryX = "Period";
      series.dataFields.valueY = "value";
      series.tensionX = 0.8;
      series.strokeWidth = 1;
      series.stroke = '#fff'; // render data points as bullets

      let bullet = series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* CircleBullet */ "b"]());
      bullet.circle.opacity = 1;
      bullet.circle.fill = color;
      bullet.circle.propertyFields.opacity = "opacity";
      bullet.circle.radius = 3;
      return chart;
    }

    createLineNewChart("New", [{
      "Period": 'Jan-Feb',
      "value": 30
    }, {
      "Period": "Feb-Mar",
      "value": 20
    }, {
      "Period": "Mar-Apr",
      "value": 25
    }, {
      "Period": "Apr-May",
      "value": 43
    }, {
      "Period": 'May-Jun',
      "value": 32
    }, {
      "Period": "Jun-Jul",
      "value": 28
    }, {
      "Period": "Jul-Aug",
      "value": 41,
      "opacity": 1
    }], '#31b3e0', 'chartNewDiv');
    createLineNewChart("Approved", [{
      "Period": 'Jan-Feb',
      "value": 29
    }, {
      "Period": "Feb-Mar",
      "value": 20
    }, {
      "Period": "Mar-Apr",
      "value": 23
    }, {
      "Period": "Apr-May",
      "value": 40
    }, {
      "Period": 'May-Jun',
      "value": 31
    }, {
      "Period": "Jun-Jul",
      "value": 27
    }, {
      "Period": "Jul-Aug",
      "value": 36,
      "opacity": 1
    }], '#60c483', 'chartApprovedDiv');
    createLineNewChart("Closed", [{
      "Period": 'Jan-Feb',
      "value": 1
    }, {
      "Period": "Feb-Mar",
      "value": 0
    }, {
      "Period": "Mar-Apr",
      "value": 2
    }, {
      "Period": "Apr-May",
      "value": 3
    }, {
      "Period": 'May-Jun',
      "value": 1
    }, {
      "Period": "Jun-Jul",
      "value": 1
    }, {
      "Period": "Jul-Aug",
      "value": 5,
      "opacity": 1
    }], '#f98483', 'chartClosedDiv');
    createLineNewChart("Paid", [{
      "Period": 'Jan-Feb',
      "value": 397330
    }, {
      "Period": "Feb-Mar",
      "value": 322220
    }, {
      "Period": "Mar-Apr",
      "value": 251230
    }, {
      "Period": "Apr-May",
      "value": 432659
    }, {
      "Period": 'May-Jun',
      "value": 322120
    }, {
      "Period": "Jun-Jul",
      "value": 282879
    }, {
      "Period": "Jul-Aug",
      "value": 514350,
      "opacity": 1
    }], '#ffc721', 'chartTotalDiv'); //document.querySelector('[aria-labelledby="id-43-title"]').remove();
    //document.querySelector('[aria-labelledby="id-179-title"]').remove();
    //document.querySelector('[aria-labelledby="id-315-title"]').remove();
    //document.querySelector('[aria-labelledby="id-451-title"]').remove();
  };

  const getAllKPIValues = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_20___default.a.post('/api/getBonusAndBuyoutKPIHR/', {
        email: userDetails.EmployeeEmailId
      })]);
      setKPIValues(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_21__["trackPromise"])(getAllKPIValues());
    smallLineCharts();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#31b3e0,#1d97c2) ',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "New - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].Pending,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartNewDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#60c483,#41af67)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Approved - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].Approved,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartApprovedDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#f98483,#f75453)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Rejected - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].Rejected,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartClosedDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#ffc721,#edb100)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Disbursed - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].AmountDisbursed,
    duration: 2,
    useEasing: true,
    separator: ",",
    prefix: '₹'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartTotalDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 12,
    lg: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.demo1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTabs, {
    value: value,
    onChange: handleChange,
    "aria-label": "ant example"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTab, {
    label: "Approvals"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTab, {
    label: "Insights"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_hr_recruiter_datatable__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    getAllKPIValues: getAllKPIValues
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: value,
    index: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.verticalTabDiv
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    orientation: "vertical",
    variant: "scrollable",
    value: getVerticalTabValue,
    onChange: handleVertivalTabChange,
    "aria-label": "Vertical tabs example",
    className: classes.verticalTabs
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
    label: "Trend"
  }, a11yProps(0))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
    label: "Segmentation"
  }, a11yProps(1))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
    label: "Cumulation"
  }, a11yProps(2)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: getVerticalTabValue,
    index: 0,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chart_areaChart__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    dashboardId: 1
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: getVerticalTabValue,
    index: 1,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chart_pieofpieChart__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: getVerticalTabValue,
    index: 2,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chart_waterfallChart__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], null)))))));
}

__signature__(HRRecruiterDashboard, "useStyles{classes}\nuseState{[value, setValue](0)}\nuseState{[getKPIValues, setKPIValues]([])}\nuseState{[getVerticalTabValue, setVerticalTabValue](0)}\nuseLocation{location}\nuseTheme{}\nuseTheme{}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_22__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
  reactHotLoader.register(AntTabs, "AntTabs", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
  reactHotLoader.register(AntTab, "AntTab", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
  reactHotLoader.register(TabPanel, "TabPanel", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
  reactHotLoader.register(TabPanelVertical, "TabPanelVertical", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
  reactHotLoader.register(a11yProps, "a11yProps", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
  reactHotLoader.register(HRRecruiterDashboard, "HRRecruiterDashboard", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-recruiter-dashboard.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(492);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;margin:0px;padding:0}.switch-wrapper{position:relative}.switch-wrapper>div{position:absolute;transition:all .25s ease-in-out;width:100%}.arrow-up{border-bottom:5px solid rgba(108,117,125,0.6);border-left:5px solid transparent;border-right:5px solid transparent;margin-left:.25rem}.arrow-down{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid rgba(108,117,125,0.6);margin-left:.25rem}.Navbar{display:flex;flex-direction:row;height:3.9rem;justify-content:space-between;padding-bottom:1rem}.Navbar>*{align-self:center}.Navbar a{color:inherit;text-decoration:none}.Navbar .navbar-left{color:#a7a7a7;cursor:pointer;font-family:'Univers for KPMG' !important;font-size:12px;font-weight:600;padding:1.5rem}.Navbar .navbar-middle{color:#a7a7a7;font-family:'Univers for KPMG' !important;font-size:18px;font-weight:900;text-transform:uppercase}.Navbar .navbar-middle span{color:#4c75f2}.Navbar .navbar-middle img{height:28px}.Navbar .navbar-right{color:#a7a7a7;cursor:pointer;font-family:'Univers for KPMG' !important;font-size:12px;font-weight:600;padding:1.5rem !important;transition:all 0s ease-in-out;width:2rem}.Navbar .navbar-right:hover{background:#4c75f2;color:#fff}.Navbar .expand{background:#00338D;color:#a7a7a7;display:flex;flex-direction:column;font-family:'Univers for KPMG' !important;height:100vh;position:absolute;transform:none;width:100vw;z-index:9999}.Navbar .expand>*{border-bottom:1px solid rgba(254,245,255,0.431373);border-top:1px solid rgba(254,245,255,0.431373);padding:1.5rem;transition:all .15s ease-in-out}.Navbar .expand>*:hover{background:#bba0bd6e}.Navbar .expand>* span.focused{background:#bba0bd6e;color:#4c75f2;padding:.25rem}.Navbar .expand .expand-bottom{align-self:flex-start;border:0}.Navbar .expand .expand-bottom:hover{background:none}.Home{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;margin-left:10rem;margin-right:5rem}.Home .home-left,.Home .home-right{display:flex;flex-direction:column;width:30rem}.Home .home-left{margin-left:2.5rem;margin-right:2.5rem}.Home .home-right{margin-left:2.5rem;margin-right:2.5rem;min-height:10rem}.alert{background:rgba(254,245,255,0.431373);border-radius:5px;color:#a7a7a7;display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:10px;margin-right:.5rem;padding:.5rem;width:6rem}.alert svg{color:rgba(108,117,125,0.6);margin-right:.25rem;margin-top:-.25rem;stroke-width:2px;width:36px !important}.alert .alert-right{width:10rem}.alert .alert-right a{background:rgba(254,245,255,0.431373);color:#a7a7a7;padding-left:.1rem;padding-right:.1rem}.alert .alert-right a:hover{background:rgba(108,117,125,0.12549)}.alert.is-green{background:rgba(40,167,69,0.12549);color:#28a745}.alert.is-green svg{stroke:rgba(40,167,69,0.6)}.State{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;margin-left:10rem;margin-right:5rem}.State .header{display:flex;flex-direction:row;justify-content:space-between;margin-top:1.5rem;width:calc(100% - 3rem)}.State .header>*{align-self:flex-start}.State .header .header-left h1,.State .header .header-left h5{margin:0}.State .header .header-left h1{color:#e23028;max-width:20rem}.State .header .header-left h5{color:#a7a7a7;font-weight:600}.State .header .header-right{color:rgba(32,26,162,0.6);display:flex;flex-direction:column;margin-top:.1rem;text-align:right}.State .header .header-right h2,.State .header .header-right h5{font-weight:600;margin:0}.State .header .header-right h2{color:rgba(32,26,162,0.866667);font-weight:900;margin-bottom:1rem}.State .header .header-right a{background:rgba(32,26,162,0.12549);color:inherit;text-decoration:none;transition:all .2s ease-in-out}.State .header .header-right a:hover{background:rgba(32,26,162,0.188235)}.State .state-left,.State .state-right{display:flex;flex-direction:column;width:30rem}.State .state-left{margin-left:2.5rem;margin-right:2.5rem}.State .state-right{margin-left:2.5rem;margin-right:2.5rem}.State a{text-decoration:none}.State .to-essentials{align-self:center;background:rgba(254,245,255,0.431373);border-radius:5px;display:none;flex-direction:row;justify-content:center;padding:.5rem;transition:all .2s ease-in-out}.State .to-essentials:hover{background:rgba(108,117,125,0.12549)}.State .to-essentials h2{color:rgba(108,117,125,0.6);font-weight:600}.State .to-essentials svg{color:rgba(108,117,125,0.6);margin-bottom:2px;margin-left:1rem}.State .to-essentials>*{align-self:center}.State .meta-secondary{align-self:center;display:flex;flex-direction:row;margin-bottom:3rem;margin-top:3rem}.State .district-bar,.State .to-essentials{width:100%}.State .district-bar-right{display:flex;justify-content:center;position:relative}.State .district-bar-right .happy-sign{display:flex;flex-direction:row;position:absolute;top:4rem}.State .MapExplorer,.State .meta-secondary{width:calc(100% - 3rem)}.State .Minigraph .svg-parent{width:calc(25%) !important}.State .MapExplorer{margin-top:2rem}.State .MapExplorer .header,.State .MapExplorer .map-stats,.State .MapExplorer .back-button,.State .MapExplorer .last-update,.State .MapExplorer .unknown,.State .MapExplorer .tabs-map,.State .MapExplorer .footnote,.State .MapExplorer .state-page-button{display:none}.State .MapExplorer .anchor{display:none}.State .MapExplorer .svg-parent:not(.legend){height:400px;width:100%}.State .MapExplorer .svg-parent:not(.legend) svg{height:100%}.State .__react_component_tooltip{font-family:'Univers for KPMG' !important;font-size:11px;font-weight:600;padding:.25rem;text-align:center}.StateMeta{align-self:center;display:grid;grid-gap:1rem;grid-template-columns:repeat(2, 1fr);margin-bottom:3rem;width:calc(100% - 3rem)}.StateMeta.population{display:flex !important;flex-direction:row !important;justify-content:space-between !important;margin:0;margin-bottom:2rem}.StateMeta.population .alert{margin:0}.StateMeta .__react_component_tooltip{font-size:.8em;padding:1rem}.StateMeta .__react_component_tooltip img{filter:invert(1);width:20rem}.StateMeta .meta-item{border-radius:5px;min-height:6rem;padding-left:1rem;padding-top:1rem}.StateMeta .meta-item h1,.StateMeta .meta-item h2,.StateMeta .meta-item h3,.StateMeta .meta-item h4,.StateMeta .meta-item h5{margin:0}.StateMeta .meta-item h5{font-weight:600}.StateMeta .meta-item h2{font-weight:600}.StateMeta .meta-item h3{font-weight:900;width:10rem;word-wrap:break-word}.StateMeta .meta-item h1{display:inline-block;font-weight:600}.StateMeta .meta-item.population{min-height:1rem !important;padding:0 !important}.StateMeta .meta-item.population h1,.StateMeta .meta-item.population h3{color:#a7a7a7}.StateMeta .meta-item .meta-item-top{display:flex;flex-direction:row;justify-content:space-between}.StateMeta .meta-item .meta-item-top>*{align-self:center}.StateMeta .meta-item .meta-item-top span{margin-right:1rem}.StateMeta .meta-item .meta-item-top svg{align-self:flex-start;cursor:pointer;stroke-width:3;width:12px}.StateMeta .meta-item .meta-item-middle{display:flex;flex-direction:row;justify-content:space-between}.StateMeta .meta-item .meta-item-middle *{align-self:center}.StateMeta .meta-item .meta-item-middle svg{cursor:pointer;margin-right:1rem}.StateMeta .meta-item p{font-family:'Univers for KPMG' !important;font-weight:600;margin-bottom:1.25rem;padding-right:1rem}.StateMeta .meta-item.confirmed{background:rgba(255,7,58,0.12549)}.StateMeta .meta-item.confirmed h3,.StateMeta .meta-item.confirmed h5,.StateMeta .meta-item.confirmed svg,.StateMeta .meta-item.confirmed p{color:rgba(255,7,58,0.6)}.StateMeta .meta-item.confirmed h1{color:#ff073a}.StateMeta .meta-item.active{background:rgba(0,123,255,0.0627451)}.StateMeta .meta-item.active h3,.StateMeta .meta-item.active h5,.StateMeta .meta-item.active svg,.StateMeta .meta-item.active p{color:rgba(0,123,255,0.6)}.StateMeta .meta-item.active h1{color:#007bff}.StateMeta .meta-item.recovery{background:rgba(40,167,69,0.12549)}.StateMeta .meta-item.recovery h3,.StateMeta .meta-item.recovery h5,.StateMeta .meta-item.recovery svg,.StateMeta .meta-item.recovery p{color:rgba(40,167,69,0.6)}.StateMeta .meta-item.recovery h1{color:#28a745}.StateMeta .meta-item.mortality{background:rgba(254,245,255,0.431373)}.StateMeta .meta-item.mortality h3,.StateMeta .meta-item.mortality h5,.StateMeta .meta-item.mortality svg,.StateMeta .meta-item.mortality p{color:rgba(108,117,125,0.6)}.StateMeta .meta-item.mortality h1{color:#a7a7a7}.StateMeta .meta-item.cpm{background:rgba(255,193,7,0.12549)}.StateMeta .meta-item.cpm h3,.StateMeta .meta-item.cpm h5,.StateMeta .meta-item.cpm svg{color:rgba(253,126,20,0.6)}.StateMeta .meta-item.cpm h1{color:#fd7e14}.StateMeta .meta-item.tpm{background:rgba(32,26,162,0.12549)}.StateMeta .meta-item.tpm h3,.StateMeta .meta-item.tpm h5,.StateMeta .meta-item.tpm svg,.StateMeta .meta-item.tpm p{color:rgba(32,26,162,0.6)}.StateMeta .meta-item.tpm h1{color:rgba(32,26,162,0.866667)}.StateMeta .meta-item.ptr{background:rgba(255,168,203,0.188235)}.StateMeta .meta-item.ptr h3,.StateMeta .meta-item.ptr h5,.StateMeta .meta-item.ptr svg,.StateMeta .meta-item.ptr p{color:rgba(251,85,129,0.6)}.StateMeta .meta-item.ptr h1{color:#fb5581}.StateMeta .meta-item.gr{background:rgba(182,133,77,0.0627451)}.StateMeta .meta-item.gr h3,.StateMeta .meta-item.gr h5,.StateMeta .meta-item.gr p,.StateMeta .meta-item.gr svg{color:rgba(182,133,77,0.6)}.StateMeta .meta-item.gr h1{color:#b6854d}.breadcrumb{cursor:pointer;display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:.75rem;padding-left:1.5rem}.breadcrumb ul{background:#f8f9fa;border:2px solid rgba(254,245,255,0.431373);box-shadow:none;max-height:20rem;overflow-y:scroll}.breadcrumb .item a{color:#a7a7a7;width:100%}.breadcrumb .item:hover{background:rgba(108,117,125,0.12549)}.breadcrumb .item:hover a{background:transparent;color:#a7a7a7}.breadcrumb a{color:#a7a7a7;font-family:'Univers for KPMG' !important;font-size:.75rem;margin-right:.25rem;text-decoration:none;transition:all .2s ease-in-out}.breadcrumb a:not(:first-child){margin-left:.25rem}.breadcrumb a:hover{background:rgba(108,117,125,0.12549);text-decoration:none}.breadcrumb a.selected{background:rgba(254,245,255,0.431373);color:#a7a7a7}.breadcrumb .caret{color:#a7a7a7;margin-left:0;transition:all .1s ease-in-out}.breadcrumb .caret:hover{color:#343a40}.breadcrumb summary:focus{outline:none}.height-22{height:22px}.disclaimercontainer svg{margin-left:2px}.disclaimercontainer .mobile-disclaimer-button{background-color:#fff;color:#808080;font-size:xx-small;justify-content:center}.disclaimercontainer .mobile-disclaimer-button svg{font-size:.75rem}.disclaimercontainer .disclaimer-button{background:none;color:rgba(108,117,125,0.6);font-size:.7rem;font-weight:500;text-transform:none}.Resources{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;margin-left:9rem;margin-right:4rem}.Resources .resource-left,.Resources .resource-right{display:flex;flex-direction:column;width:30rem}.Resources .resource-left{margin-left:2.5rem;margin-right:2.5rem}.Resources .resource-right{margin-left:2.5rem;margin-right:2.5rem}.Resources .tableandaccordions{align-items:center;display:flex;flex-direction:column;width:100%}.Resources table{align-self:center;border-collapse:separate;border-spacing:3px 2px;font-family:'Univers for KPMG' !important;position:relative;table-layout:fixed;text-transform:none;width:100%}.Resources table thead{background:rgba(32,26,162,0.12549);color:#343a40;font-size:.9rem;text-align:center}.Resources table thead th{border-radius:5px;cursor:pointer;padding:.5rem;transition:all .1s ease-in-out;z-index:99}.Resources table thead th.descriptionCol{width:50%}.Resources table thead th.sticky{background:#f1f1f1;top:0}.Resources table thead th:hover{background:#ecedee}.Resources table thead th .heading-content{align-items:center;display:flex;flex-direction:row;height:.9rem;justify-content:space-between;position:relative}.Resources table thead th .heading-content abbr{text-align:right}.Resources table thead th .heading-content svg{color:rgba(108,117,125,0.6);margin:0;margin-left:.25rem;margin-top:.15rem;right:0;stroke-width:4px;width:10px}.Resources table tbody{color:#a7a7a7;max-width:10rem}.Resources table tbody tr{transition:background .1s ease-in-out}.Resources table tbody tr:hover{background:rgba(108,117,125,0.12549) !important}.Resources table tbody tr.divider{background:#6c757d10 !important;height:.5rem}.Resources table tbody tr.spacer{background:#fff !important;height:.5rem}.Resources table tbody td{border-radius:5px;font-size:.7rem;text-align:left}.Resources table tbody td:first-child{max-width:7.5rem;text-align:left;word-wrap:break-word}.Resources table tbody td .deltas{font-size:11px !important;margin-right:.25rem}.Resources table tbody .state-last-update{background:transparent !important}.Resources table tbody .state-last-update:hover{background:transparent !important}.Resources table tbody .state-last-update td .last-update{align-items:baseline;display:flex;flex-direction:row;text-align:left;width:100%}.Resources table tbody .district-heading{background:rgba(254,245,255,0.431373)}.Resources table tbody .district-heading td{background:rgba(254,245,255,0.431373);color:#343a40;font-size:.75rem;font-weight:900;padding:.45rem}.Resources table tbody .district-heading td .heading-content{align-items:center;display:flex;flex-direction:row;height:.9rem;justify-content:space-between;position:relative}.Resources table tbody .district-heading td .heading-content abbr{text-align:right}.Resources table tbody .district-heading td .heading-content svg{color:rgba(108,117,125,0.6);margin:0;margin-left:.25rem;margin-top:.15rem;right:0;stroke-width:4px;width:10px}.Resources table .affected-count{color:rgba(108,117,125,0.6);margin:0;position:absolute;right:0;top:-1rem}.Resources table .is-total td{background:rgba(108,117,125,0.12549)}.Resources table .dropdown{background:rgba(254,245,255,0.431373);border-radius:50%;cursor:pointer;height:13px;left:-.75rem;margin-top:.5rem;position:absolute;transition:background .2s ease-in-out;width:13px}.Resources table .dropdown:hover{background:rgba(108,117,125,0.12549)}.Resources table .dropdown svg{left:1px;position:absolute;stroke-width:3;top:-.35rem;width:11px}.filtersection{animation-duration:1s;animation-name:fadeInUp;animation-timing-function:ease-in;display:flex;flex-direction:column;margin-bottom:1rem;width:80%}.filtersection .filtertitle{align-self:center;color:#ff073a}.resourcefilters{align-items:center;display:flex;flex-direction:row;justify-content:center}.resourcefilters .button{padding:.4rem}.resourcefilter{align-items:center;display:flex;flex-direction:column;justify-content:space-around;margin-left:1rem;margin-right:1rem}.resourcefilter .filterlabel{font-family:'Univers for KPMG' !important;font-size:11px !important;font-weight:600;text-transform:uppercase}.resourcefilter select{width:100%}.searchbar{font-family:'Univers for KPMG' !important;font-size:.7rem !important;font-weight:400;margin-bottom:1rem;margin-top:1rem;text-align:center;width:100%}.searchbar #input-field-searchbar{font-family:'Univers for KPMG' !important;font-size:.7rem !important;font-weight:400;height:.1rem}.pagination{display:flex;flex-direction:row;justify-content:center}.pagination .button{align-items:center;height:70%;justify-content:space-between;margin-left:.7rem;margin-right:.7rem;margin-top:.7rem;padding-left:1.1rem;width:3rem}.pagination select{margin:.7rem .7rem .2rem .1rem}.pagination input{margin:.7rem .7rem .2rem;width:100px}.paginationbutton{display:flex;flex-direction:row;justify-content:center}.Banner{background:rgba(32,26,162,0.12549);color:rgba(32,26,162,0.866667);display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:.8rem;font-weight:600;justify-content:center;line-height:20px}.Banner .snippet{align-self:center;cursor:pointer;padding:1.5rem;text-align:center;width:calc(100% - 10rem);word-wrap:break-word}.Search{display:flex;flex-direction:column;margin-bottom:1rem;position:relative;width:100%}.Search>*{align-self:center}.Search label{color:#a7a7a7;font-family:'Univers for KPMG' !important;font-size:.75rem;margin-bottom:1rem}.Search .line{background:rgba(254,245,255,0.431373);height:1rem;width:2px}.Search input{-moz-box-shadow:0 10px 35px rgba(0,0,0,0.1);-webkit-appearance:none !important;-webkit-box-shadow:0 10px 35px rgba(0,0,0,0.1);background:#fff;border:0;border-radius:5px;box-shadow:0 10px 35px rgba(0,0,0,0.1);color:#a7a7a7;font-family:'Univers for KPMG' !important;font-size:1rem;height:2rem;outline:none;padding:1rem;padding-left:3rem;transition:all .2s ease-in-out;width:calc(100% - 4rem)}.Search .search-placeholder{font-family:'Univers for KPMG' !important;position:absolute;top:4.3rem;left:3rem;font-size:1rem;color:rgba(108,117,125,0.6);pointer-events:none;opacity:0.8;transition:opacity 1s}.Search .search-placeholder.disappear{opacity:0}.Search .search-button svg{color:rgba(108,117,125,0.6);left:.75rem;position:absolute;top:4.15rem;transition:all .2s ease-in-out}.Search .search-button.is-expand svg{left:.5rem}.Search .close-button{background:rgba(254,245,255,0.431373) !important;border-radius:50%;cursor:pointer;display:flex;flex-direction:row;height:20px;justify-content:center;position:absolute;right:1rem;top:4.15rem;transition:all .2s ease-in-out;width:20px}.Search .close-button:hover{background:rgba(108,117,125,0.12549) !important}.Search .close-button.is-expand{right:.75rem}.Search .close-button svg{align-self:center;position:absolute;stroke:rgba(108,117,125,0.6);stroke-width:3;width:12px}.Search .expanded{display:flex;flex-direction:row;margin-top:2rem;padding:1rem;padding-bottom:0;width:calc(100% - 4rem)}.Search .expanded>*{flex:1}.Search .expanded h4,.Search .expanded h3{color:#a7a7a7;font-weight:600;margin:0;margin-bottom:.5rem}.Search .expanded h3{color:#4c75f2;margin-bottom:.75rem}.Search .results{padding:1rem;padding-bottom:0;width:calc(100% - 2rem)}.Search .results a{text-decoration:none !important}.Search .results .result,.Search .results .essential-result{align-self:flex-start;border-bottom:2px solid rgba(254,245,255,0.431373);color:#a7a7a7;cursor:pointer;display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:.9rem;justify-content:space-between;padding:1rem;transition:all .2s ease-in-out}.Search .results .result:hover,.Search .results .essential-result:hover{background:rgba(254,245,255,0.431373)}.Search .results .result>*,.Search .results .essential-result>*{align-self:center}.Search .results .result .result-name,.Search .results .essential-result .result-name{max-width:15rem}.Search .results .result .result-type,.Search .results .essential-result .result-type{background:rgba(255,193,7,0.12549);border-radius:2px;color:#fd7e14;font-size:.75rem;padding:.25rem}.Search .results .essential-result{display:flex;flex-direction:column}.Search .results .essential-result .result-top{display:flex;flex-direction:row;justify-content:space-between;width:100%}.Search .results .essential-result .result-top .result-top-left{display:flex;flex-direction:column}.Search .results .essential-result .result-top .result-top-left .result-location{display:flex;flex-direction:row;font-size:.75rem}.Search .results .essential-result .result-category{align-self:flex-start;background:rgba(255,168,203,0.188235);border-radius:2px;color:#fb5581;display:flex;flex-direction:row;font-size:.75rem;height:1rem;padding:.25rem;text-align:right}.Search .results .essential-result .result-category>*{align-self:center}.Search .results .essential-result .result-category svg{margin-left:.25rem;stroke-width:3px;width:12px}.Search .results .essential-result .result-description{align-self:flex-start;font-size:.75rem;margin-top:1rem}.Search .results .essential-result .result-contact{align-self:flex-start;background:rgba(254,245,255,0.431373);border-radius:2px;display:flex;flex-direction:row;font-size:.75rem;height:1rem;margin-top:.5rem;padding:.25rem;text-align:right}.Search .results .essential-result .result-contact>*{align-self:center}.Search .results .essential-result .result-contact svg{margin-right:.25rem;stroke:rgba(108,117,125,0.6);stroke-width:3px;width:12px}.Search .suggestions{display:flex;flex-direction:column;margin-right:1rem}.Search .suggestions .suggestion{color:rgba(108,117,125,0.6);display:flex;flex-direction:row;font-family:'Univers for KPMG' !important}.Search .suggestions .suggestion div{padding-top:1px}.Search .suggestions .suggestion h4{cursor:pointer;margin-left:.25rem;word-wrap:wrap}.Search .suggestions .suggestion h4:hover{text-decoration:underline;text-decoration-thickness:2px}.header{align-self:center;display:flex;flex-direction:column;width:100%}.header>*{align-self:center}.header .actions{display:flex;flex-direction:row;justify-content:space-around;padding:1rem}.header .actions>*{align-self:center;margin-left:.5rem;margin-right:.5rem}.header .actions h5{color:#a7a7a7;font-weight:600;margin:0}.header .actions svg{color:rgba(108,117,125,0.6);cursor:pointer;stroke-width:3;width:16px}.header .actions svg:hover{stroke:#a7a7a7}.header .actions .bell-icon{height:24px;position:relative}.header .actions .bell-icon .indicator{background:#4c75f2;border-radius:50%;height:7px;position:absolute;right:-3px;top:-3px;width:7px}.last-update{align-self:center;display:flex;flex-direction:column;margin-bottom:auto;margin-top:.25rem;text-align:right}.last-update h6{color:rgba(40,167,69,0.6);font-weight:900}.last-update h3{color:#28a745;font-weight:600}.last-update h3,.last-update h6{margin:0}.button{background:rgba(0,123,255,0.0627451);border:0;border-radius:5px;color:rgba(0,123,255,0.6);cursor:pointer;display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:.75rem;font-weight:900;margin-bottom:.5rem;margin-top:.25rem;outline:none;padding:.5rem;text-decoration:none;text-transform:uppercase;transition:background .2s ease-in-out}.button svg{padding-right:6px;stroke-width:2px;width:20px}.button.is-purple{background:rgba(32,26,162,0.12549);color:rgba(32,26,162,0.6)}.button.is-purple:hover{background:rgba(32,26,162,0.188235)}.button.is-green{background:rgba(40,167,69,0.12549);color:rgba(40,167,69,0.6)}.button.is-green:hover{background:rgba(40,167,69,0.188235)}.button:hover{background:rgba(0,123,255,0.188235)}.button>*{align-self:center}.telegram{background:rgba(254,245,255,0.431373) !important;color:#08c !important;justify-content:center;padding-left:.65rem;width:15.5rem}.telegram:hover{background:rgba(108,117,125,0.12549) !important}.github{background:#000 !important;color:#fff !important;justify-content:center;padding-left:.65rem;transition:all .2s ease-in-out;width:15.5rem}.github:hover{background:#343a40 !important}.twitter{width:15.5rem}.excel{background:#33a66730;color:#33a667}.excel:hover{background:#33a66750}.map-switcher{align-self:center;display:flex;flex-direction:row;justify-content:space-between;position:absolute;top:13rem;width:30rem}.map-switcher .highlight{background:rgba(255,7,58,0.12549);position:absolute;width:calc(25%) !important;z-index:-1}.map-switcher .highlight.active{background:rgba(0,123,255,0.0627451)}.map-switcher .highlight.recovered{background:rgba(40,167,69,0.12549)}.map-switcher .highlight.deceased{background:rgba(254,245,255,0.431373)}.map-switcher .highlight,.map-switcher .clickable{border-radius:5px;cursor:pointer;height:12rem;width:calc(25%);z-index:10}.Level{align-self:center;display:flex;flex-direction:row;justify-content:space-between;width:30rem}.Level .level-item{display:flex;flex-direction:column;width:calc(25%)}.Level .level-item>*{align-self:center}.Level h1,.Level h5{margin-bottom:0}.Level h1{font-weight:600}.Level h4{margin-bottom:-.5rem}.Level h5{font-weight:600}.Level .is-cherry h1,.Level .is-cherry h5{color:#ff073a}.Level .is-cherry h4{color:rgba(255,7,58,0.6)}.Level .is-blue h1,.Level .is-blue h5{color:#007bff}.Level .is-blue h4{color:rgba(0,123,255,0.6)}.Level .is-green h1,.Level .is-green h5{color:#28a745}.Level .is-green h4{color:rgba(40,167,69,0.6)}.Level .is-gray h1,.Level .is-gray h5{color:#a7a7a7}.Level .is-gray h4{color:rgba(108,117,125,0.6)}abbr{text-decoration:none}abbr.is-cherry{color:#ff073a}abbr.is-blue{color:#007bff}abbr.is-green{color:#28a745}abbr.is-gray{color:#a7a7a7}.table-fineprint{color:rgba(108,117,125,0.6);font-weight:600;margin:0;margin-bottom:.25rem;margin-right:.25rem;text-align:right}.table-fineprint a{border-bottom:2px solid rgba(108,117,125,0.12549);color:inherit;text-decoration:none;transition:all .2s ease-in-out}.table-fineprint a:hover{background:rgba(108,117,125,0.12549)}.Table{margin-bottom:1rem}table{align-self:center;border-collapse:separate;border-spacing:3px 4px;font-family:'Univers for KPMG' !important;position:relative;width:30rem}table thead{background:rgba(254,245,255,0.431373);color:#a7a7a7;font-size:.75rem;text-align:left}table thead th{background:#00338D;border-radius:5px;cursor:pointer;padding:.5rem;position:sticky !important;top:5px;transition:all .1s ease-in-out;z-index:99}table thead th:hover{background:#ecedee}table .heading-content{align-items:center;display:flex;flex-direction:row;height:.9rem;justify-content:space-between;position:relative}table .heading-content abbr{color:#a7a7a7;text-align:right}table .heading-content abbr.is-confirmed{color:#ff073a}table .heading-content abbr.is-active{color:#007bff}table .heading-content abbr.is-recovered{color:#28a745}table .heading-content abbr.is-deaths{color:#a7a7a7}table .heading-content svg{color:rgba(108,117,125,0.6);margin:0;margin-left:.25rem;margin-top:.15rem;right:0;stroke-width:4px;width:10px}table tbody{color:#a7a7a7}table tbody tr{cursor:pointer}table tbody tr:nth-child(odd){background:rgba(254,245,255,0.431373)}table tbody tr.is-highlighted{background:rgba(108,117,125,0.12549) !important}table tbody tr.is-odd{background:rgba(254,245,255,0.431373) !important}table tbody tr.is-total{background:rgba(108,117,125,0.12549)}table tbody tr.is-spacer{background:transparent !important}table tbody tr.is-spacer:hover{background:transparent !important}table tbody tr:hover{background:rgba(108,117,125,0.12549) !important}table tbody tr:hover .dropdown{background:rgba(108,117,125,0.12549)}table tbody td{border-radius:4px;font-size:.9rem;padding:.25rem;text-align:right}table tbody td:first-child{font-weight:600;max-width:7.5rem !important;text-align:left;word-wrap:break-word !important}table tbody td .delta{display:inline-block;font-size:11px !important}table tbody td .delta svg{height:9px;stroke-width:3;vertical-align:-.25px;width:9px}table tbody td .delta.is-confirmed{color:#ff073a}table tbody td .delta.is-active{color:#007bff}table tbody td .delta.is-recovered{color:#28a745}table tbody td .delta.is-deaths{color:#a7a7a7}table tbody td .total{margin-left:.25rem}table tbody td a{height:1px}table tbody td a svg{align-self:center;color:rgba(108,117,125,0.6);margin-left:2px;stroke-width:3px;transition:all .2s ease-in-out;vertical-align:-.435rem;width:12px}table tbody td a svg:hover{stroke:#a7a7a7}table tbody td.is-Orange{background:rgba(255,193,7,0.12549);border-left:5px solid rgba(253,126,20,0.6);color:#fd7e14}table tbody td.is-Orange svg{color:#fd7e14 !important}table tbody td.is-Red{background:rgba(255,7,58,0.12549);border-left:5px solid rgba(255,7,58,0.6);color:#ff073a}table tbody td.is-Red svg{color:#ff073a !important}table tbody td.is-Green{background:rgba(40,167,69,0.12549);border-left:5px solid rgba(40,167,69,0.6);color:#28a745}table tbody td.is-Green svg{color:#28a745 !important}table tbody .title-chevron{position:relative}table tbody .title-chevron>*{align-self:center}table tbody .title-chevron .title-icon svg{color:rgba(108,117,125,0.6);padding-left:2px;stroke-width:3;vertical-align:-6.5px;width:12px}table tbody .state-last-update{background:transparent !important;color:#28a745 !important;height:2rem}table tbody .state-last-update p{font-size:.75rem;margin:0}table tbody .state-last-update:hover{background:transparent !important}table tbody .state-last-update .disclaimer{backdrop-filter:saturate(180%) blur(20px);background:rgba(254,245,255,0.431373);border-radius:5px;color:#a7a7a7;display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:12px;left:0;margin-top:.5rem;max-width:10rem;padding:.5rem}table tbody .state-last-update .disclaimer svg{margin-right:.25rem;margin-top:-.25rem;stroke-width:2px;width:20px !important}table tbody .state-last-update .state-page-link{background:rgba(255,193,7,0.12549) !important;color:#fd7e14;font-size:.75rem;font-weight:600;padding:.5rem;text-align:center}table tbody .state-last-update .state-page-link:hover{background:rgba(255,193,7,0.188235) !important}table tbody .district-heading{background:rgba(254,245,255,0.431373)}table tbody .district-heading:hover{background:rgba(254,245,255,0.431373) !important}table tbody .district-heading td{background:rgba(254,245,255,0.431373);color:#343a40;font-size:.75rem;font-weight:900;padding:.45rem}table tbody .district-heading td .heading-content{align-items:center;display:flex;flex-direction:row;height:.9rem;justify-content:space-between;position:relative}table tbody .district-heading td .heading-content abbr{text-align:right}table tbody .district-heading td .heading-content svg{color:rgba(108,117,125,0.6);margin:0;margin-left:.25rem;margin-top:.15rem;right:0;stroke-width:4px;width:10px}table .affected-count{color:rgba(108,117,125,0.6);margin:0;position:absolute;right:0;top:-1rem}table .unknown svg{color:rgba(108,117,125,0.6);height:12px;padding-left:2px;stroke-width:3;vertical-align:-1.5px;width:12px}table .dropdown{background:rgba(254,245,255,0.431373);border-radius:50%;cursor:pointer;height:13px;left:-1.25rem;position:absolute;top:.125rem;transition:background .2s ease-in-out;width:13px}table .dropdown:hover{background:rgba(108,117,125,0.12549)}table .dropdown svg{left:1px;position:absolute;stroke-width:3;top:-.35rem;width:11px}#chart{z-index:10}.back-button{z-index:11}.anchor{cursor:pointer;position:absolute;right:0;transform:rotate(45deg);transition:all .1s ease-in-out}.anchor svg{stroke:rgba(108,117,125,0.6);stroke-width:3;width:16px}.anchor svg:hover{stroke:#a7a7a7}.anchor.stickied{transform:rotate(0deg)}.anchor.stickied svg{stroke:#a7a7a7}.MapExplorer{align-self:center;display:flex;flex-direction:column;width:30rem}.MapExplorer.stickied{position:sticky !important;top:0}.MapExplorer .header{align-self:flex-start;color:#a7a7a7;display:flex;flex-direction:column}.MapExplorer .header h1,.MapExplorer .header h6{margin:0}.MapExplorer .header h6{margin-bottom:2rem;margin-top:.75rem}.MapExplorer .svg-parent{display:flex;flex-direction:row;margin:auto;margin-top:2rem;overflow:hidden;width:90%}.MapExplorer .svg-parent svg{align-self:center;width:100%}.MapExplorer .svg-parent svg text{fill:#a7a7a7;font-family:'Univers for KPMG' !important;font-size:10px;font-weight:600;text-align:right}.MapExplorer .legend{margin-top:1em;width:100%}.MapExplorer .legend svg{display:block;overflow:visible}.MapExplorer .map-hover{stroke-width:2}.MapExplorer .back-button{background:rgba(255,193,7,0.12549);color:#fd7e14;position:absolute;right:0;top:2.75rem;transition:all .2s ease-in-out}.MapExplorer .back-button:hover{background:rgba(255,193,7,0.188235)}.MapExplorer .state-page-button{background:rgba(255,193,7,0.12549);border-radius:5px;color:#fd7e14;font-size:.75rem;height:1.5rem;padding:.45rem;padding-left:.75rem;position:absolute;right:0;top:-.5rem;transition:all .2s ease-in-out}.MapExplorer .state-page-button:hover{background:rgba(255,193,7,0.188235)}.MapExplorer .state-page-button abbr{text-transform:none}.MapExplorer .state-page-button svg{height:12px;margin-left:.25rem;stroke:rgba(253,126,20,0.6);stroke-width:3px;vertical-align:middle;width:12px}.MapExplorer .meta{display:flex;flex-direction:row;flex-wrap:wrap;height:4rem;justify-content:space-between}.MapExplorer .meta h2{color:#e23028;font-weight:900;margin-top:0;width:calc(100% - 10rem);word-wrap:break-word}.MapExplorer .meta h2.active{color:#007bff}.MapExplorer .meta h2.recovered{color:#28a745}.MapExplorer .meta h2.deceased{color:#a7a7a7}.MapExplorer .meta h4{color:rgba(108,117,125,0.6);margin:0;word-wrap:break-word}.MapExplorer .meta a{width:10rem}.MapExplorer .meta .district{color:#e23028;line-height:15px;margin:0}.MapExplorer .meta .district span{font-size:.75rem;font-weight:600}.MapExplorer .meta .district.active{color:#007bff}.MapExplorer .meta .district.recovered{color:#28a745}.MapExplorer .meta .district.deceased{color:#a7a7a7}.MapExplorer .meta .unknown{font-weight:600;position:absolute;right:0;text-align:right;top:5.5rem;width:5rem}.MapExplorer .map-stats{display:flex;flex-direction:row;flex-wrap:wrap;margin-bottom:1rem;position:relative;width:100%;z-index:10}.MapExplorer .map-stats h1,.MapExplorer .map-stats h5,.MapExplorer .map-stats h6,.MapExplorer .map-stats h3{margin:0}.MapExplorer .map-stats h3{color:rgba(108,117,125,0.6);font-weight:900}.MapExplorer .map-stats .stats{background:rgba(255,7,58,0.12549);border-radius:5px;color:rgba(255,7,58,0.6);cursor:pointer;display:flex;flex:1;flex-direction:column;height:3rem;margin-bottom:1rem;margin-left:.25rem;margin-right:.25rem;padding:.25rem;position:relative;transition:all .1s ease-in-out}.MapExplorer .map-stats .stats .stats-bottom{display:flex;flex-direction:column}.MapExplorer .map-stats .stats .stats-bottom h6{font-weight:900;margin-bottom:.25rem;margin-top:auto}.MapExplorer .map-stats .stats h1{color:#ff073a;font-size:1em !important;font-weight:600}.MapExplorer .map-stats .stats.is-green{background:rgba(40,167,69,0.12549)}.MapExplorer .map-stats .stats.is-green h5,.MapExplorer .map-stats .stats.is-green h6{color:rgba(40,167,69,0.6)}.MapExplorer .map-stats .stats.is-green h1{color:#28a745}.MapExplorer .map-stats .stats.is-blue{background:rgba(0,123,255,0.0627451)}.MapExplorer .map-stats .stats.is-blue h5,.MapExplorer .map-stats .stats.is-blue h6{color:rgba(0,123,255,0.6)}.MapExplorer .map-stats .stats.is-blue h1{color:#007bff}.MapExplorer .map-stats .stats.is-gray{background:rgba(254,245,255,0.431373)}.MapExplorer .map-stats .stats.is-gray h5,.MapExplorer .map-stats .stats.is-gray h6{color:rgba(108,117,125,0.6)}.MapExplorer .map-stats .stats.is-gray h1{color:#a7a7a7}.MapExplorer .map-stats .stats.is-yellow{background:#ffc107}.MapExplorer .map-stats .stats.is-yellow h5,.MapExplorer .map-stats .stats.is-yellow h6{color:#fff}.MapExplorer .map-stats .stats.is-yellow h1{color:#fff}.MapExplorer .map-stats .stats.is-purple{background:rgba(32,26,162,0.12549);padding-right:1rem}.MapExplorer .map-stats .stats.is-purple h5,.MapExplorer .map-stats .stats.is-purple h6{color:rgba(32,26,162,0.6)}.MapExplorer .map-stats .stats.is-purple h5.timestamp,.MapExplorer .map-stats .stats.is-purple h6.timestamp{font-weight:900;margin:0}.MapExplorer .map-stats .stats.is-purple h1{color:rgba(32,26,162,0.866667)}.MapExplorer .map-stats .stats.is-purple svg{cursor:pointer;position:absolute;right:.35rem;stroke:rgba(32,26,162,0.6);stroke-width:3;top:0;transition:stroke .2s ease-in-out;width:12px}.MapExplorer .map-stats .stats.is-purple svg:hover{stroke:rgba(32,26,162,0.866667)}.MapExplorer .map-stats .stats.is-purple .tooltip-tested svg{bottom:.3rem;top:auto}.MapExplorer .map-stats .stats.focused{margin-bottom:.5rem;margin-top:-.5rem;padding-bottom:.75rem;padding-top:.75rem}.MapExplorer .map-stats .stats:first-child{margin-left:0}.MapExplorer .map-stats .stats:last-child{margin-right:0}.MapExplorer #chart,.MapExplorer #legend{filter:saturate(1.5)}.MapExplorer .disclaimer{backdrop-filter:saturate(180%) blur(20px);background:rgba(254,245,255,0.431373);border-radius:5px;bottom:50%;color:#343a40;display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;font-size:12px;left:0;margin-left:auto;margin-right:auto;padding:.5rem;pointer-events:none;position:absolute;right:0;width:14rem;z-index:99}.MapExplorer .disclaimer svg{margin-right:.25rem;margin-top:-.9rem;stroke-width:2px;width:20px !important}.MapExplorer .footnote.table-fineprint{margin-bottom:0;margin-top:1em;text-align:left}.__react_component_tooltip{font-family:'Univers for KPMG' !important;font-size:11px;font-weight:600;padding:.25rem;text-align:center;width:200px}.tooltip-tested{pointer-events:all}.tooltip-tested svg{cursor:pointer;height:.95em;stroke-width:3;width:1em}.tabs{display:flex;flex-direction:row;position:relative;z-index:99}.tabs .tab{background:rgba(254,245,255,0.431373);border-top-left-radius:5px;border-top-right-radius:5px;color:rgba(108,117,125,0.6);cursor:pointer;height:3.25rem;margin-right:.25rem;min-width:5rem;padding-left:1rem;padding-right:1rem;text-align:center;transition:all .3s ease-in-out}.tabs .tab:hover{background:rgba(108,117,125,0.12549)}.tabs .tab.focused{background:#f1f1f1;color:#a7a7a7}.tabs-map{display:flex;flex-direction:row;position:relative;z-index:99}.tabs-map h4{display:table-cell;font-family:'Univers for KPMG' !important;font-size:12px !important;font-weight:900;height:2rem;margin-bottom:0;margin-top:0;vertical-align:middle}.tabs-map .tab{background:rgba(254,245,255,0.431373);border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top-left-radius:5px;border-top-right-radius:5px;color:rgba(108,117,125,0.6);cursor:pointer;height:2rem;margin-right:.25rem;min-width:5rem;padding-left:1rem;padding-right:1rem;text-align:center;transition:all .3s ease-in-out}.tabs-map .tab:hover{background:rgba(108,117,125,0.12549)}.tabs-map .tab.focused{background:#f1f1f1;color:#a7a7a7}.tabs-map .tab.disabled{background:#f1f1f1;color:rgba(108,117,125,0.6)}.tabs-map sup{position:relative;top:-.5em;vertical-align:top}.TimeSeriesExplorer{align-self:center;width:30rem}.TimeSeriesExplorer.stickied{position:sticky !important;top:-6.5rem}.TimeSeriesExplorer .alert{margin-bottom:.5rem;margin-left:auto;margin-right:0;margin-top:.5rem;padding:.25rem;padding-left:.5rem;padding-right:.5rem;width:16rem}.TimeSeriesExplorer .alert>*{align-self:center}.TimeSeriesExplorer .alert svg{margin:0 !important;margin-right:.25rem !important;width:14px !important}.TimeSeriesExplorer .alert .alert-right{width:100%}.TimeSeries{align-self:center;width:100%}.TimeSeries .svg-parent{height:10rem;margin-bottom:1rem}.timeseries-header{align-self:center;margin-top:3rem;width:100%}.timeseries-header h1{color:#a7a7a7;margin:0;margin-bottom:2rem;text-align:center}.timeseries-header .scale-modes{align-items:flex-end;bottom:0;color:#a7a7a7;display:flex;flex-direction:row;margin-top:1rem;right:0;z-index:99}.timeseries-header .scale-modes label{color:rgba(108,117,125,0.6);font-family:'Univers for KPMG' !important;font-size:.75rem;font-weight:900;margin-right:.25rem;transition:all .2s ease-in-out;z-index:99}.timeseries-header .scale-modes:hover label.main{color:#a7a7a7}.timeseries-header .scale-modes>*{align-self:center}.timeseries-header .timeseries-mode,.timeseries-header .timeseries-logmode{display:flex;flex-direction:row;margin-left:1rem}.disabled input.switch{background:rgba(254,245,255,0.431373) !important;border:rgba(254,245,255,0.431373) 2px solid !important;cursor:not-allowed !important}.disabled input.switch::after{background:rgba(254,245,255,0.431373) !important}input.switch{appearance:none;background-color:#fff;border:2px solid #d9dadc;border-radius:10px;cursor:pointer;height:14px;margin:0;outline:none;position:relative;transition:all 300ms ease-in-out;width:24px}input.switch::after{background-color:rgba(108,117,125,0.6);border-radius:50%;content:'';height:10px;left:0;position:absolute;top:0;transition:all 300ms ease-in-out;width:10px}input.switch:checked{background-color:rgba(108,117,125,0.6);transition:all 300ms ease-in-out}input.switch:checked::after{background-color:#f8f9fa;left:10px;transition:all 300ms ease-in-out}.trends-state-name{display:flex;flex-direction:row;text-align:center}.trends-state-name select{appearance:none;background-color:#eee;background-image:linear-gradient(45deg, transparent 50%, gray 50%),linear-gradient(135deg, gray 50%, transparent 50%);background-position:calc(100% - 13px) 50%,calc(100% - 8px) 50%;background-repeat:no-repeat;background-size:5px 5px, 5px 5px;border:2px solid #e8e8e9;border-radius:4px;color:#a7a7a7;cursor:pointer;font-family:'Univers for KPMG' !important;font-weight:900;margin-left:-1px;margin-top:1rem;padding:.5rem;width:auto}.trends-state-name select:focus{outline:none}.TimeSeries,.Minigraph{display:flex;flex-direction:column;margin-top:1rem;width:100%}.TimeSeries .stats,.Minigraph .stats{border-radius:3px;display:flex;flex-direction:column;left:.5rem;padding:.25rem;pointer-events:none;position:absolute;top:.5rem}.TimeSeries .stats h2,.TimeSeries .stats h5,.TimeSeries .stats h6,.Minigraph .stats h2,.Minigraph .stats h5,.Minigraph .stats h6{color:rgba(255,7,58,0.6);margin:0;transition:all .15s ease-in-out}.TimeSeries .stats h5.title,.Minigraph .stats h5.title{color:#ff073a}.TimeSeries .stats h2,.TimeSeries .stats h6,.Minigraph .stats h2,.Minigraph .stats h6{color:#ff073a}.TimeSeries .stats .stats-bottom,.Minigraph .stats .stats-bottom{display:flex;flex-direction:row}.TimeSeries .stats .stats-bottom h6,.Minigraph .stats .stats-bottom h6{margin-bottom:.1rem;margin-left:.25rem}.TimeSeries .stats .stats-bottom>*,.Minigraph .stats .stats-bottom>*{margin-top:auto}.TimeSeries .stats.is-green h5,.Minigraph .stats.is-green h5{color:rgba(40,167,69,0.6)}.TimeSeries .stats.is-green h5.title,.Minigraph .stats.is-green h5.title{color:#28a745}.TimeSeries .stats.is-green h2,.TimeSeries .stats.is-green h6,.Minigraph .stats.is-green h2,.Minigraph .stats.is-green h6{color:#28a745}.TimeSeries .stats.is-gray h5,.Minigraph .stats.is-gray h5{color:rgba(108,117,125,0.6)}.TimeSeries .stats.is-gray h5.title,.Minigraph .stats.is-gray h5.title{color:#a7a7a7}.TimeSeries .stats.is-gray h2,.TimeSeries .stats.is-gray h6,.Minigraph .stats.is-gray h2,.Minigraph .stats.is-gray h6{color:#a7a7a7}.TimeSeries .stats.is-blue h5,.Minigraph .stats.is-blue h5{color:rgba(0,123,255,0.6)}.TimeSeries .stats.is-blue h5.title,.Minigraph .stats.is-blue h5.title{color:#007bff}.TimeSeries .stats.is-blue h2,.TimeSeries .stats.is-blue h6,.Minigraph .stats.is-blue h2,.Minigraph .stats.is-blue h6{color:#007bff}.TimeSeries .stats.is-purple h5,.Minigraph .stats.is-purple h5{color:rgba(32,26,162,0.6)}.TimeSeries .stats.is-purple h5.title,.Minigraph .stats.is-purple h5.title{color:rgba(32,26,162,0.866667)}.TimeSeries .stats.is-purple h2,.TimeSeries .stats.is-purple h6,.Minigraph .stats.is-purple h2,.Minigraph .stats.is-purple h6{color:rgba(32,26,162,0.866667)}.TimeSeries .stats.is-purple .tooltip-tested svg,.Minigraph .stats.is-purple .tooltip-tested svg{width:1em}.TimeSeries .svg-parent,.Minigraph .svg-parent{align-self:center;background:rgba(255,7,58,0.12549);border-radius:5px;display:flex;position:relative;width:30rem}.TimeSeries .svg-parent svg,.Minigraph .svg-parent svg{width:100%}.TimeSeries .svg-parent svg .domain,.TimeSeries .svg-parent svg .tick,.TimeSeries .svg-parent svg line,.Minigraph .svg-parent svg .domain,.Minigraph .svg-parent svg .tick,.Minigraph .svg-parent svg line{stroke:#ff073a;stroke-width:1.5}.TimeSeries .svg-parent svg text,.Minigraph .svg-parent svg text{color:rgba(255,7,58,0.6);font-family:'Univers for KPMG' !important;font-size:9px;font-weight:600;stroke:transparent}.TimeSeries .svg-parent.is-green,.Minigraph .svg-parent.is-green{background:rgba(40,167,69,0.12549)}.TimeSeries .svg-parent.is-green svg .domain,.TimeSeries .svg-parent.is-green svg .tick,.TimeSeries .svg-parent.is-green svg line,.Minigraph .svg-parent.is-green svg .domain,.Minigraph .svg-parent.is-green svg .tick,.Minigraph .svg-parent.is-green svg line{stroke:#28a745}.TimeSeries .svg-parent.is-green svg text,.Minigraph .svg-parent.is-green svg text{color:rgba(40,167,69,0.6);stroke:transparent}.TimeSeries .svg-parent.is-gray,.Minigraph .svg-parent.is-gray{background:rgba(254,245,255,0.431373)}.TimeSeries .svg-parent.is-gray svg .domain,.TimeSeries .svg-parent.is-gray svg .tick,.TimeSeries .svg-parent.is-gray svg line,.Minigraph .svg-parent.is-gray svg .domain,.Minigraph .svg-parent.is-gray svg .tick,.Minigraph .svg-parent.is-gray svg line{stroke:#a7a7a7}.TimeSeries .svg-parent.is-gray svg text,.Minigraph .svg-parent.is-gray svg text{color:rgba(108,117,125,0.6);stroke:transparent}.TimeSeries .svg-parent.is-blue,.Minigraph .svg-parent.is-blue{background:rgba(0,123,255,0.0627451)}.TimeSeries .svg-parent.is-blue svg .domain,.TimeSeries .svg-parent.is-blue svg .tick,.TimeSeries .svg-parent.is-blue svg line,.Minigraph .svg-parent.is-blue svg .domain,.Minigraph .svg-parent.is-blue svg .tick,.Minigraph .svg-parent.is-blue svg line{stroke:#007bff}.TimeSeries .svg-parent.is-blue svg text,.Minigraph .svg-parent.is-blue svg text{color:rgba(0,123,255,0.6);stroke:transparent}.TimeSeries .svg-parent.is-purple,.Minigraph .svg-parent.is-purple{background:rgba(32,26,162,0.12549)}.TimeSeries .svg-parent.is-purple svg .domain,.TimeSeries .svg-parent.is-purple svg .tick,.TimeSeries .svg-parent.is-purple svg line,.Minigraph .svg-parent.is-purple svg .domain,.Minigraph .svg-parent.is-purple svg .tick,.Minigraph .svg-parent.is-purple svg line{stroke:rgba(32,26,162,0.866667)}.TimeSeries .svg-parent.is-purple svg text,.Minigraph .svg-parent.is-purple svg text{color:rgba(32,26,162,0.6);stroke:transparent}.Minigraph{align-self:center;display:flex;flex-direction:row;justify-content:space-between;margin:0;margin-bottom:1rem;margin-top:1rem;width:30rem}.Minigraph .svg-parent{background:transparent !important;width:calc(25%)}.Minigraph .tooltip{position:fixed;right:0;top:0}.floating-buttons{bottom:1rem;display:flex;flex-direction:column;padding:0;position:fixed;right:1rem;width:3rem;z-index:1}.floating-buttons button{backdrop-filter:saturate(180%) blur(2px);background:rgba(255,193,7,0.6);border:0;border-radius:50%;color:#fd7e14;cursor:pointer;display:flex;flex-direction:row;margin:.25rem;outline:none;padding:.75rem;transition:all .2s ease-in-out}.floating-buttons button:hover{background:#ffa500}.floating-buttons button:hover svg{stroke:#ffa500}.floating-buttons button svg{align-self:center;stroke:#fd7e14}.Links{display:flex;flex-direction:column;justify-content:center}.link{align-self:center;margin-bottom:1rem;margin-top:1rem;width:30rem}.link a{background:rgba(0,123,255,0.0627451);color:#007bff;font-family:'Univers for KPMG' !important;font-weight:900;text-decoration:none;text-transform:uppercase;transition:background .2s ease-in-out;word-wrap:break-word}.link a:hover{background:rgba(0,123,255,0.188235)}.link h3{color:#343a40;font-weight:900;margin-bottom:0}footer{display:flex;flex-direction:column;justify-content:center;margin-bottom:5rem;margin-top:5rem}footer>*{align-self:center;text-align:center}footer h5{color:#a7a7a7;margin:0;margin-bottom:.5rem;margin-top:1rem}footer img{height:2rem;width:2rem}.Summary{display:flex;flex-direction:column;height:600px;padding-left:1rem;padding-right:1rem;position:relative;width:600px}.Summary img{height:2rem;width:2rem}.Summary .link{margin:0}.Summary .header h1{margin-top:-1rem}.Summary h5{color:#a7a7a7;margin:0}.Summary .Minigraph{align-self:center;margin-bottom:-3.25rem}.Summary .summary-bottom{align-self:center;display:flex;flex-direction:row;justify-content:space-between;width:calc(100% - 0)}.Summary .summary-bottom .link{margin-right:-.75rem;width:12rem}.Summary .summary-bottom>*{align-self:center}.Summary .summary-bottom img{margin-bottom:.25rem;margin-left:1rem;margin-right:.25rem}.Summary .summary-bottom h5{width:15rem}.Summary .summary-bottom-left{display:flex;flex-direction:row;justify-content:space-around}.Summary .summary-bottom-left>*{align-self:center}.FAQ{display:flex;flex-direction:column;min-height:30rem;width:100%}.FAQ>*{align-self:center;margin-bottom:1.5rem;width:30rem}.FAQ>*:first-child{margin-top:2rem}.FAQ h2{font-weight:600;margin:0;text-transform:none}.FAQ .question{color:#343a40;margin:0;margin-bottom:.25rem}.FAQ .answer{color:#007bff;line-height:1.5rem}.FAQ a{background:rgba(0,123,255,0.0627451);color:#007bff;text-decoration:none}.FAQ a:hover{text-decoration:underline}.PatientsDB{align-self:center;display:flex;flex-direction:column;margin-left:auto;margin-right:auto}.PatientsDB .select{display:flex;flex-direction:row;text-align:center}.PatientsDB .select .react-date-picker{align-items:center;background-color:#eee;border:2px solid #e8e8e9 !important;border-radius:4px;color:#6c757d;cursor:default;font-family:'Univers for KPMG' !important;font-size:12px;font-weight:900;height:2.19rem;margin:.2rem .1rem;padding:.5rem;padding-inline-start:1px;width:auto}.PatientsDB .select .react-date-picker input:focus,.PatientsDB .select .react-date-picker button:focus{outline:none}.PatientsDB .select .react-date-picker,.PatientsDB .select .react-date-picker *,.PatientsDB .select .react-date-picker *::before,.PatientsDB .select .react-date-picker *::after{border:0}.PatientsDB .select .react-calendar{background:#00338D;border:2px solid rgba(254,245,255,0.431373);border-radius:5px}.PatientsDB .select .react-calendar button{border-radius:5px;font-family:'Univers for KPMG' !important;padding:1rem;transition:all .1s ease-in-out}.PatientsDB .select .react-calendar button:disabled{border-radius:0 !important;color:rgba(108,117,125,0.6);cursor:not-allowed}.PatientsDB .select .react-date-picker__inputGroup__input:invalid{background:transparent}.PatientsDB .select .react-date-picker__wrapper{border:unset}.PatientsDB .select .react-date-picker__wrapper svg{stroke:rgba(108,117,125,0.6)}.PatientsDB .select .react-date-picker__wrapper svg:hover{stroke:#a7a7a7}.PatientsDB .select .react-calendar__tile--active{background:rgba(76,117,242,0.0627451);color:#4c75f2 !important}.PatientsDB .select .react-calendar__tile--active:hover{background:rgba(76,117,242,0.188235);color:#4c75f2 !important}.PatientsDB .select .react-calendar__month-view__weekdays__weekday{font-family:'Univers for KPMG' !important;margin-bottom:.5rem}.PatientsDB .select .react-calendar__month-view__days__day--weekend,.PatientsDB .select .react-calendar__month-view__days__day{color:#a7a7a7}.PatientsDB .select .react-date-picker__calendar{top:3.5rem !important}.PatientsDB .select .react-calendar__navigation__label{color:#a7a7a7 !important}.PatientsDB .select .react-calendar__navigation__arrow{color:#a7a7a7}.PatientsDB .select .react-date-picker__inputGroup>*{color:#a7a7a7 !important}.PatientsDB .select .react-date-picker__clear-button{margin:0 !important;padding:0 !important}.PatientsDB .select .react-date-picker__clear-button svg{stroke-width:3px;width:16px}.PatientsDB .select .react-date-picker__calendar-button{margin:0 !important;margin-left:.25rem !important;padding:0 !important}.PatientsDB .select .react-date-picker__calendar-button svg{height:16px;stroke-width:3px;width:16px}.PatientsDB .select select{appearance:none;background-color:#eee;background-image:linear-gradient(45deg, transparent 50%, gray 50%),linear-gradient(135deg, gray 50%, transparent 50%);background-position:calc(100% - 13px) 50%,calc(100% - 8px) 50%;background-repeat:no-repeat;background-size:5px 5px, 5px 5px;border:2px solid #e8e8e9;border-radius:4px;color:#a7a7a7;cursor:pointer;font-family:'Univers for KPMG' !important;font-weight:900;margin:.2rem .1rem;padding:.5rem;width:130px}.PatientsDB .select select:focus{outline:none}.PatientsDB .reminder{align-self:center !important;background:rgba(76,117,242,0.0627451);border-radius:5px;color:#4c75f2;font-family:'Univers for KPMG' !important;font-size:.9rem;font-weight:600;line-height:23px;margin-bottom:3rem;margin-top:3rem;padding-left:1rem;padding-right:1rem;padding-top:1rem;text-align:center;width:30rem}.PatientsDB .reminder svg{cursor:pointer;padding:.5rem;position:absolute;right:0;stroke:rgba(76,117,242,0.6);stroke-width:3px;top:-.25rem;width:16px}.PatientsDB .reminder svg:hover{stroke:#4c75f2}.PatientsDB .header{align-self:center;display:flex;flex-direction:row;justify-content:space-between;margin-top:1.75rem;width:calc(100% - 10rem)}.PatientsDB .header h1{color:#4c75f2}.PatientsDB .header h3{color:rgba(76,117,242,0.6);font-weight:900;margin-top:0}.PatientsDB .header h6.disclaimer{color:rgba(108,117,125,0.6);margin-bottom:1rem;text-align:right;width:10rem}.PatientsDB .header .deep-dive{align-self:flex-start;display:flex;flex-direction:row}.PatientsDB .header .deep-dive h5{color:#a7a7a7;margin:0;margin-right:1rem}.PatientsDB .patientdb-wrapper{display:flex;flex-direction:row;justify-content:center;padding-left:5rem;padding-right:5rem}.PatientsDB .patientdb-wrapper .no-result{align-self:center;display:flex;flex-direction:column;height:20rem;justify-content:center}.PatientsDB .patientdb-wrapper .no-result h5{color:#a7a7a7;font-weight:600;text-align:center}.PatientsDB .patientdb-wrapper .no-result h5 span{color:#4c75f2 !important;font-weight:900}.PatientsDB .legend{z-index:unset}.Patients{align-self:center;display:flex;flex-direction:column;flex-wrap:wrap;width:100%}.Patients>*{align-self:center}.Patients h5.daylabel{color:#4c75f2}.Patients .day{display:flex;flex-direction:row;flex-wrap:wrap}.Patients .patient-card{background:rgba(254,245,255,0.431373);border-radius:5px;cursor:pointer;display:flex;flex-direction:row;height:3.25rem;justify-content:center;margin:.25rem;transition:background .3s ease-in-out;width:3.25rem}.Patients .patient-card>*{align-self:center}.Patients .patient-card:hover{background:rgba(108,117,125,0.12549)}.Patients .patient-card h3{color:rgba(108,117,125,0.6);font-size:11px !important;font-weight:900}.Patients .patient-card.is-small{background:rgba(108,117,125,0.12549);height:1rem;width:1rem}.Patients .patient-card.is-small:hover{background:rgba(108,117,125,0.6)}.Patients .patient-card.is-small.is-femme{background:#fb5581}.Patients .patient-card.is-small.is-male{background:#4c75f2}.Patients .patient-card.is-small.is-local{background:#ff073a}.Patients .patient-card.is-small.is-imported{background:rgba(32,26,162,0.866667)}.Patients .patient-card.is-femme{background:rgba(251,85,129,0.6)}.Patients .patient-card.is-femme h3{color:#fb5581}.Patients .patient-card.is-femme:hover{background:rgba(255,168,203,0.376471)}.Patients .patient-card.is-male{background:rgba(76,117,242,0.0627451)}.Patients .patient-card.is-male h3{color:#4c75f2}.Patients .patient-card.is-male:hover{background:rgba(76,117,242,0.188235)}.Patients .patient-card.is-local{background:rgba(255,7,58,0.12549)}.Patients .patient-card.is-local h3{color:#ff073a}.Patients .patient-card.is-local:hover{background:rgba(255,7,58,0.188235)}.Patients .patient-card.is-imported{background:rgba(32,26,162,0.12549)}.Patients .patient-card.is-imported h3{color:rgba(32,26,162,0.866667)}.Patients .patient-card.is-imported:hover{background:rgba(32,26,162,0.188235)}.Patients .patient-card.is-in{background-size:cover !important}.Patients .patient-card.is-in h3{color:transparent}.Patients .patient-card.is-in:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-in:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-uk{background:url(\"/flags/uk.png\");background-size:cover !important}.Patients .patient-card.is-uk h3{color:transparent}.Patients .patient-card.is-uk:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-uk:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-us{background:url(\"/flags/usa.png\");background-size:cover !important}.Patients .patient-card.is-us h3{color:transparent}.Patients .patient-card.is-us:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-us:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-th{background:url(\"/flags/thailand.png\");background-size:cover !important}.Patients .patient-card.is-th h3{color:transparent}.Patients .patient-card.is-th:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-th:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-ph{background:url(\"/flags/philippines.png\");background-size:cover !important}.Patients .patient-card.is-ph h3{color:transparent}.Patients .patient-card.is-ph:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-ph:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-it{background:url(\"/flags/italy.png\");background-size:cover !important}.Patients .patient-card.is-it h3{color:transparent}.Patients .patient-card.is-it:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-it:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-ca{background:url(\"/flags/canada.png\");background-size:cover !important}.Patients .patient-card.is-ca h3{color:transparent}.Patients .patient-card.is-ca:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-ca:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-id{background:url(\"/flags/indonesia.png\");background-size:cover !important}.Patients .patient-card.is-id h3{color:transparent}.Patients .patient-card.is-id:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-id:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.is-mm{background:url(\"/flags/myanmar.png\");background-size:cover !important}.Patients .patient-card.is-mm h3{color:transparent}.Patients .patient-card.is-mm:hover{background:rgba(254,245,255,0.431373)}.Patients .patient-card.is-mm:hover h3{color:rgba(108,117,125,0.6)}.Patients .patient-card.age1-9{background:#006400}.Patients .patient-card.age10-19{background:#00008b}.Patients .patient-card.age20-29{background:#b03060}.Patients .patient-card.age30-39{background:#ff4500}.Patients .patient-card.age40-49{background:#ff0}.Patients .patient-card.age50-59{background:#deb887}.Patients .patient-card.age60-69{background:#0f0}.Patients .patient-card.age70-79{background:#0ff}.Patients .patient-card.age80-89{background:#f0f}.Patients .patient-card.age90-99{background:#6495ed}.DownloadBlock{align-self:center;margin-top:7rem}.DownloadBlock code{color:rgba(253,126,20,0.6);font-family:'Univers for KPMG' !important}.DownloadBlock a{color:rgba(253,126,20,0.6);display:flex;flex-direction:row;justify-content:center;text-decoration:none !important}.DownloadBlock .button{background:rgba(253,126,20,0.12549);display:flex;flex-direction:row;justify-content:center;text-align:center}.DownloadBlock .button>*{align-self:center !important}.DownloadBlock .button:hover{background:rgba(253,126,20,0.188235)}.DownloadBlock svg{stroke:rgba(253,126,20,0.6);stroke-width:3}.modal{background:rgba(76,117,242,0.6);cursor:pointer;display:flex;flex-direction:row;height:100vh;justify-content:center;left:0;position:fixed;top:0;width:100vw;z-index:9999}.modal .modal-content{align-self:center;background:#fff;border-radius:5px;cursor:default;height:30rem;overflow-y:auto;padding:1rem;position:fixed;width:30rem}.modal .modal-content svg{stroke:rgba(76,117,242,0.6);stroke-width:3;transition:all .1s ease-in-out;width:20px}.modal .modal-content svg:hover{stroke:#4c75f2}.modal .modal-content .close-button{cursor:pointer;position:absolute;right:1rem}.modal .modal-content h1{color:#4c75f2}.modal .modal-content h5,.modal .modal-content h3{font-weight:900;margin:0}.modal .modal-content h3{color:#4c75f2;margin-bottom:.5rem}.modal .modal-content h5{color:rgba(76,117,242,0.6)}.modal .modal-content .meta{display:flex;flex-direction:column;flex-wrap:wrap;height:10rem}.modal .modal-content .meta>*{width:10rem}.modal .modal-content .meta h3.contracted-from{cursor:pointer;text-decoration:underline;text-decoration-style:dotted;transition:all .1s ease-in-out;width:2rem}.modal .modal-content .meta h3.contracted-from:hover{background:rgba(76,117,242,0.0627451)}.modal .modal-content .modal-top{display:flex;flex-direction:row}.modal .modal-content .modal-top>{align-self:center}.modal .modal-content .notes{margin-bottom:2rem;margin-top:2rem;width:10rem}.modal .modal-content .link{margin:0;margin-bottom:.5rem;margin-top:.25rem}.modal .modal-content .link a{background:rgba(76,117,242,0.0627451);color:#4c75f2;transition:background .2s ease-in-out}.modal .modal-content .link a:hover{background:rgba(76,117,242,0.188235)}.patients-summary{align-self:center;width:30rem}.patients-summary .Patients{min-height:5rem}.patients-summary h1{color:#343a40;margin-bottom:.25rem}.patients-summary h6{color:#a7a7a7;font-weight:600;margin:0;margin-top:0}.patients-summary .summary{flex-direction:row-reverse;flex-wrap:wrap-reverse}.patients-summary .patients-summary-wrapper{display:flex;flex-direction:row;justify-content:center}.patients-summary .patients-summary-wrapper>*{align-self:center}.patients-summary .button{background:rgba(76,117,242,0.0627451);color:#4c75f2;display:flex;flex-direction:row;height:3rem;margin-top:1rem}.patients-summary .button>*{align-self:center}.patients-summary .button:hover{background:rgba(76,117,242,0.188235)}.patients-summary a{color:inherit;display:flex;flex-direction:row;text-decoration:none}.patients-summary a>*{align-self:center}.patients-summary .daylabel{align-self:flex-start}.patients-summary .link a{display:inline !important;padding-bottom:0}.patients-summary .legend{justify-content:flex-start;padding:1rem;padding-bottom:.25rem;padding-left:0}.select{display:flex;flex-direction:column}.select label{color:rgba(108,117,125,0.6);font-size:.75rem;font-weight:900;margin-bottom:.25rem;text-transform:uppercase}.filters{background:#fff !important;box-shadow:0 2px 6px 0 rgba(0,0,0,0.12),inset 0 -1px 0 0 #dadce0;display:flex;flex-direction:row;flex-wrap:wrap;font-family:archia;justify-content:space-between;padding:.5rem;position:sticky;top:0;z-index:101}.filters>*{align-self:center}.filters .filters-left{display:flex;flex-direction:row}.pills{display:flex;flex-direction:row;justify-content:flex-end}.pills>button{background-color:#6d207787;border:2px #6d207787 solid;border-bottom:0;border-top:0;color:white;cursor:pointer;font-family:'Univers for KPMG' !important;margin:0;outline:none;padding:10px 15px;text-align:center;transition:background .25s ease-in-out}.pills>button:hover{background:#6d2077b0}.pills>button.selected{background-color:#6D2077}.pills>button:focus:not(:focus-visible){outline:none}.pills>button:first-of-type{border:0;border-bottom-left-radius:5px;border-top-left-radius:5px}.pills>button:last-of-type{border:0;border-bottom-right-radius:5px;border-top-right-radius:5px}.legend{background:#fff;display:flex;flex-wrap:wrap;font-family:archia;justify-content:center;z-index:101}.legend>*{align-self:center}.legend .legend-left{display:flex;flex-direction:row}.legend select{margin-left:1rem}.legend h5{color:#a7a7a7;margin:0;margin-right:.5rem}.legend h5.is-female{color:#fb5581}.legend h5.is-male{color:#4c75f2}.legend h5.is-local{color:#ff073a}.legend h5.is-imported{color:rgba(32,26,162,0.866667)}.legend .circle{background:rgba(108,117,125,0.6);border-radius:50%;height:.8rem;margin-right:.25rem;width:.8rem}.legend .circle.is-female{background:#fb5581}.legend .circle.is-male{background:#4c75f2}.legend .circle.is-local{background:#ff073a}.legend .circle.is-imported{background:rgba(32,26,162,0.866667)}.legend .circle.is-in{background:url(\"/flags/india.png\");background-size:cover !important}.legend .circle.is-uk{background:url(\"/flags/uk.png\");background-size:cover !important}.legend .circle.is-us{background:url(\"/flags/usa.png\");background-size:cover !important}.legend .circle.is-th{background:url(\"/flags/thailand.png\");background-size:cover !important}.legend .circle.is-ph{background:url(\"/flags/philippines.png\");background-size:cover !important}.legend .circle.is-it{background:url(\"/flags/italy.png\");background-size:cover !important}.legend .circle.is-ca{background:url(\"/flags/canada.png\");background-size:cover !important}.legend .circle.is-id{background:url(\"/flags/indonesia.png\");background-size:cover !important}.legend .circle.is-mm{background:url(\"/flags/myanmar.png\");background-size:cover !important}.updates-header{align-self:center;color:#343a40;width:30rem}.updates-header h2{color:#4c75f2;font-weight:900}.updates{align-self:center;display:flex;flex-direction:column;margin-bottom:1rem;min-height:22rem !important;width:100%}.updates .update{background:rgba(254,245,255,0.431373);border-radius:5px;margin-bottom:.5rem;padding:.75rem;transition:all .2s ease-in-out}.updates .update:hover{background:rgba(108,117,125,0.12549)}.updates .update h5,.updates .update h4{margin:0}.updates .update h5{color:rgba(108,117,125,0.6);margin-bottom:.15rem}.updates .update h4{color:#a7a7a7;font-weight:600}.updates .button{background:rgba(76,117,242,0.0627451);color:#4c75f2;display:flex;flex-direction:row;height:3rem;width:13rem}.updates .button>*{align-self:center}.updates .button:hover{background:rgba(76,117,242,0.188235)}.updates a{color:inherit;display:flex;flex-direction:row;text-decoration:none}.updates a>*{align-self:center}.DeltaBarGraph svg{width:100%}.DeltaBarGraph svg text{color:#dc3545;font-family:'Univers for KPMG' !important}.DeltaBarGraph svg .delta{fill:#dc3545;font-weight:900}.DeltaBarGraph svg .percent{fill:#dc354590}.district-bar{align-self:center;flex-direction:row;justify-content:space-between}.district-bar h2{color:#dc3545;font-weight:900;margin-bottom:.5rem}.district-bar .district-bar-left{display:flex;flex-direction:column;margin-right:1rem}.district-bar .district-bar-left .button{background:rgba(254,245,255,0.431373);color:#a7a7a7;font-weight:600;height:2.5rem;justify-content:center;margin-top:.75rem;text-transform:unset;width:5rem}.district-bar .district-bar-left .button:hover{background:rgba(108,117,125,0.12549)}.district-bar .districts{display:flex;flex-direction:column;flex-wrap:wrap;width:100%}.district-bar .districts.is-grid{display:grid;grid-auto-flow:column;grid-gap:.5rem;padding-bottom:.5rem}.district-bar .districts .district{display:flex;flex-direction:row;font-family:'Univers for KPMG' !important;height:2.5rem;justify-content:flex-start;margin-right:1rem}.district-bar .districts .district h2,.district-bar .districts .district h5{color:#a7a7a7;font-weight:600;margin:0}.district-bar .districts .district h5{display:inline-block !important;flex:0 1;margin-left:.5rem;margin-top:.15rem;width:auto !important}.district-bar .districts .district>*{align-self:center}.district-bar .districts .district .delta{display:flex;flex-direction:row;margin-left:.5rem;margin-top:4px}.district-bar .districts .district .delta h6{color:rgba(220,53,69,0.6);margin:0}.district-bar .districts .district .delta svg{color:rgba(220,53,69,0.6);stroke-width:4;vertical-align:bottom;width:10px}.district-bar .districts .district .delta>*{align-self:center}.Clusters{align-self:center;width:100%}.Clusters h1{color:#dc3545;margin-bottom:0;padding-left:1.5rem;width:100%}.Clusters canvas{touch-action:auto !important}.cards-container{margin-left:5rem;padding:2rem}.cards-container .cards{display:flex;flex-wrap:wrap;justify-content:space-between}.cards-container .cards .card{flex:0 1 calc(33% - 1em);height:30rem;margin-bottom:2em}.cards-container .cards .card .charts-header{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:flex-start}.cards-container .cards .card .charts-header .chart-title{color:#6c757d;font-family:'Univers for KPMG' !important;font-size:1.5rem !important;font-weight:900;padding:20px 0;text-transform:uppercase}.cards-container .cards .card .charts-header .chart-content{height:100%;width:100%}.cards-container .cards .card .charts-header .chart-note{color:#a7a7a7;font-family:'Univers for KPMG' !important;font-size:.8rem;height:50px;margin-top:5px}@media (max-width: 769px){.cards-container{margin-left:unset;padding:1rem}}@media (min-width: 769px){.Home,.State{padding-top:5rem}.Navbar{background:#00338D;flex-direction:column;height:100%;justify-content:flex-start;min-width:5rem;position:fixed;z-index:99999}.Navbar .navbar-left{margin-top:auto;order:3;padding-left:0;padding-right:0;text-align:center;transition:all .2s ease-in-out;width:5rem}.Navbar .navbar-left:hover{background:rgba(108,117,125,0.12549)}.Navbar .navbar-middle{font-size:2px;order:1;padding-bottom:1rem;padding-top:1rem}.Navbar .navbar-right{background:#00338D;display:flex;flex-direction:column;order:2;padding-bottom:0;padding-top:0}.Navbar .navbar-right:hover{background:#00338D !important}.Navbar .navbar-right>span{display:flex;flex-direction:row;height:1.5rem;justify-content:center;margin-bottom:1.5rem;margin-top:1.5rem}.Navbar .navbar-right>span svg{stroke:#a7a7a7}.Navbar .expand{background:#00338D;border-right:solid 2px #00338D;flex-direction:column;padding-left:0;padding-top:5.5rem;top:0;width:15rem;z-index:-1 !important}.Navbar .expand>*{border:0;border-left:1px solid rgba(254,245,255,0.431373);color:#a7a7a7;font-weight:600;height:1.5rem;width:12rem}.PatientsDB{margin-left:5rem}.dark-mode .Navbar,.dark-mode .expand{background:#1e1e30 !important}.dark-mode .navbar-right{background:#1e1e30 !important}}@media (max-width: 769px){table,.header,.Level,.TimeSeriesExplorer,.Links,.Minigraph,.Summary,.FAQ,.MapExplorer,.filters,.updates,.map-switcher,.updates-header,.StateMeta{width:calc(100% - 2rem)}.Home,.State{display:flex;flex-direction:column;margin-left:0;margin-right:0;width:100%}.Home .home-left,.Home .home-right,.Home .state-left,.Home .state-right,.State .home-left,.State .home-right,.State .state-left,.State .state-right{display:flex;flex-direction:column;margin:0;width:100%}.MapExplorer .svg-parent{width:100%}.MapExplorer .header{margin-top:2rem}.link,.faq{width:calc(100% - 2rem)}.TimeSeries .svg-parent{width:100%}.Minigraph .svg-parent{padding:0}.map-stats .stats .timestamp{width:4.5rem}.last-update{width:10rem}a.button{display:flex;flex:row;justify-content:center;width:10rem}a.button>*{align-self:center}a.button svg{width:38px}.Banner{height:7rem}.Banner .snippet{margin-left:1rem;margin-right:1rem;width:100%}table td{max-width:6.75rem}.cards-container{padding:.5rem}.cards-container .cards .card{flex:0 1 100%;height:25rem;margin-bottom:0}.cards-container .cards .chart-title{padding:20px 0 10px}.cards-container .cards .card-big{height:30rem}.PatientsDB{width:100%}.PatientsDB .select .react-date-picker__calendar{position:fixed;top:2.3rem !important}.PatientsDB .header{margin:0;padding-left:1rem;padding-right:1rem;width:calc(100% - 2rem)}.PatientsDB .reminder{padding-bottom:1rem;padding-top:1rem;width:calc(100% - 4rem)}.PatientsDB .Patients{width:calc(100% - 2rem)}.PatientsDB .modal .modal-content{width:calc(100% - 5rem)}.PatientsDB .modal .modal-content .meta{height:20rem}.PatientsDB .filters-left{flex-wrap:wrap;justify-content:space-between}.PatientsDB .filters{height:auto;justify-content:center;padding:.5rem}.table-fineprint{margin-right:1.25rem}.patients-summary{width:calc(100% - 2rem)}.patients-summary .modal .modal-content{width:calc(100% - 5rem)}.patients-summary .modal .modal-content .meta{height:20rem}.patientdb-wrapper{padding-left:1rem !important;padding-right:1rem !important}.patientdb-wrapper .Patients{width:100%}.patientdb-wrapper .day{justify-content:center;width:100%}.nationality{margin-bottom:.5rem}.Resources{margin:1rem}.Resources table{align-self:center;border-collapse:separate;border-spacing:3px 2px;font-family:'Univers for KPMG' !important;position:relative;text-transform:none;width:40rem}.Resources table thead{background:rgba(32,26,162,0.12549);color:#343a40;font-size:.7rem;text-align:center}.Resources table thead th{border-radius:5px;cursor:pointer;padding:.5rem;transition:all .1s ease-in-out;z-index:99}.Resources table thead th.sticky{background:#f1f1f1;top:4px}.Resources table thead th:hover{background:#ecedee}.Resources table thead th .heading-content{align-items:center;display:flex;flex-direction:row;height:.9rem;justify-content:space-between;position:relative}.Resources table thead th .heading-content abbr{text-align:right}.Resources table thead th .heading-content svg{color:rgba(108,117,125,0.6);margin:0;margin-left:.25rem;margin-top:.15rem;right:0;stroke-width:4px;width:10px}.Resources table tbody{color:#a7a7a7;max-width:10rem}.Resources table tbody tr{transition:background .1s ease-in-out}.Resources table tbody tr:hover{background:rgba(108,117,125,0.12549) !important}.Resources table tbody tr.divider{background:#6c757d10 !important;height:.5rem}.Resources table tbody tr.spacer{background:#fff !important;height:.5rem}.Resources table tbody tr:nth-child(even){background-color:rgba(32,26,162,0.12549)}.Resources table tbody td{border-radius:5px;font-size:.6rem;text-align:left}.Resources table tbody td:first-child{max-width:7.5rem;text-align:left;word-wrap:break-word}.Resources table tbody td .deltas{font-size:11px !important;margin-right:.25rem}.Resources table tbody td .deltas svg{height:9px;stroke-width:3;vertical-align:-.25px;width:9px}.Resources table tbody .state-last-update{background:transparent}.Resources table tbody .state-last-update:hover{background:#fff !important}.Resources table tbody .state-last-update td .last-update{align-items:baseline;display:flex;flex-direction:row;text-align:left;width:100%}.Resources table tbody .district-heading{background:rgba(254,245,255,0.431373)}.Resources table tbody .district-heading td{background:rgba(254,245,255,0.431373);color:#343a40;font-size:.75rem;font-weight:900;padding:.45rem}.Resources table tbody .district-heading td .heading-content{align-items:center;display:flex;flex-direction:row;height:.9rem;justify-content:space-between;position:relative}.Resources table tbody .district-heading td .heading-content abbr{text-align:right}.Resources table tbody .district-heading td .heading-content svg{color:rgba(108,117,125,0.6);margin:0;margin-left:.25rem;margin-top:.15rem;right:0;stroke-width:4px;width:10px}.Resources table .affected-count{color:rgba(108,117,125,0.6);margin:0;position:absolute;right:0;top:-1rem}.Resources table .is-total td{background:rgba(108,117,125,0.12549)}.Resources table .dropdown{background:rgba(254,245,255,0.431373);border-radius:50%;cursor:pointer;height:13px;left:-.75rem;margin-top:.5rem;position:absolute;transition:background .2s ease-in-out;width:13px}.Resources table .dropdown:hover{background:rgba(108,117,125,0.12549)}.Resources table .dropdown svg{left:1px;position:absolute;stroke-width:3;top:-.35rem;width:11px}.resourcefilters{align-items:center;display:flex;flex-direction:column;justify-content:center}.resourcefilter{margin-bottom:.4rem}.filtersection{animation-duration:1s;animation-name:fadeInUp;animation-timing-function:ease-in;display:flex;flex-direction:column;margin-bottom:.1rem;width:100%}.filtersection .filtertitle{align-self:center;color:#ff073a;text-align:center}.pagination{align-items:center;display:flex;flex-direction:column;justify-content:center}.pagination .select{margin-right:0;margin-top:.4rem}.pagination input{margin:.1rem}.pagination h5{margin-bottom:.1rem;margin-top:0}.Navbar .expand{height:calc(100vh - 3.9rem);overflow:auto;transform:none !important}.Navbar .navbar-right>span{display:none}.Navbar .navbar-right>span:first-child{display:initial}.Search .result-name{max-width:10rem !important}.State .district-bar,.State .to-essentials,.State .Clusters{width:calc(100% - 3rem)}.State .district-bar h1,.State .to-essentials h1,.State .Clusters h1{padding-left:0}.StateMeta{display:grid;grid-gap:1rem;grid-template-rows:repeat(auto-fit, minmax(5rem));margin-bottom:1rem}.StateMeta .meta-item{min-width:1rem}}.dark-mode{background:#161625 !important;color:#bdbdbd;transition:background-color .2s ease-out !important}.dark-mode .switch-wrapper>div{background:#161625 !important}.dark-mode .expand{background:#1e1e30 !important}.dark-mode .Navbar,.dark-mode .expand{border-right:0}.dark-mode .Navbar .navbar-middle,.dark-mode .expand .navbar-middle{color:#bdbdbd}.dark-mode .Navbar .navbar-right,.dark-mode .expand .navbar-right{background:#1e1e30 !important}.dark-mode table th{background:#1e1e30 !important}.dark-mode table .is-odd{background:#1e1e30 !important}.dark-mode table .state-page-link{background:#161625 !important}.dark-mode table .heading-content{color:#bdbdbd !important}.dark-mode table .spacer{background:#161625 !important}.dark-mode .Search input{background:#1e1e30 !important}.dark-mode .State .header-right h5{color:#9673b9bb !important}.dark-mode .State .header-right h2{color:#9673b9 !important}.dark-mode .State .header-right a{background:#40008050 !important}.dark-mode .State .breadcrumb ul{background:#1e1e30 !important}.dark-mode .State .breadcrumb ul::after{border-bottom-color:#1e1e30 !important}.dark-mode .State .breadcrumb ul li a{color:#a7a7a7 !important}.dark-mode .State .breadcrumb ul li a:hover{color:#fff !important}.dark-mode .MapExplorer #chart,.dark-mode .MapExplorer #legend{filter:invert(1) hue-rotate(180deg) saturate(1.5) url(\"#balance-color\")}.dark-mode .MapExplorer .legend{background:#161625 !important}.dark-mode .MapExplorer .stats.is-purple{background:#40008050 !important}.dark-mode .MapExplorer .stats.is-purple h1{color:#9673b9 !important}.dark-mode .MapExplorer .stats.is-purple h5,.dark-mode .MapExplorer .stats.is-purple h6{color:#9673b9bb !important}.dark-mode .MapExplorer .stats.is-purple svg{stroke:#9673b9bb !important}.dark-mode .MapExplorer .stats.is-purple svg:hover{stroke:#9673b9 !important}.dark-mode .MapExplorer .disclaimer{color:#00338D}.dark-mode .TimeSeries .stats.is-purple h5,.dark-mode .Minigraph .stats.is-purple h5{color:#9673b9bb !important}.dark-mode .TimeSeries .stats.is-purple h5.title,.dark-mode .Minigraph .stats.is-purple h5.title{color:#9673b9 !important}.dark-mode .TimeSeries .stats.is-purple h2,.dark-mode .TimeSeries .stats.is-purple h6,.dark-mode .Minigraph .stats.is-purple h2,.dark-mode .Minigraph .stats.is-purple h6{color:#9673b9 !important}.dark-mode .TimeSeries .svg-parent.is-purple,.dark-mode .Minigraph .svg-parent.is-purple{background:#40008050 !important}.dark-mode .TimeSeries .svg-parent.is-purple svg .dot,.dark-mode .TimeSeries .svg-parent.is-purple svg .focus,.dark-mode .TimeSeries .svg-parent.is-purple svg .domain,.dark-mode .TimeSeries .svg-parent.is-purple svg .tick,.dark-mode .Minigraph .svg-parent.is-purple svg .dot,.dark-mode .Minigraph .svg-parent.is-purple svg .focus,.dark-mode .Minigraph .svg-parent.is-purple svg .domain,.dark-mode .Minigraph .svg-parent.is-purple svg .tick{stroke:#9673b9 !important}.dark-mode .TimeSeries .svg-parent.is-purple svg .dot,.dark-mode .TimeSeries .svg-parent.is-purple svg .focus,.dark-mode .Minigraph .svg-parent.is-purple svg .dot,.dark-mode .Minigraph .svg-parent.is-purple svg .focus{fill:#9673b9 !important}.dark-mode .TimeSeries .svg-parent.is-purple svg .trend,.dark-mode .TimeSeries .svg-parent.is-purple svg line,.dark-mode .Minigraph .svg-parent.is-purple svg .trend,.dark-mode .Minigraph .svg-parent.is-purple svg line{stroke:#9673b999 !important}.dark-mode .TimeSeries .svg-parent.is-purple svg text,.dark-mode .Minigraph .svg-parent.is-purple svg text{color:#9673b9bb !important;stroke:transparent}.dark-mode .tpm{background:#40008050 !important}.dark-mode .tpm h3,.dark-mode .tpm h5,.dark-mode .tpm svg,.dark-mode .tpm p{color:#9673b9bb !important}.dark-mode .tpm h1{color:#9673b9 !important}.dark-mode .tab.focused{background:#1e1e30 !important;color:#bdbdbd !important}.dark-mode .pills button.selected{background:#ffc10750}.dark-mode .trends-state-name select,.dark-mode .select select{background:#1e1e30;background-image:linear-gradient(45deg, transparent 50%, #a7a7a7 50%),linear-gradient(135deg, #a7a7a7 50%, transparent 50%);background-position:calc(100% - 13px) 50%,calc(100% - 8px) 50%;background-repeat:no-repeat;background-size:5px 5px, 5px 5px;border-color:#9494941a}.dark-mode input.switch{background-color:#161625 !important;border:2px solid rgba(108,117,125,0.6) !important}.dark-mode input.switch:checked{background-color:#6c757d99 !important}.dark-mode input.switch:checked::after{background-color:#cfcfcf !important}.dark-mode input.switch::after{background-color:#cfcfcf !important}.dark-mode .disabled input.switch{background:#343a40 !important;border:rgba(254,245,255,0.431373) 2px solid !important;opacity:.7}.dark-mode .disabled input.switch::after{background:#a7a7a7 !important}.dark-mode .button.github{color:#bdbdbd !important}.dark-mode .button.github svg{stroke:#bdbdbd !important}.dark-mode .FAQ .question{color:#a7a7a7 !important}.dark-mode .Resources .filtersection .disclaimercontainer .mobile-disclaimer-button{background-color:#e1e1e1;color:#808080}.dark-mode .Resources .filtersection .disclaimercontainer .disclaimer-button{background:none;color:#bdb8ae}.dark-mode .Resources .filtersection .disclaimercontainer .MuiSvgIcon-root{fill:#e1e1e1}.dark-mode .Resources .filtersection .resourcefilters .MuiFormLabel-root{color:rgba(232,230,227,0.54)}.dark-mode .Resources .filtersection .resourcefilters .MuiInputBase-root{color:rgba(232,230,227,0.87)}.dark-mode .Resources .filtersection .resourcefilters .MuiSelect-icon{color:#e1e1e1}.dark-mode .Resources .filtersection .resourcefilters .MuiOutlinedInput-notchedOutline{border-color:#e1e1e1}.dark-mode .Resources .filtersection .resourcefilters .button.is-purple{background-color:rgba(31,25,158,0.13);background-image:none;color:#7ba1ea}.dark-mode .Resources .filtersection .resourcefilters div .MuiFormControl-root:nth-child(1) .MuiOutlinedInput-root{border-color:#dbd3d3;border-width:25px !important;position:relative}.dark-mode .Resources .filtersection .resourcefilters .MuiSelect-select:not([multiple]) option,.dark-mode .Resources .filtersection .resourcefilters .MuiSelect-select:not([multiple]) optgroup{background-color:#161625}.dark-mode .Resources .filtersection .misclinkscontainer .button.is-purple{background-color:rgba(31,25,158,0.13);background-image:none;color:#7ba1ea}.dark-mode .Resources input .MuiInputBase-input{color:#e1e1e1}.dark-mode .Resources .searchbar .MuiFormLabel-root{color:rgba(232,230,227,0.54)}.dark-mode .Resources .searchbar .MuiOutlinedInput-notchedOutline{border-color:#e1e1e1}.dark-mode .Resources .searchbar .MuiSvgIcon-root{fill:#fff}.dark-mode .Resources table thead{color:#d2cfc8}.dark-mode .Resources .tableandcontrols a{color:#3391ff}.dark-mode .PatientsDB .filters{background:#1e1e30 !important;box-shadow:0 2px 6px 0 rgba(0,0,0,0.12),inset 0 -1px 0 0 #1e1e30}.dark-mode .PatientsDB .legend{background:#1e1e30 !important}.dark-mode .PatientsDB .react-date-picker{background:#1e1e30;border-color:#9494941a !important}.dark-mode .PatientsDB .modal-content{background:#1e1e30 !important}.dark-mode .PatientsDB .modal{background:#1e1e30bb !important}.dark-mode .Clusters canvas{filter:invert(1) hue-rotate(180deg) saturate(5)}.fadeInUp{animation-duration:.45s;animation-fill-mode:both;animation-name:fadeInUp}@keyframes fadeInUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}.rotateDownRight{animation-duration:.25s;animation-fill-mode:both;animation-name:rotateDownRight}@keyframes rotateDownRight{100%{transform:rotate(-90deg)}}.rotateRightDown{animation-duration:.25s;animation-fill-mode:both;animation-name:rotateRightDown}@keyframes rotateRightDown{0%{transform:rotate(-90deg)}}.fadeOutDown{animation-duration:.45s;animation-fill-mode:both;animation-name:fadeOutDown}@keyframes fadeOutDown{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(20px)}}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(466);
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(101);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var _dist_scss_App_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(490);
/* harmony import */ var _dist_scss_App_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_dist_scss_App_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_dashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(444);
/* harmony import */ var _components_views_hr_central_tile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(463);
/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(464);
/* harmony import */ var _components_views_hr_recruiter_dashboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(323);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










const App = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "App"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* BrowserRouter */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Switch */ "d"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Route */ "b"], {
    exact: true,
    path: "/login",
    component: _components_login__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Route */ "b"], {
    exact: true,
    path: "/hr_central_home",
    component: _components_views_hr_central_tile__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Route */ "b"], {
    exact: true,
    path: "/home",
    component: _components_dashboard__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Route */ "b"], {
    exact: true,
    path: "/hr_recruiter_home",
    component: _components_views_hr_recruiter_dashboard__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Redirect */ "a"], {
    to: "/login"
  }))));
};

const _default = Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_0__["hot"])(App);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\App.js");
  reactHotLoader.register(_default, "default", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\App.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(474);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(550);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(355);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(156);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(192);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(42);
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(461);
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(462);
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_views_user_dashboard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(445);
/* harmony import */ var _components_views_hr_dashboard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(451);
/* harmony import */ var _components_views_manager_dashboard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(453);
/* harmony import */ var _components_views_recruiter_dashboard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(456);
/* harmony import */ var _components_views_hr_recruiter_dashboard__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(323);
/* harmony import */ var _material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(324);
/* harmony import */ var _material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_18__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed

  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    fontFamily: 'KPMG !important',
    fontSize: 'xx-large'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {}
}));
function Dashboard() {
  const classes = useStyles();
  const [getRenderDashboardValue, setRenderDashboardValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const userName = userDetails.EmployeeName.split(',');
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* useHistory */ "g"])();

  const routeChange = () => {
    let path = '/hr_central_home';
    history.push(path, {
      params: userDetails
    });
  };

  const getValuetoRenderDashboard = renderValue => {
    switch (renderValue) {
      case 'User':
        setRenderDashboardValue(1);
        break;

      case 'Manager':
        setRenderDashboardValue(2);
        break;

      case 'HR':
        setRenderDashboardValue(3);
        break;

      case 'Recruiter':
        setRenderDashboardValue(4);
        break;
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getValuetoRenderDashboard(userDetails.UserRole);
  }, [getRenderDashboardValue]);

  const handleLogout = () => {
    console.log('you have been logged out. boo!');
    history.push('/login');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    position: "fixed",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(classes.appBar, open && classes.appBarShift)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: classes.toolbar,
    variant: "dense"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    component: "h1",
    variant: "h6",
    color: "inherit",
    noWrap: true,
    className: classes.title
  }, "HR-Central ", getRenderDashboardValue === 3 && userDetails.page === 'shift' ? 'Shift Allowance' : getRenderDashboardValue === 3 && userDetails.page === 'recruiter' ? 'Joining Benefits' : ''), getRenderDashboardValue === 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    color: "inherit",
    onClick: routeChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    component: "h1",
    variant: "h6",
    color: "inherit"
  }, "Hi, ", userName[1] + ' ' + userName[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    color: "inherit",
    onClick: handleLogout
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_18___default.a, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: classes.content
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.appBarSpacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    container: true,
    spacing: 2
  }, getRenderDashboardValue === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_user_dashboard__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], null), getRenderDashboardValue === 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_manager_dashboard__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], null), getRenderDashboardValue === 3 && userDetails.page === 'shift' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_hr_dashboard__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], null), getRenderDashboardValue === 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_recruiter_dashboard__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], null), getRenderDashboardValue === 3 && userDetails.page === 'recruiter' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_hr_recruiter_dashboard__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], null)))));
}

__signature__(Dashboard, "useStyles{classes}\nuseState{[getRenderDashboardValue, setRenderDashboardValue](0)}\nuseLocation{location}\nuseHistory{history}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* useLocation */ "h"], react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* useHistory */ "g"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\dashboard.js");
  reactHotLoader.register(Dashboard, "Dashboard", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\dashboard.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var _datatables_user_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(446);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => ({
  root: {
    display: 'flex'
  }
}));
function UserDashboard() {
  const classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 12,
    lg: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_user_datatable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null)));
}

__signature__(UserDashboard, "useStyles{classes}", () => [useStyles]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\user-dashboard.js");
  reactHotLoader.register(UserDashboard, "UserDashboard", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\user-dashboard.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDatatable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(93);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(222);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(223);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(224);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(225);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(108);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(115);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(107);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(109);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(68);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(34);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(156);
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(256);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(216);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _views_stepper_user_stepper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(314);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(226);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(227);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
























const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  padBottom: {
    paddingBottom: '5px'
  }
}));

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"], _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

function UserDatatable() {
  const classes = useStyles();
  const [getShiftAllowanceData, setShiftAllowanceData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getLatestStatus, setLatestStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_16__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [getShiftDays, setShiftDays] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftDays, setSelectedShiftDays] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [calculateShiftTypeAmount, setfetchShiftTypeAmount] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftAllowanceStatus, setShiftAllowanceStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftAllowanceStatus, setSelectedShiftAllowanceStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftMonth, setShiftMonth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftMonth, setSelectedShiftMonth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getActualShiftMonth, setActualshiftMonth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftYear, setShiftYear] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftYear, setSelectedShiftYear] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getActualShiftYear, setActualShiftYear] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftType, setShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftType, setSelectedShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [fetchShiftTypeAllowance, setfetchShiftTypeAllowance] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');

  const getAllShiftAllowanceStatus = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftAllowanceStatus/')]);
      setShiftAllowanceStatus(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftDays = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftDays/')]);
      setShiftDays(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftMonth = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftMonth/')]);
      setShiftMonth(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftYear = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftYear/')]);
      setShiftYear(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftType = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftType/')]);
      setShiftType(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveNewShiftAllowance = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/saveNewShiftAllowance/', {
        EmployeeEmailId: userDetails.EmployeeEmailId,
        ManagerEmailId: userDetails.ManagerEmailId,
        HrEmailId: userDetails.HrEmailID,
        ShiftMonth: getActualShiftMonth.ShiftMonth,
        ShiftYear: getActualShiftYear.ShiftYear,
        DimShiftTypeId: getSelectedShiftType,
        NoOfDaysWorked: getSelectedShiftDays,
        TotalAmount: calculateShiftTypeAmount,
        DimShiftAllowanceStatusId: 1,
        ShiftAllowanceRejectionComments: '',
        TargetRecordCreatedBy: userDetails.EmployeeEmailId
      })]);

      if (response.status === 200) {
        handleClose();
        getAllShiftAllowanceData();
        getCurrentStatus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftAllowanceStatus());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftDays());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftMonth());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftYear());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftType());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftAllowanceData());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getCurrentStatus());
  }, []);

  const SelectedShiftMonth = event => {
    setSelectedShiftMonth(event.target.value);
    setActualshiftMonth(getShiftMonth.find(month => month.DimShiftMonthId === event.target.value));
  };

  const SelectedShiftDays = event => {
    setSelectedShiftDays(event.target.value);
    setfetchShiftTypeAmount(fetchShiftTypeAllowance.ShiftALlowancePerDay * event.target.value);
  };

  const SelectedShiftYear = event => {
    setSelectedShiftYear(event.target.value);
    setActualShiftYear(getShiftYear.find(year => year.DimShiftYearId === event.target.value));
  };

  const SelectedShiftType = event => {
    setSelectedShiftType(event.target.value);
    setfetchShiftTypeAllowance(getShiftType.find(allowance => allowance.DimShiftTypeId === event.target.value));
  };

  const options = {
    searchPlaceholder: 'Search Shift Allowance',
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '400px',
    selectableRows: 'none',
    customToolbar: () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        title: "Add Shift Allowance"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
        onClick: handleClickOpen
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19___default.a, null)));
    }
  };

  const getAllShiftAllowanceData = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/getShiftAllowanceAndSummary/', {
        email: userDetails.EmployeeEmailId
      })]);
      setShiftAllowanceData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentStatus = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/getLatestStatus/', {
        email: userDetails.EmployeeEmailId
      })]);
      setLatestStatus(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, getLatestStatus.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_stepper_user_stepper__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    currentStatus: getLatestStatus,
    getShiftAllowanceData: getShiftAllowanceData
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.padBottom
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "Shift Allowance",
    data: getShiftAllowanceData,
    columns: _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_2__[/* UserColumns */ "e"],
    options: options
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    id: "form-dialog-title"
  }, "Add New Shift Allowance"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "empnumber",
    label: "Emp ID",
    disabled: true,
    value: userDetails.EmployeeNumber || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "manager name",
    label: "Manager Name",
    disabled: true,
    value: userDetails.ManagerName || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "hr name",
    label: "HR Name",
    disabled: true,
    value: userDetails.HrName || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Month"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "shift-month-label",
    id: "shift-month",
    value: getSelectedShiftMonth,
    onChange: SelectedShiftMonth
  }, getShiftMonth.map((option, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimShiftMonthId,
      value: option.DimShiftMonthId
    }, option.ShiftMonth);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Year"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "shift-year-label",
    id: "shift-year-helper",
    value: getSelectedShiftYear,
    onChange: SelectedShiftYear
  }, getShiftYear.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimShiftYearId,
      value: option.DimShiftYearId
    }, option.ShiftYear);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "shift-type-label",
    id: "shift-type-helper",
    value: getSelectedShiftType,
    onChange: SelectedShiftType
  }, getShiftType.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimShiftTypeId,
      value: option.DimShiftTypeId
    }, option.ShiftType);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "amount",
    label: "Shift Allowance Amount",
    disabled: true,
    value: fetchShiftTypeAllowance.ShiftALlowancePerDay || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Days"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "demo-simple-select-helper-label",
    id: "demo-simple-select-helper",
    value: getSelectedShiftDays,
    onChange: SelectedShiftDays
  }, getShiftDays.map((option, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: index,
      value: option.Day
    }, option.Day);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "amount",
    label: "Calculated Shift Amount",
    disabled: true,
    value: calculateShiftTypeAmount || ''
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    onClick: saveNewShiftAllowance,
    variant: "contained",
    color: "primary",
    disabled: getSelectedShiftType === '' || getSelectedShiftYear === '' || getSelectedShiftMonth === '' || getSelectedShiftDays === ''
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    onClick: handleClose,
    variant: "outlined",
    color: "secondary"
  }, "Close"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    open: alertOpen,
    autoHideDuration: 3000,
    onClose: handleAlertClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    onClose: handleClose,
    severity: "success"
  }, "Saved Successfully!")));
}

__signature__(UserDatatable, "useStyles{classes}\nuseState{[getShiftAllowanceData, setShiftAllowanceData]([])}\nuseState{[getLatestStatus, setLatestStatus]([])}\nuseLocation{location}\nuseState{[open, setOpen](false)}\nuseState{[alertOpen, setAlertOpen](false)}\nuseState{[getShiftDays, setShiftDays]([])}\nuseState{[getSelectedShiftDays, setSelectedShiftDays]('')}\nuseState{[calculateShiftTypeAmount, setfetchShiftTypeAmount]('')}\nuseState{[getShiftAllowanceStatus, setShiftAllowanceStatus]([])}\nuseState{[getSelectedShiftAllowanceStatus, setSelectedShiftAllowanceStatus]('')}\nuseState{[getShiftMonth, setShiftMonth]([])}\nuseState{[getSelectedShiftMonth, setSelectedShiftMonth]('')}\nuseState{[getActualShiftMonth, setActualshiftMonth]('')}\nuseState{[getShiftYear, setShiftYear]([])}\nuseState{[getSelectedShiftYear, setSelectedShiftYear]('')}\nuseState{[getActualShiftYear, setActualShiftYear]('')}\nuseState{[getShiftType, setShiftType]([])}\nuseState{[getSelectedShiftType, setSelectedShiftType]('')}\nuseState{[fetchShiftTypeAllowance, setfetchShiftTypeAllowance]('')}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_16__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\user-datatable.js");
  reactHotLoader.register(Alert, "Alert", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\user-datatable.js");
  reactHotLoader.register(UserDatatable, "UserDatatable", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\user-datatable.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HRDashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(258);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(157);
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(174);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(13);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _datatables_hr_datatable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(452);
/* harmony import */ var _chart_areaChart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(318);
/* harmony import */ var _chart_pieofpieChart__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(321);
/* harmony import */ var _chart_waterfallChart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(322);
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(30);
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(41);
/* harmony import */ var _amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(122);
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(123);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(74);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(34);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};























const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(theme => ({
  root: {
    display: 'flex'
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {},
  typography: {
    fontFamily: 'Univers For KPMG',
    fontSize: '1.5em'
  },
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  verticalTabDiv: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 410
  }
}));
const AntTabs = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);
const AntTab = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
  disableRipple: true
}, props)));

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: `scrollable-auto-tabpanel-${index}`,
    "aria-labelledby": `scrollable-auto-tab-${index}`
  }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, children));
}

TabPanel.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.node,
  index: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired
};

function TabPanelVertical(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: `vertical-tabpanel-${index}`,
    "aria-labelledby": `vertical-tab-${index}`
  }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, children));
}

TabPanelVertical.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.node,
  index: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

function HRDashboard() {
  const classes = useStyles();
  const fixedHeightPaper = Object(clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(classes.paper, classes.fixedHeight);
  const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [getKPIValues, setKPIValues] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getVerticalTabValue, setVerticalTabValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);

  const handleVertivalTabChange = (event, newValue) => {
    setVerticalTabValue(newValue);
  };

  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_22__[/* useLocation */ "h"])();
  const userDetails = location.state.params;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* useTheme */ "l"](_amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"]);
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* useTheme */ "l"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"]);

  const smallLineCharts = () => {
    // Functions that create various sparklines
    function createLineNewChart(title, data, color, chartDiv) {
      let container = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* create */ "h"](chartDiv, _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* Container */ "b"]);
      container.layout = "horizontal";
      container.fixedWidthGrid = true;
      container.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* percent */ "k"](100);
      container.height = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* percent */ "k"](100);
      let chart = container.createChild(_amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* XYChart */ "j"]);
      chart.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_15__[/* percent */ "k"](45);
      chart.height = 70;
      chart.data = data;
      chart.padding(20, 5, 2, 5);
      let categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* CategoryAxis */ "a"]());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.baseGrid.disabled = true;
      categoryAxis.renderer.labels.template.disabled = true;
      categoryAxis.cursorTooltipEnabled = false;
      categoryAxis.dataFields.category = "Period";
      let valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* ValueAxis */ "i"]());
      valueAxis.min = 0;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* XYCursor */ "k"]();
      chart.cursor.lineY.disabled = true;
      chart.cursor.behavior = "none";
      let series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* LineSeries */ "e"]());
      series.tooltipText = "{Period}: [bold]{value}";
      series.dataFields.categoryX = "Period";
      series.dataFields.valueY = "value";
      series.tensionX = 0.8;
      series.strokeWidth = 1;
      series.stroke = '#fff'; // render data points as bullets

      let bullet = series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_16__[/* CircleBullet */ "b"]());
      bullet.circle.opacity = 1;
      bullet.circle.fill = color;
      bullet.circle.propertyFields.opacity = "opacity";
      bullet.circle.radius = 3;
      return chart;
    }

    createLineNewChart("New", [{
      "Period": 'Jan-Feb',
      "value": 370
    }, {
      "Period": "Feb-Mar",
      "value": 300
    }, {
      "Period": "Mar-Apr",
      "value": 250
    }, {
      "Period": "Apr-May",
      "value": 439
    }, {
      "Period": 'May-Jun',
      "value": 320
    }, {
      "Period": "Jun-Jul",
      "value": 289
    }, {
      "Period": "Jul-Aug",
      "value": 410,
      "opacity": 1
    }], '#31b3e0', 'chartNewDiv');
    createLineNewChart("Approved", [{
      "Period": 'Jan-Feb',
      "value": 310
    }, {
      "Period": "Feb-Mar",
      "value": 200
    }, {
      "Period": "Mar-Apr",
      "value": 240
    }, {
      "Period": "Apr-May",
      "value": 389
    }, {
      "Period": 'May-Jun',
      "value": 290
    }, {
      "Period": "Jun-Jul",
      "value": 289
    }, {
      "Period": "Jul-Aug",
      "value": 500,
      "opacity": 1
    }], '#60c483', 'chartApprovedDiv');
    createLineNewChart("Closed", [{
      "Period": 'Jan-Feb',
      "value": 70
    }, {
      "Period": "Feb-Mar",
      "value": 100
    }, {
      "Period": "Mar-Apr",
      "value": 10
    }, {
      "Period": "Apr-May",
      "value": 50
    }, {
      "Period": 'May-Jun',
      "value": 30
    }, {
      "Period": "Jun-Jul",
      "value": 289
    }, {
      "Period": "Jul-Aug",
      "value": 90,
      "opacity": 1
    }], '#f98483', 'chartClosedDiv');
    createLineNewChart("Paid", [{
      "Period": 'Jan-Feb',
      "value": 37330
    }, {
      "Period": "Feb-Mar",
      "value": 32220
    }, {
      "Period": "Mar-Apr",
      "value": 25230
    }, {
      "Period": "Apr-May",
      "value": 43659
    }, {
      "Period": 'May-Jun',
      "value": 32120
    }, {
      "Period": "Jun-Jul",
      "value": 28879
    }, {
      "Period": "Jul-Aug",
      "value": 51450,
      "opacity": 1
    }], '#ffc721', 'chartTotalDiv'); //document.querySelector('[aria-labelledby="id-43-title"]').remove();
    //document.querySelector('[aria-labelledby="id-179-title"]').remove();
    //document.querySelector('[aria-labelledby="id-315-title"]').remove();
    //document.querySelector('[aria-labelledby="id-451-title"]').remove();
  };

  const getAllKPIValues = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_20___default.a.post('/api/getAllKPIValues/', {
        email: userDetails.EmployeeEmailId,
        userRole: userDetails.UserRole
      })]);
      setKPIValues(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_21__["trackPromise"])(getAllKPIValues());
    smallLineCharts();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#31b3e0,#1d97c2)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "New - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].Pending,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartNewDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#60c483,#41af67)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Approved - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].Approved,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartApprovedDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#f98483,#f75453)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Rejected - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].Rejected,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartClosedDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#ffc721,#edb100)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Paid - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_19___default.a, {
    strat: 0,
    end: getKPIValues[0].AmountDisbursed,
    duration: 2,
    useEasing: true,
    separator: ",",
    prefix: '₹'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartTotalDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 12,
    lg: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.demo1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTabs, {
    value: value,
    onChange: handleChange,
    "aria-label": "ant example"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTab, {
    label: "Approvals"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTab, {
    label: "Insights"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_hr_datatable__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    getAllKPIValues: getAllKPIValues
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: value,
    index: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.verticalTabDiv
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    orientation: "vertical",
    variant: "scrollable",
    value: getVerticalTabValue,
    onChange: handleVertivalTabChange,
    "aria-label": "Vertical tabs example",
    className: classes.verticalTabs
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
    label: "Trend"
  }, a11yProps(0))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
    label: "Segmentation"
  }, a11yProps(1))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
    label: "Cumulation"
  }, a11yProps(2)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: getVerticalTabValue,
    index: 0,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chart_areaChart__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    dashboardId: 1
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: getVerticalTabValue,
    index: 1,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chart_pieofpieChart__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: getVerticalTabValue,
    index: 2,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chart_waterfallChart__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], null)))))));
}

__signature__(HRDashboard, "useStyles{classes}\nuseState{[value, setValue](0)}\nuseState{[getKPIValues, setKPIValues]([])}\nuseState{[getVerticalTabValue, setVerticalTabValue](0)}\nuseLocation{location}\nuseTheme{}\nuseTheme{}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_22__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
  reactHotLoader.register(AntTabs, "AntTabs", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
  reactHotLoader.register(AntTab, "AntTab", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
  reactHotLoader.register(TabPanel, "TabPanel", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
  reactHotLoader.register(TabPanelVertical, "TabPanelVertical", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
  reactHotLoader.register(a11yProps, "a11yProps", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
  reactHotLoader.register(HRDashboard, "HRDashboard", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-dashboard.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HRDatatable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(222);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(223);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(224);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(225);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(126);
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(228);
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(255);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(175);
/* harmony import */ var _material_ui_core_TextareaAutosize__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(329);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(192);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(34);
/* harmony import */ var _components_utils_data_table_columns__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(120);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(226);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(227);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    overflow: 'hidden'
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 150
  },
  padBottom: {
    paddingBottom: '5px'
  },
  textArea: {
    width: '-webkit-fill-available',
    height: '90px !important',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px #6D2077',
    border: '1px solid transparent'
  }
}));
const GreenRadio = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][400],
    '&$checked': {
      color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][600]
    }
  },
  checked: {}
})(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], _extends({
  color: "default"
}, props)));

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

function HRDatatable({
  getAllKPIValues
}) {
  const classes = useStyles();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_18__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const statuses = [{
    'Id': 1,
    'Status': 'Approve'
  }, {
    'Id': 2,
    'Status': 'Reject'
  }];
  const [getSelectedShiftRow, setSelectedShiftRow] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getRaisedShiftAllowance, setRaisedShiftAllowance] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getfetchShiftType, setfetchShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getSelectedRowEmpId, setSelectedRowEmpId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getShiftType, setShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getRejectionComments, setRejectionComments] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [selectedValue, setSelectedValue] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('4');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const approvalsOptions = {
    searchPlaceholder: 'Search Shift Allowance',
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '400px',
    selectableRows: 'none',
    onRowClick: rowData => {
      handleClickOpen();
      setSelectedShiftRow(rowData);
      setSelectedRowEmpId(getRaisedShiftAllowance.find(id => id.TblFactEmployeeShiftAllowanceSummaryId === rowData[0]));
      setfetchShiftType(getShiftType.find(type => type.ShiftType === rowData[5]));
    }
  };

  const getAllShiftType = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.get('/api/getShiftType/')]);
      setShiftType(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRaisedShiftAllowance = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.post('/api/getAllRaisedShiftAllowance/', {
        email: userDetails.EmployeeEmailId
      })]);
      setRaisedShiftAllowance(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveNewShiftAllowance = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.post('/api/saveNewShiftAllowance/', {
        EmployeeEmailId: getSelectedRowEmpId.EmployeeEmailId,
        ManagerEmailId: getSelectedRowEmpId.ManagerEmailId,
        HrEmailId: getSelectedRowEmpId.HrEmailId,
        ShiftMonth: getSelectedShiftRow[3],
        ShiftYear: getSelectedShiftRow[4],
        DimShiftTypeId: getfetchShiftType.DimShiftTypeId,
        NoOfDaysWorked: getSelectedShiftRow[6],
        TotalAmount: getSelectedShiftRow[7],
        DimShiftAllowanceStatusId: selectedValue,
        ShiftAllowanceRejectionComments: getRejectionComments,
        TargetRecordCreatedBy: userDetails.EmployeeEmailId
      })]);

      if (response.status === 200) {
        handleClose();
        getAllRaisedShiftAllowance();
        getAllKPIValues();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectComments = event => {
    setRejectionComments(event.target.value);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__["trackPromise"])(getAllShiftType());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__["trackPromise"])(getAllRaisedShiftAllowance());
  }, [getAllKPIValues]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "Approve Shift Allowance",
    data: getRaisedShiftAllowance,
    columns: _components_utils_data_table_columns__WEBPACK_IMPORTED_MODULE_19__[/* HRColumns */ "a"],
    options: approvalsOptions
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: "xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    id: "form-dialog-title"
  }, "Select a Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    item: true,
    xs: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    "aria-label": "approval",
    name: "approval",
    value: selectedValue,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    value: "female",
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GreenRadio, {
      checked: selectedValue === '4',
      onChange: handleChange,
      value: "4",
      name: "radio-button-demo",
      inputProps: {
        'aria-label': '4'
      }
    }),
    label: "Approve"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    value: "female",
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      checked: selectedValue === '5',
      onChange: handleChange,
      value: "5",
      name: "radio-button-demo",
      inputProps: {
        'aria-label': '5'
      }
    }),
    label: "Reject"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    item: true,
    xs: 8
  }, selectedValue === '5' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextareaAutosize__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    className: classes.textArea,
    "aria-label": "minimum height",
    onKeyDown: handleRejectComments,
    rowsMin: 5,
    placeholder: "Rejection Reason/Comments"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "contained",
    onClick: approveNewShiftAllowance,
    color: "primary",
    disabled: selectedValue === '5' && getRejectionComments.length < 10
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    onClick: handleClose,
    variant: "outlined",
    color: "secondary"
  }, "Close"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    open: alertOpen,
    autoHideDuration: 3000,
    onClose: handleAlertClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    onClose: handleClose,
    severity: "success"
  }, "Saved Successfully!")));
}

__signature__(HRDatatable, "useStyles{classes}\nuseLocation{location}\nuseState{[getSelectedShiftRow, setSelectedShiftRow]([])}\nuseState{[getRaisedShiftAllowance, setRaisedShiftAllowance]([])}\nuseState{[getfetchShiftType, setfetchShiftType]('')}\nuseState{[getSelectedRowEmpId, setSelectedRowEmpId]([])}\nuseState{[getShiftType, setShiftType]([])}\nuseState{[getRejectionComments, setRejectionComments]('')}\nuseState{[open, setOpen](false)}\nuseState{[alertOpen, setAlertOpen](false)}\nuseState{[selectedValue, setSelectedValue]('4')}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_18__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-datatable.js");
  reactHotLoader.register(GreenRadio, "GreenRadio", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-datatable.js");
  reactHotLoader.register(Alert, "Alert", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-datatable.js");
  reactHotLoader.register(HRDatatable, "HRDatatable", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-datatable.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerDashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(258);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(157);
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(174);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(13);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _datatables_manager_datatable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(454);
/* harmony import */ var _datatables_manager_datatable_add_new__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(455);
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30);
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(41);
/* harmony import */ var _amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(122);
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(123);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(74);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(34);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(theme => ({
  root: {
    display: 'flex'
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {},
  typography: {
    fontFamily: 'Univers For KPMG',
    fontSize: '1.5em'
  }
}));
const AntTabs = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);
const AntTab = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _extends({
  disableRipple: true
}, props)));

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: `scrollable-auto-tabpanel-${index}`,
    "aria-labelledby": `scrollable-auto-tab-${index}`
  }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, children));
}

TabPanel.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.node,
  index: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any.isRequired
};
function ManagerDashboard() {
  const classes = useStyles();
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* useTheme */ "l"](_amcharts_amcharts4_themes_dataviz__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"]);
  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* useTheme */ "l"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"]);
  const fixedHeightPaper = Object(clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(classes.paper, classes.fixedHeight);
  const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [getKPIValues, setKPIValues] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_20__[/* useLocation */ "h"])();
  const userDetails = location.state.params;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllKPIValues = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_18___default.a.post('/api/getAllKPIValues/', {
        email: userDetails.EmployeeEmailId,
        userRole: userDetails.UserRole
      })]);
      setKPIValues(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const smallLineCharts = () => {
    // Functions that create various sparklines
    function createLineNewChart(title, data, color, chartDiv) {
      let container = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* create */ "h"](chartDiv, _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* Container */ "b"]);
      container.layout = "horizontal";
      container.fixedWidthGrid = true;
      container.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* percent */ "k"](100);
      container.height = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* percent */ "k"](100);
      let chart = container.createChild(_amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__[/* XYChart */ "j"]);
      chart.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_13__[/* percent */ "k"](45);
      chart.height = 70;
      chart.data = data;
      chart.padding(20, 5, 2, 5);
      let categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__[/* CategoryAxis */ "a"]());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.baseGrid.disabled = true;
      categoryAxis.renderer.labels.template.disabled = true;
      categoryAxis.cursorTooltipEnabled = false;
      categoryAxis.dataFields.category = "Period";
      let valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__[/* ValueAxis */ "i"]());
      valueAxis.min = 0;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__[/* XYCursor */ "k"]();
      chart.cursor.lineY.disabled = true;
      chart.cursor.behavior = "none";
      let series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__[/* LineSeries */ "e"]());
      series.tooltipText = "{Period}: [bold]{value}";
      series.dataFields.categoryX = "Period";
      series.dataFields.valueY = "value";
      series.tensionX = 0.8;
      series.strokeWidth = 1;
      series.stroke = '#fff'; // render data points as bullets

      let bullet = series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_14__[/* CircleBullet */ "b"]());
      bullet.circle.opacity = 1;
      bullet.circle.fill = color;
      bullet.circle.propertyFields.opacity = "opacity";
      bullet.circle.radius = 3;
      return chart;
    }

    createLineNewChart("New", [{
      "Period": 'Jan-Feb',
      "value": 370
    }, {
      "Period": "Feb-Mar",
      "value": 300
    }, {
      "Period": "Mar-Apr",
      "value": 250
    }, {
      "Period": "Apr-May",
      "value": 439
    }, {
      "Period": 'May-Jun',
      "value": 320
    }, {
      "Period": "Jun-Jul",
      "value": 289
    }, {
      "Period": "Jul-Aug",
      "value": 410,
      "opacity": 1
    }], '#31b3e0', 'chartNewDiv');
    createLineNewChart("Approved", [{
      "Period": 'Jan-Feb',
      "value": 310
    }, {
      "Period": "Feb-Mar",
      "value": 200
    }, {
      "Period": "Mar-Apr",
      "value": 240
    }, {
      "Period": "Apr-May",
      "value": 389
    }, {
      "Period": 'May-Jun',
      "value": 290
    }, {
      "Period": "Jun-Jul",
      "value": 289
    }, {
      "Period": "Jul-Aug",
      "value": 500,
      "opacity": 1
    }], '#60c483', 'chartApprovedDiv');
    createLineNewChart("Closed", [{
      "Period": 'Jan-Feb',
      "value": 70
    }, {
      "Period": "Feb-Mar",
      "value": 100
    }, {
      "Period": "Mar-Apr",
      "value": 10
    }, {
      "Period": "Apr-May",
      "value": 50
    }, {
      "Period": 'May-Jun',
      "value": 30
    }, {
      "Period": "Jun-Jul",
      "value": 289
    }, {
      "Period": "Jul-Aug",
      "value": 90,
      "opacity": 1
    }], '#f98483', 'chartClosedDiv');
    createLineNewChart("Paid", [{
      "Period": 'Jan-Feb',
      "value": 37330
    }, {
      "Period": "Feb-Mar",
      "value": 32220
    }, {
      "Period": "Mar-Apr",
      "value": 25230
    }, {
      "Period": "Apr-May",
      "value": 43659
    }, {
      "Period": 'May-Jun',
      "value": 32120
    }, {
      "Period": "Jun-Jul",
      "value": 28879
    }, {
      "Period": "Jul-Aug",
      "value": 51450,
      "opacity": 1
    }], '#ffc721', 'chartTotalDiv'); //document.querySelector('[aria-labelledby="id-43-title"]').remove();
    //document.querySelector('[aria-labelledby="id-179-title"]').remove();
    //document.querySelector('[aria-labelledby="id-315-title"]').remove();
    //document.querySelector('[aria-labelledby="id-451-title"]').remove();
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_19__["trackPromise"])(getAllKPIValues());
    smallLineCharts();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#31b3e0,#1d97c2)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "New - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_17___default.a, {
    strat: 0,
    end: getKPIValues[0].Pending,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartNewDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#60c483,#41af67)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Approved - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_17___default.a, {
    strat: 0,
    end: getKPIValues[0].Approved,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartApprovedDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#f98483,#f75453)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Rejected - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_17___default.a, {
    strat: 0,
    end: getKPIValues[0].Rejected,
    duration: 2,
    useEasing: true,
    separator: ","
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartClosedDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 4,
    lg: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: fixedHeightPaper,
    style: {
      background: 'linear-gradient(45deg,#ffc721,#edb100)',
      color: 'white'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.typography
  }, "Paid - ", getKPIValues.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_17___default.a, {
    strat: 0,
    end: getKPIValues[0].AmountDisbursed,
    duration: 2,
    useEasing: true,
    separator: ",",
    prefix: '₹'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "chartTotalDiv",
    style: {
      width: "100%",
      height: "70px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 12,
    lg: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.demo1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTabs, {
    value: value,
    onChange: handleChange,
    "aria-label": "ant example"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTab, {
    label: "Approvals"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AntTab, {
    label: "Add New Shift"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_manager_datatable__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    getAllKPIValues: getAllKPIValues
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
    value: value,
    index: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_manager_datatable_add_new__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.padding
  }))));
}

__signature__(ManagerDashboard, "useStyles{classes}\nuseTheme{}\nuseTheme{}\nuseState{[value, setValue](0)}\nuseState{[getKPIValues, setKPIValues]([])}\nuseLocation{location}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_20__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\manager-dashboard.js");
  reactHotLoader.register(AntTabs, "AntTabs", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\manager-dashboard.js");
  reactHotLoader.register(AntTab, "AntTab", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\manager-dashboard.js");
  reactHotLoader.register(TabPanel, "TabPanel", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\manager-dashboard.js");
  reactHotLoader.register(ManagerDashboard, "ManagerDashboard", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\manager-dashboard.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerDatatable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(222);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(223);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(224);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(225);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(126);
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(228);
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(255);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(175);
/* harmony import */ var _material_ui_core_TextareaAutosize__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(329);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(192);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(34);
/* harmony import */ var _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(120);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(226);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(227);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    overflow: 'hidden'
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 150
  },
  padBottom: {
    paddingBottom: '5px'
  },
  textArea: {
    width: '-webkit-fill-available',
    height: '90px !important',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px #6D2077',
    border: '1px solid transparent'
  }
}));
const GreenRadio = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][400],
    '&$checked': {
      color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][600]
    }
  },
  checked: {}
})(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], _extends({
  color: "default"
}, props)));

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

function ManagerDatatable(getAllKPIValues) {
  const classes = useStyles();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_18__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const statuses = [{
    'Id': 1,
    'Status': 'Approve'
  }, {
    'Id': 2,
    'Status': 'Reject'
  }];
  const [getSelectedShiftRow, setSelectedShiftRow] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getRaisedShiftAllowance, setRaisedShiftAllowance] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getfetchShiftType, setfetchShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getSelectedRowEmpId, setSelectedRowEmpId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getShiftType, setShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getRejectionComments, setRejectionComments] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [selectedValue, setSelectedValue] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('2');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const approvalsOptions = {
    searchPlaceholder: 'Search Shift Allowance',
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '400px',
    selectableRows: 'none',
    onRowClick: (rowData, rowMeta, rowIndex) => {
      handleClickOpen();
      setSelectedShiftRow(rowData);
      setSelectedRowEmpId(getRaisedShiftAllowance.find(id => id.TblFactEmployeeShiftAllowanceSummaryId === rowData[0]));
      setfetchShiftType(getShiftType.find(type => type.ShiftType === rowData[5]));
    }
  };

  const getAllShiftType = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.get('/api/getShiftType/')]);
      setShiftType(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRaisedShiftAllowance = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.post('/api/getAllRaisedShiftAllowance/', {
        email: userDetails.EmployeeEmailId
      })]);
      setRaisedShiftAllowance(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveNewShiftAllowance = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.post('/api/saveNewShiftAllowance/', {
        EmployeeEmailId: getSelectedRowEmpId.EmployeeEmailId,
        ManagerEmailId: getSelectedRowEmpId.ManagerEmailId,
        HrEmailId: getSelectedRowEmpId.HrEmailId,
        ShiftMonth: getSelectedShiftRow[3],
        ShiftYear: getSelectedShiftRow[4],
        DimShiftTypeId: getfetchShiftType.DimShiftTypeId,
        NoOfDaysWorked: getSelectedShiftRow[6],
        TotalAmount: getSelectedShiftRow[7],
        DimShiftAllowanceStatusId: selectedValue,
        ShiftAllowanceRejectionComments: getRejectionComments,
        TargetRecordCreatedBy: userDetails.EmployeeEmailId
      })]);

      if (response.status === 200) {
        handleClose();
        getAllRaisedShiftAllowance();
        getAllKPIValues.getAllKPIValues();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectComments = event => {
    setRejectionComments(event.target.value);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__["trackPromise"])(getAllShiftType());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__["trackPromise"])(getAllRaisedShiftAllowance());
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "Approve Shift Allowance",
    data: getRaisedShiftAllowance,
    columns: _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_19__[/* ManagerColumns */ "c"],
    options: approvalsOptions
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: "xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    id: "form-dialog-title"
  }, "Select a Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    item: true,
    xs: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    "aria-label": "approval",
    name: "approval",
    value: selectedValue,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    value: "female",
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GreenRadio, {
      checked: selectedValue === '2',
      onChange: handleChange,
      value: "2",
      name: "radio-button-demo",
      inputProps: {
        'aria-label': 2
      }
    }),
    label: "Approve"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    value: "female",
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      checked: selectedValue === '3',
      onChange: handleChange,
      value: "3",
      name: "radio-button-demo",
      inputProps: {
        'aria-label': '3'
      }
    }),
    label: "Reject"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    item: true,
    xs: 8
  }, selectedValue === '3' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextareaAutosize__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    className: classes.textArea,
    "aria-label": "minimum height",
    onKeyDown: handleRejectComments,
    rowsMin: 5,
    placeholder: "Rejection Reason/Comments"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "contained",
    onClick: approveNewShiftAllowance,
    color: "primary",
    disabled: selectedValue === '3' && getRejectionComments.length < 10
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    onClick: handleClose,
    variant: "outlined",
    color: "secondary"
  }, "Close"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    open: alertOpen,
    autoHideDuration: 3000,
    onClose: handleAlertClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    onClose: handleClose,
    severity: "success"
  }, "Saved Successfully!")));
}

__signature__(ManagerDatatable, "useStyles{classes}\nuseLocation{location}\nuseState{[getSelectedShiftRow, setSelectedShiftRow]([])}\nuseState{[getRaisedShiftAllowance, setRaisedShiftAllowance]([])}\nuseState{[getfetchShiftType, setfetchShiftType]('')}\nuseState{[getSelectedRowEmpId, setSelectedRowEmpId]([])}\nuseState{[getShiftType, setShiftType]([])}\nuseState{[getRejectionComments, setRejectionComments]('')}\nuseState{[alertOpen, setAlertOpen](false)}\nuseState{[open, setOpen](false)}\nuseState{[selectedValue, setSelectedValue]('2')}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_18__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable.js");
  reactHotLoader.register(GreenRadio, "GreenRadio", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable.js");
  reactHotLoader.register(Alert, "Alert", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable.js");
  reactHotLoader.register(ManagerDatatable, "ManagerDatatable", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerDatatableAddNew; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(93);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(222);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(223);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(224);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(225);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(108);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(115);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(107);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(109);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(68);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(34);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(156);
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(256);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(216);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _views_stepper_user_stepper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(314);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(226);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(227);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
























const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  padBottom: {
    paddingBottom: '5px'
  }
}));

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"], _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

function ManagerDatatableAddNew() {
  const classes = useStyles();
  const [getShiftAllowanceData, setShiftAllowanceData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getLatestStatus, setLatestStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_16__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [getShiftDays, setShiftDays] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftDays, setSelectedShiftDays] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [calculateShiftTypeAmount, setfetchShiftTypeAmount] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftAllowanceStatus, setShiftAllowanceStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftAllowanceStatus, setSelectedShiftAllowanceStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftMonth, setShiftMonth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftMonth, setSelectedShiftMonth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getActualShiftMonth, setActualshiftMonth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftYear, setShiftYear] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftYear, setSelectedShiftYear] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getActualShiftYear, setActualShiftYear] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getShiftType, setShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedShiftType, setSelectedShiftType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [fetchShiftTypeAllowance, setfetchShiftTypeAllowance] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');

  const getAllShiftAllowanceStatus = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftAllowanceStatus/')]);
      setShiftAllowanceStatus(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftDays = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftDays/')]);
      setShiftDays(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftMonth = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftMonth/')]);
      setShiftMonth(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftYear = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftYear/')]);
      setShiftYear(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllShiftType = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftType/')]);
      setShiftType(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveNewShiftAllowance = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/saveNewShiftAllowance/', {
        EmployeeEmailId: userDetails.EmployeeEmailId,
        ManagerEmailId: userDetails.ManagerEmailId,
        HrEmailId: userDetails.HrEmailID,
        ShiftMonth: getActualShiftMonth.ShiftMonth,
        ShiftYear: getActualShiftYear.ShiftYear,
        DimShiftTypeId: getSelectedShiftType,
        NoOfDaysWorked: getSelectedShiftDays,
        TotalAmount: calculateShiftTypeAmount,
        DimShiftAllowanceStatusId: 1,
        ShiftAllowanceRejectionComments: '',
        TargetRecordCreatedBy: userDetails.EmployeeEmailId
      })]);

      if (response.status === 200) {
        handleClose();
        getAllShiftAllowanceData();
        getCurrentStatus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftAllowanceStatus());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftDays());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftMonth());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftYear());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftType());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllShiftAllowanceData());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getCurrentStatus());
  }, []);

  const SelectedShiftMonth = event => {
    setSelectedShiftMonth(event.target.value);
    setActualshiftMonth(getShiftMonth.find(month => month.DimShiftMonthId === event.target.value));
  };

  const SelectedShiftDays = event => {
    setSelectedShiftDays(event.target.value);
    setfetchShiftTypeAmount(fetchShiftTypeAllowance.ShiftALlowancePerDay * event.target.value);
  };

  const SelectedShiftYear = event => {
    setSelectedShiftYear(event.target.value);
    setActualShiftYear(getShiftYear.find(year => year.DimShiftYearId === event.target.value));
  };

  const SelectedShiftType = event => {
    setSelectedShiftType(event.target.value);
    setfetchShiftTypeAllowance(getShiftType.find(allowance => allowance.DimShiftTypeId === event.target.value));
  };

  const options = {
    searchPlaceholder: 'Search Shift Allowance',
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '400px',
    selectableRows: 'none',
    customToolbar: () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        title: "Add Shift Allowance"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
        onClick: handleClickOpen
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19___default.a, null)));
    }
  };

  const getAllShiftAllowanceData = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/getShiftAllowanceAndSummary/', {
        email: userDetails.EmployeeEmailId
      })]);
      setShiftAllowanceData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentStatus = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/getLatestStatus/', {
        email: userDetails.EmployeeEmailId
      })]);
      setLatestStatus(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, getLatestStatus.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_stepper_user_stepper__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    currentStatus: getLatestStatus,
    getShiftAllowanceData: getShiftAllowanceData
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.padBottom
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "Add Shift Allowance",
    data: getShiftAllowanceData,
    columns: _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_2__[/* UserColumns */ "e"],
    options: options
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    id: "form-dialog-title"
  }, "Add New Shift Allowance"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "empnumber",
    label: "Emp ID",
    disabled: true,
    value: userDetails.EmployeeNumber || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "manager name",
    label: "Manager Name",
    disabled: true,
    value: userDetails.ManagerName || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "hr name",
    label: "HR Name",
    disabled: true,
    value: userDetails.HrName || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Month"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "shift-month-label",
    id: "shift-month",
    value: getSelectedShiftMonth,
    onChange: SelectedShiftMonth
  }, getShiftMonth.map((option, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimShiftMonthId,
      value: option.DimShiftMonthId
    }, option.ShiftMonth);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Year"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "shift-year-label",
    id: "shift-year-helper",
    value: getSelectedShiftYear,
    onChange: SelectedShiftYear
  }, getShiftYear.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimShiftYearId,
      value: option.DimShiftYearId
    }, option.ShiftYear);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "shift-type-label",
    id: "shift-type-helper",
    value: getSelectedShiftType,
    onChange: SelectedShiftType
  }, getShiftType.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimShiftTypeId,
      value: option.DimShiftTypeId
    }, option.ShiftType);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "amount",
    label: "Shift Allowance Amount",
    disabled: true,
    value: fetchShiftTypeAllowance.ShiftALlowancePerDay || ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Shift Days"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "demo-simple-select-helper-label",
    id: "demo-simple-select-helper",
    value: getSelectedShiftDays,
    onChange: SelectedShiftDays
  }, getShiftDays.map((option, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: index,
      value: option.Day
    }, option.Day);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "amount",
    label: "Calculated Shift Amount",
    disabled: true,
    value: calculateShiftTypeAmount || ''
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    onClick: saveNewShiftAllowance,
    variant: "contained",
    color: "primary",
    disabled: getSelectedShiftType === '' || getSelectedShiftYear === '' || getSelectedShiftMonth === '' || getSelectedShiftDays === ''
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    onClick: handleClose,
    variant: "outlined",
    color: "secondary"
  }, "Close"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    open: alertOpen,
    autoHideDuration: 3000,
    onClose: handleAlertClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    onClose: handleClose,
    severity: "success"
  }, "Saved Successfully!")));
}

__signature__(ManagerDatatableAddNew, "useStyles{classes}\nuseState{[getShiftAllowanceData, setShiftAllowanceData]([])}\nuseState{[getLatestStatus, setLatestStatus]([])}\nuseLocation{location}\nuseState{[open, setOpen](false)}\nuseState{[alertOpen, setAlertOpen](false)}\nuseState{[getShiftDays, setShiftDays]([])}\nuseState{[getSelectedShiftDays, setSelectedShiftDays]('')}\nuseState{[calculateShiftTypeAmount, setfetchShiftTypeAmount]('')}\nuseState{[getShiftAllowanceStatus, setShiftAllowanceStatus]([])}\nuseState{[getSelectedShiftAllowanceStatus, setSelectedShiftAllowanceStatus]('')}\nuseState{[getShiftMonth, setShiftMonth]([])}\nuseState{[getSelectedShiftMonth, setSelectedShiftMonth]('')}\nuseState{[getActualShiftMonth, setActualshiftMonth]('')}\nuseState{[getShiftYear, setShiftYear]([])}\nuseState{[getSelectedShiftYear, setSelectedShiftYear]('')}\nuseState{[getActualShiftYear, setActualShiftYear]('')}\nuseState{[getShiftType, setShiftType]([])}\nuseState{[getSelectedShiftType, setSelectedShiftType]('')}\nuseState{[fetchShiftTypeAllowance, setfetchShiftTypeAllowance]('')}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_16__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable-add-new.js");
  reactHotLoader.register(Alert, "Alert", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable-add-new.js");
  reactHotLoader.register(ManagerDatatableAddNew, "ManagerDatatableAddNew", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\manager-datatable-add-new.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var _datatables_recruiter_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(457);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => ({
  root: {
    display: 'flex'
  }
}));
function UserDashboard() {
  const classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    item: true,
    xs: 12,
    md: 12,
    lg: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_recruiter_datatable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null)));
}

__signature__(UserDashboard, "useStyles{classes}", () => [useStyles]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\recruiter-dashboard.js");
  reactHotLoader.register(UserDashboard, "UserDashboard", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\recruiter-dashboard.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecruiterDatatable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(93);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(222);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(223);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(224);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(225);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(108);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(115);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(107);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(109);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(68);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(34);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(156);
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(256);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(216);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _views_stepper_recruiter_stepper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(458);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(13);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(459);
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(468);
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(86);
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(560);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(226);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(227);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





























const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  padBottom: {
    paddingBottom: '5px'
  }
}));

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"], _extends({}, other, {
    getInputRef: inputRef,
    onValueChange: values => {
      onChange({
        target: {
          name: props.name,
          value: values.value
        }
      });
    },
    thousandSeparator: true,
    isNumericString: true,
    prefix: "\u20B9"
  }));
}

NumberFormatCustom.propTypes = {
  inputRef: prop_types__WEBPACK_IMPORTED_MODULE_21___default.a.func.isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_21___default.a.string.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_21___default.a.func.isRequired
};

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_27__[/* default */ "a"], _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

function RecruiterDatatable() {
  const classes = useStyles();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_16__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const [getLatestStatus, setLatestStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getExpenseStatuses, setExpenseStatuses] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getEmployeeId, setEmployeeId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getEmployeeName, setEmployeeName] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getExpenseAmount, setExpenseAmount] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getCostCenters, setCostCenters] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedCostCenter, setSelectedCostCenter] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getHeads, setHeads] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedHead, setSelectedHead] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getFetchHeadId, setFetchHeadId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getRecruiterHRMapping, setRecruiterHRMapping] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getDays, setDays] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedClawbackDuration, setSelectedClawbackDuration] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getExpenseInfoHR, setExpenseInfoHR] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedDate, setSelectedDate] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(today);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const getAllCostCenter = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getCostCenter/')]);
      setCostCenters(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllExpenseStatus = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getExpenseStatus/')]);
      setExpenseStatuses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllHeads = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getHead/')]);
      setHeads(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRecruiterHRMapping = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getRecruiterHRMapping/')]);
      setRecruiterHRMapping(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllDays = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getShiftDays/')]);
      setDays(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllExpenseInfoHR = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/getExpenseInfoHR/', {
        email: userDetails.EmployeeEmailId
      })]);
      setExpenseInfoHR(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveNewJoineeExpenseInfo = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/saveNewJoineeExpenseInfo/', {
        RecruiterEmailId: userDetails.EmployeeEmailId,
        HrEmailId: userDetails.HrEmailID,
        EmployeeNumber: getEmployeeId,
        EmployeeName: getEmployeeName,
        DateofJoining: getSelectedDate,
        DimCostCenterId: getSelectedCostCenter,
        DimHeadId: getSelectedHead,
        ClawBackDurationInMonths: getSelectedClawbackDuration,
        TotalExpense: getExpenseAmount,
        DimExpenseStatusId: 1,
        TargetRecordCreatedBy: userDetails.EmployeeEmailId
      })]);

      if (response.status === 200) {
        onFileUpload();
        handleClose();
        getAllExpenseInfoHR();
        getCurrentStatus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentStatus = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/getJoiningBenefitsLatestStatus/', {
        email: userDetails.EmployeeEmailId
      })]);
      setLatestStatus(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllCostCenter());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllExpenseStatus());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllHeads());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllRecruiterHRMapping());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllDays());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getAllExpenseInfoHR());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__["trackPromise"])(getCurrentStatus());
  }, []);

  const EnteredEmployeeID = event => {
    setEmployeeId(event.target.value);
  };

  const EnteredEmployeeName = event => {
    setEmployeeName(event.target.value);
  };

  const EnteredExpenseAmount = event => {
    setExpenseAmount(event.target.value);
  };

  const SelectedCostCenter = event => {
    setSelectedCostCenter(event.target.value);
  };

  const SelectedHead = event => {
    setSelectedHead(event.target.value);
  };

  const SelectedClawbackDuration = event => {
    setSelectedClawbackDuration(event.target.value);
  };

  const SelectedDateOfJoining = date => {
    setSelectedDate(date);
  };

  const options = {
    searchPlaceholder: 'Search Shift Allowance',
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '400px',
    selectableRows: 'none',
    customToolbar: () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        title: "Add Shift Allowance"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
        onClick: handleClickOpen
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_19___default.a, null)));
    }
  };
  const [uploadedFile, setUploadedFile] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);

  const onFileChange = e => {
    setUploadedFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    // Create an object of formData 
    const formData = new FormData(); // Update the formData object 

    formData.append("PDFFile", uploadedFile, uploadedFile.name); // Details of the uploaded file 

    console.log(uploadedFile);
    uploadPDFFile(formData);
  };

  const uploadPDFFile = async formData => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/api/fileUpload/', formData)]);
      response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, getLatestStatus.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_stepper_recruiter_stepper__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    currentStatus: getLatestStatus,
    getExpenseInfoHR: getExpenseInfoHR
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.padBottom
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "Joining Benefits",
    data: getExpenseInfoHR,
    columns: _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_2__[/* RecruiterColumns */ "d"],
    options: options
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    id: "form-dialog-title"
  }, "Add New Employee Joining Benefits"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "empnumber",
    label: "Employee ID",
    type: "number",
    value: getEmployeeId || '',
    onChange: EnteredEmployeeID
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "emp name",
    label: "Employee Name",
    value: getEmployeeName || '',
    onChange: EnteredEmployeeName
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Cost Center"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "cc-label",
    id: "cost-center",
    value: getSelectedCostCenter,
    onChange: SelectedCostCenter
  }, getCostCenters.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimCostCenterId,
      value: option.DimCostCenterId
    }, option.DimCostCenter);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Head"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "head-label",
    id: "head",
    value: getSelectedHead,
    onChange: SelectedHead
  }, getHeads.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.DimHeadId,
      value: option.DimHeadId
    }, option.DimHead);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    className: classes.formControl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    id: "demo-simple-select-helper-label"
  }, "Clawback Duration in Months"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    labelId: "clawback-label",
    id: "clawback",
    value: getSelectedClawbackDuration,
    onChange: SelectedClawbackDuration
  }, getDays.map(option => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      key: option.Name,
      value: option.Day
    }, option.Day);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_24__[/* M */ "a"], {
    utils: _date_io_date_fns__WEBPACK_IMPORTED_MODULE_23__[/* default */ "a"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_25__[/* KeyboardDatePicker */ "a"], {
    disableToolbar: true,
    variant: "inline",
    format: "MM/dd/yyyy",
    margin: "normal",
    id: "date-picker-inline",
    label: "Date of Joining",
    value: getSelectedDate,
    onChange: SelectedDateOfJoining,
    KeyboardButtonProps: {
      'aria-label': 'select date'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    margin: "dense",
    id: "expense-amount",
    label: "Expense Amount",
    value: getExpenseAmount || '',
    onChange: EnteredExpenseAmount,
    name: "numberformat",
    InputProps: {
      inputComponent: NumberFormatCustom
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    id: "my-input",
    type: "file",
    onChange: onFileChange,
    placeholder: "Please Choose a file"
  }), getExpenseAmount.length > 6 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
    style: {
      color: 'red'
    }
  }, "Please input amount less than 10,00,000")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    onClick: saveNewJoineeExpenseInfo,
    variant: "contained",
    color: "primary",
    disabled: getEmployeeId === '' || getEmployeeName === '' || getSelectedCostCenter === '' || getSelectedClawbackDuration === '' || uploadedFile === null || getSelectedHead === '' || getExpenseAmount === '' || getExpenseAmount.length > 6
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    onClick: handleClose,
    variant: "outlined",
    color: "secondary"
  }, "Close"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_26__[/* default */ "a"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    open: alertOpen,
    autoHideDuration: 3000,
    onClose: handleAlertClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    onClose: handleClose,
    severity: "success"
  }, "Saved Successfully!")));
}

__signature__(RecruiterDatatable, "useStyles{classes}\nuseLocation{location}\nuseState{[open, setOpen](false)}\nuseState{[alertOpen, setAlertOpen](false)}\nuseState{[getLatestStatus, setLatestStatus]([])}\nuseState{[getExpenseStatuses, setExpenseStatuses]([])}\nuseState{[getEmployeeId, setEmployeeId]('')}\nuseState{[getEmployeeName, setEmployeeName]('')}\nuseState{[getExpenseAmount, setExpenseAmount]('')}\nuseState{[getCostCenters, setCostCenters]([])}\nuseState{[getSelectedCostCenter, setSelectedCostCenter]('')}\nuseState{[getHeads, setHeads]([])}\nuseState{[getSelectedHead, setSelectedHead]('')}\nuseState{[getFetchHeadId, setFetchHeadId]('')}\nuseState{[getRecruiterHRMapping, setRecruiterHRMapping]([])}\nuseState{[getDays, setDays]([])}\nuseState{[getSelectedClawbackDuration, setSelectedClawbackDuration]('')}\nuseState{[getExpenseInfoHR, setExpenseInfoHR]([])}\nuseState{[getSelectedDate, setSelectedDate](today)}\nuseEffect{}\nuseState{[uploadedFile, setUploadedFile](null)}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_16__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\recruiter-datatable.js");
  reactHotLoader.register(NumberFormatCustom, "NumberFormatCustom", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\recruiter-datatable.js");
  reactHotLoader.register(Alert, "Alert", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\recruiter-datatable.js");
  reactHotLoader.register(RecruiterDatatable, "RecruiterDatatable", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\recruiter-datatable.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecruiterStepper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(477);
/* harmony import */ var _material_ui_core_Step__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(475);
/* harmony import */ var _material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(476);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(315);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_StepConnector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(365);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(192);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(364);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_14__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
















const QontoConnector = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: '#784af4'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#784af4'
    }
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
})(_material_ui_core_StepConnector__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);
const useQontoStepIconStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  },
  active: {
    color: '#ffa808'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: {
    color: '#00c72e',
    zIndex: 1,
    fontSize: 25
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const {
    active,
    completed
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, {
      [classes.active]: active
    })
  }, completed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_8___default.a, {
    className: classes.completed
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.circle
  }));
}

__signature__(QontoStepIcon, "useQontoStepIconStyles{classes}", () => [useQontoStepIconStyles]);

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}));
function RecruiterStepper({
  currentStatus,
  getExpenseInfoHR
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [getSteps, setSteps] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);

  const getAndDisplayStatus = status => {
    switch (status) {
      case 1:
        setSteps(['Joining Benefit Submitted', 'Pending with HR']);
        setActiveStep(1);
        break;

      case 2:
        setSteps(['Joining Benefit Submitted', 'Disbursed']);
        setActiveStep(2);
        break;

      case 3:
        setSteps(['Shift Allowance Raised', 'Rejected by HR']);
        setActiveStep(1);
        break;
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getAndDisplayStatus(currentStatus[0].DimExpenseStatusId);
  }, [currentStatus, getExpenseInfoHR]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, getAndDisplayStatus.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    container: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    item: true,
    xs: 1
  }, getExpenseInfoHR.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    className: classes.card,
    style: {
      boxShadow: 'none',
      borderRadius: '0px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    style: {
      margin: '4px',
      fontWeight: 'bold',
      color: '#6D2077'
    }
  }, "Status of - ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_14___default.a, {
    strat: 0,
    end: getExpenseInfoHR[0].FactNewJoineeExpenseInfoId,
    duration: 1,
    useEasing: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    item: true,
    xs: 11
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    alternativeLabel: true,
    activeStep: activeStep,
    connector: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QontoConnector, null)
  }, getSteps.map(label => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Step__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    key: label
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    StepIconComponent: QontoStepIcon
  }, label))))))));
}

__signature__(RecruiterStepper, "useStyles{classes}\nuseState{[activeStep, setActiveStep](0)}\nuseState{[getSteps, setSteps]([])}\nuseEffect{}", () => [useStyles]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(QontoConnector, "QontoConnector", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\recruiter-stepper.js");
  reactHotLoader.register(useQontoStepIconStyles, "useQontoStepIconStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\recruiter-stepper.js");
  reactHotLoader.register(QontoStepIcon, "QontoStepIcon", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\recruiter-stepper.js");
  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\recruiter-stepper.js");
  reactHotLoader.register(RecruiterStepper, "RecruiterStepper", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\stepper\\recruiter-stepper.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HRRecruiterDatatable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(117);
/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(222);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(223);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(224);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(225);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(126);
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(228);
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(255);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(175);
/* harmony import */ var _material_ui_core_TextareaAutosize__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(329);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(192);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(34);
/* harmony import */ var _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(120);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(226);
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(227);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    overflow: 'hidden'
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 150
  },
  padBottom: {
    paddingBottom: '5px'
  },
  textArea: {
    width: '-webkit-fill-available',
    height: '90px !important',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px #6D2077',
    border: '1px solid transparent'
  }
}));
const GreenRadio = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
  root: {
    color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][400],
    '&$checked': {
      color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][600]
    }
  },
  checked: {}
})(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], _extends({
  color: "default"
}, props)));

function Alert(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

function HRRecruiterDatatable({
  getAllKPIValues
}) {
  const classes = useStyles();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_18__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const [getSelectedBenefitRow, setSelectedBenefitRow] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSubmittedJoiningBenefits, setSubmittedJoiningBenefits] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedRowInfo, setSelectedRowInfo] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getCostCenters, setCostCenters] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [getSelectedCostCenter, setSelectedCostCenter] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getRejectionComments, setRejectionComments] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [selectedValue, setSelectedValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('2');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const approvalsOptions = {
    searchPlaceholder: 'Search Joining Benefits',
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: '400px',
    selectableRows: 'none',
    onRowClick: rowData => {
      handleClickOpen();
      setSelectedBenefitRow(rowData);
      setSelectedCostCenter(getCostCenters.find(id => id.DimCostCenter === rowData[4]));
      setSelectedRowInfo(getSubmittedJoiningBenefits.find(id => id.FactNewJoineeExpenseInfoId === rowData[0]));
    }
  };

  const getAllCostCenter = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.get('/api/getCostCenter/')]);
      setCostCenters(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSubmittedJoiningBenefits = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.post('/api/getExpenseInfoHR/', {
        email: userDetails.EmployeeEmailId
      })]);
      setSubmittedJoiningBenefits(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveNewJoiningBenefit = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_16___default.a.post('/api/saveNewJoineeExpenseInfo/', {
        RecruiterEmailId: getSelectedRowInfo.RecruiterEmailId,
        HrEmailId: getSelectedRowInfo.HrEmailId,
        EmployeeNumber: getSelectedRowInfo.EmployeeNumber,
        EmployeeName: getSelectedRowInfo.EmployeeName,
        DateofJoining: getSelectedRowInfo.DateofJoining,
        DimCostCenterId: getSelectedCostCenter.DimCostCenterId,
        DimHeadId: getSelectedRowInfo.DimHeadId,
        ClawBackDurationInMonths: getSelectedRowInfo.ClawBackDurationInMonths,
        TotalExpense: getSelectedRowInfo.TotalExpense,
        DimExpenseStatusId: selectedValue,
        TargetRecordCreatedBy: userDetails.EmployeeEmailId
      })]);

      if (response.status === 200) {
        handleClose();
        getAllSubmittedJoiningBenefits();
        getAllKPIValues();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectComments = event => {
    setRejectionComments(event.target.value);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__["trackPromise"])(getAllCostCenter());
    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_17__["trackPromise"])(getAllSubmittedJoiningBenefits());
  }, [getAllKPIValues]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "Approve Joining Benefits",
    data: getSubmittedJoiningBenefits,
    columns: _utils_data_table_columns__WEBPACK_IMPORTED_MODULE_19__[/* HRColumnsRecruiter */ "b"],
    options: approvalsOptions
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: "xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    id: "form-dialog-title"
  }, "Select a Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    item: true,
    xs: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    "aria-label": "approval",
    name: "approval",
    value: selectedValue,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    value: "female",
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GreenRadio, {
      checked: selectedValue === '2',
      onChange: handleChange,
      value: "2",
      name: "radio-button-demo",
      inputProps: {
        'aria-label': '2'
      }
    }),
    label: "Approve"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    value: "female",
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      checked: selectedValue === '3',
      onChange: handleChange,
      value: "3",
      name: "radio-button-demo",
      inputProps: {
        'aria-label': '3'
      }
    }),
    label: "Reject"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
    item: true,
    xs: 8
  }, selectedValue === '3' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextareaAutosize__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    className: classes.textArea,
    "aria-label": "minimum height",
    onKeyDown: handleRejectComments,
    rowsMin: 5,
    placeholder: "Rejection Reason/Comments"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    variant: "contained",
    onClick: approveNewJoiningBenefit,
    color: "primary",
    disabled: selectedValue === '3' && getRejectionComments.length < 10
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    onClick: handleClose,
    variant: "outlined",
    color: "secondary"
  }, "Close"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    open: alertOpen,
    autoHideDuration: 3000,
    onClose: handleAlertClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    onClose: handleClose,
    severity: "success"
  }, "Saved Successfully!")));
}

__signature__(HRRecruiterDatatable, "useStyles{classes}\nuseLocation{location}\nuseState{[getSelectedBenefitRow, setSelectedBenefitRow]([])}\nuseState{[getSubmittedJoiningBenefits, setSubmittedJoiningBenefits]([])}\nuseState{[getSelectedRowInfo, setSelectedRowInfo]([])}\nuseState{[getCostCenters, setCostCenters]([])}\nuseState{[getSelectedCostCenter, setSelectedCostCenter]('')}\nuseState{[getRejectionComments, setRejectionComments]('')}\nuseState{[open, setOpen](false)}\nuseState{[alertOpen, setAlertOpen](false)}\nuseState{[selectedValue, setSelectedValue]('2')}\nuseEffect{}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_18__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-recruiter-datatable.js");
  reactHotLoader.register(GreenRadio, "GreenRadio", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-recruiter-datatable.js");
  reactHotLoader.register(Alert, "Alert", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-recruiter-datatable.js");
  reactHotLoader.register(HRRecruiterDatatable, "HRRecruiterDatatable", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\datatables\\hr-recruiter-datatable.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Album; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(364);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(552);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(553);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(474);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(192);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(551);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34);
/* harmony import */ var _material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(324);
/* harmony import */ var _material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(156);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};














const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9

  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  headingKPMG: {
    fontFamily: 'KPMG !important',
    letterSpacing: '2px'
  },
  fontKPMG: {
    fontFamily: "'Univers for KPMG' !important"
  }
}));
const cards = [{
  'id': 1,
  'name': 'Shift Allowance',
  'image': '../dist/images/people.jpg',
  'page': 'shift'
}, {
  'id': 2,
  'name': 'Joining Benefits',
  'image': '../dist/images/bonus.jpg',
  'page': 'recruiter'
}];
function Album() {
  const classes = useStyles();
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__[/* useHistory */ "g"])();
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__[/* useLocation */ "h"])();
  const userDetails = location.state.params;
  const userName = userDetails.EmployeeName.split(',');

  const routeChange = page => {
    let path = '';

    if (page === 'shift') {
      path = '/home';
      userDetails.page = 'shift';
      history.push(path, {
        params: userDetails
      });
    } else {
      path = '/home';
      userDetails.page = 'recruiter';
      history.push(path, {
        params: userDetails
      });
    }
  };

  const handleLogout = () => {
    console.log('you have been logged out. boo!');
    history.push('/login');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    style: {
      backgroundImage: `url(${"../dist/images/16317.png"})`,
      height: '100vh'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    color: "inherit",
    onClick: handleLogout,
    style: {
      color: "#fff",
      float: 'right'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_11___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: classes.cardGrid,
    maxWidth: "md",
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    component: "h1",
    variant: "h2",
    className: classes.headingKPMG,
    style: {
      marginBottom: '0.5em',
      color: '#fff'
    }
  }, "Welcome! ", userName[1] + ' ' + userName[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    container: true,
    spacing: 4,
    justify: "center"
  }, cards.map(card => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    item: true,
    key: card.id,
    xs: 12,
    sm: 6,
    md: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    className: classes.card
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    onClick: () => routeChange(card.page)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    className: classes.cardMedia,
    image: card.image,
    title: "Image title"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    className: classes.cardContent
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    gutterBottom: true,
    variant: "h4",
    component: "h2",
    className: classes.headingKPMG,
    style: {
      color: '#6D2077'
    }
  }, card.name))))))))));
}

__signature__(Album, "useStyles{classes}\nuseHistory{history}\nuseLocation{location}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_10__[/* useHistory */ "g"], react_router_dom__WEBPACK_IMPORTED_MODULE_10__[/* useLocation */ "h"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-central-tile.js");
  reactHotLoader.register(cards, "cards", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-central-tile.js");
  reactHotLoader.register(Album, "Album", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\views\\hr-central-tile.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(563);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(93);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(465);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(48);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(68);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(38);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};












const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(../dist/images/picture1.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#6D2077'
  },
  headingKPMG: {
    fontFamily: 'KPMG !important',
    color: '#6D2077'
  }
}));
function Login() {
  const classes = useStyles();
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__[/* useHistory */ "g"])();
  const [checkEmailInput, setEmailInput] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [getEmailFoundStatus, setEmailFoundStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleEmailChange = event => {
    if (getEmailFoundStatus === true) {
      setEmailFoundStatus(false);
    }

    setEmailInput(event.target.value.trim());
  };

  const checkEmailIdExist = async () => {
    try {
      const [response] = await Promise.all([axios__WEBPACK_IMPORTED_MODULE_9___default.a.post('/api/getEmpoyeeDetailsByEmail/', {
        email: checkEmailInput
      })]);

      if (response.data.length === 0) {
        setEmailFoundStatus(true);
      } else {
        setEmailFoundStatus(false);
        routeChange(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const routeChange = response => {
    let path = '';

    if (response.status === 200 && response.data[0].UserRole === 'HR') {
      path = '/hr_central_home';
      history.push(path, {
        params: response.data[0]
      });
    } else {
      path = '/home';
      history.push(path, {
        params: response.data[0]
      });
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    container: true,
    component: "main",
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    item: true,
    xs: false,
    sm: 4,
    md: 7,
    className: classes.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    item: true,
    xs: 12,
    sm: 8,
    md: 5,
    component: _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],
    elevation: 6,
    square: true,
    style: {
      backgroundColor: '#f0f8ff85'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.paper
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    component: "h1",
    variant: "h2",
    className: classes.headingKPMG
  }, "HR-Central"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    className: classes.avatar
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Enter Email Address",
    name: "email",
    onChange: handleEmailChange
  }), getEmailFoundStatus === true && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    style: {
      color: 'red',
      fontWeight: 'bold'
    }
  }, "Sorry Email ID not found. Please check and try again."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit,
    onClick: checkEmailIdExist,
    disabled: checkEmailInput === ''
  }, "Sign In"))));
}

__signature__(Login, "useStyles{classes}\nuseHistory{history}\nuseState{[checkEmailInput, setEmailInput]('')}\nuseState{[getEmailFoundStatus, setEmailFoundStatus](false)}", () => [useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_10__[/* useHistory */ "g"]]);

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\login.js");
  reactHotLoader.register(Login, "Login", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\login.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(554);
/* harmony import */ var _material_ui_core_Backdrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(472);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'rgba(234, 234, 234, 0.2)',
    color: '#6D2077'
  }
}));

function BusyIndicator() {
  const classes = useStyles();
  const {
    promiseInProgress
  } = Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_1__["usePromiseTracker"])();
  return promiseInProgress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Backdrop__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    className: classes.backdrop,
    open: promiseInProgress
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    color: "inherit"
  }));
}

__signature__(BusyIndicator, "useStyles{classes}\nusePromiseTracker{{ promiseInProgress }}", () => [useStyles, react_promise_tracker__WEBPACK_IMPORTED_MODULE_1__["usePromiseTracker"]]);

const _default = BusyIndicator;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\busyIndicator.js");
  reactHotLoader.register(BusyIndicator, "BusyIndicator", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\busyIndicator.js");
  reactHotLoader.register(_default, "default", "C:\\Users\\vinayaggarwal\\source\\repos\\HR_Central\\HR_Central_App\\react_app\\components\\utils\\busyIndicator.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(58)(module)))

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(443);
/* harmony import */ var _components_utils_busyIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(467);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_utils_busyIndicator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null)), document.getElementById("content"));

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(491);
            var content = __webpack_require__(351);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      351,
      function () {
        content = __webpack_require__(351);

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ 538:
/***/ (function(module, exports) {

module.exports = require("pdfmake/build/pdfmake.js");

/***/ }),

/***/ 539:
/***/ (function(module, exports) {

module.exports = require("../../pdfmake/vfs_fonts");

/***/ }),

/***/ 540:
/***/ (function(module, exports) {

module.exports = require("../../canvg/index.js");

/***/ }),

/***/ 541:
/***/ (function(module, exports) {

module.exports = require("xlsx");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map