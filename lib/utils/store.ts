/**
 * Inspired from node-localstorage
 * Code: https://github.com/lmaccherone/node-localstorage
 */

import { join, dirname } from "path";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
} from "fs";
import EventEmitter from "events";
import { sync as writeFileSync } from "write-file-atomic";

/**
 * @Important - Please replace this string with something
 *  that won't be used as a key
 */
const EMPTY_STRING_MOCK = "EMPTY_STRING_MOCK";
const escaper = (str: string) => (str === "" ? EMPTY_STRING_MOCK : str);

interface infusedKey {
	key: string;
	index: number;
}

class StoreEvent {
	constructor(
		public key: string | null,
		public oldValue: string | null,
		public newValue: string | null,
		public url: string
	) {}
}

export class Store extends EventEmitter.EventEmitter {
	private eventURL: string = `pid:${process.pid}`;
	private keys: string[] = [];
	private metaKeyMap = new Map<string, infusedKey>();

	constructor(public location: string) {
		super();

		try {
			const stats = statSync(location);
			if (stats !== null && !stats.isDirectory())
				throw new Error(
					`A file exists at the location - ${this.location}`
				);
			readdirSync(location).forEach((v, i) => {
				const decodedKey = decodeURIComponent(v);
				this.keys.push(decodedKey);
				this.metaKeyMap.set(decodedKey, { key: v, index: i });
			});
		} catch (e) {
			const error = e as NodeJS.ErrnoException;
			if (error.code !== "ENOENT") throw e;
			mkdirSync(this.location, { recursive: true });
		}
	}

	public setItem(key: string, value: string) {
		const hasListeners = this.listenerCount("store");
		const oldVal = hasListeners ? this.getItem(key) : null;

		const escapedKey = encodeURIComponent(escaper(key));
		const filepath = join(this.location, escapedKey);

		const metaKey = this.metaKeyMap.get(escapedKey);
		if (!metaKey) {
			const newMetaKey: infusedKey = {
				key: escapedKey,
				index: this.keys.push(escapedKey) - 1,
			};
			this.metaKeyMap.set(escapedKey, newMetaKey);
		}
		writeFileSync(filepath, value, { encoding: "utf-8" });

		if (hasListeners) {
			const event = new StoreEvent(
				escapedKey,
				oldVal,
				value,
				this.eventURL
			);
			return this.emit("store", event);
		}
		return true;
	}

	public getItem(key: string) {
		const searchKey = encodeURIComponent(escaper(key));
		const filepath = join(this.location, searchKey);
		try {
			return readFileSync(filepath, "utf-8");
		} catch (e) {
			return null;
		}
	}

	public delete(key: string) {
		const escapedKey = encodeURIComponent(escaper(key));
		const metaKey = this.metaKeyMap.get(escapedKey);

		if (metaKey) {
			const hasListeners = this.listenerCount("store");
			const oldVal = hasListeners ? this.getItem(key) : null;

			this.keys.splice(metaKey.index, 1);
			this.metaKeyMap.delete(escapedKey);
			this.metaKeyMap.forEach(v => {
				if (v.index > metaKey.index) v.index -= 1;
			});

			const filepath = join(this.location, escapedKey);
			rmSync(filepath, { recursive: true });

			if (hasListeners) {
				const event = new StoreEvent(
					escapedKey,
					oldVal,
					null,
					this.eventURL
				);
				return this.emit("store", event);
			}
			return true;
		}
	}

	public getKey(num: number) {
		const key = this.keys[num];
		return key === EMPTY_STRING_MOCK ? "" : key;
	}

	public clear() {
		rmSync(this.location);
		this.eventURL = `pid:${process.pid}`;
		this.keys = [];
		this.metaKeyMap = new Map<string, infusedKey>();

		const hasListeners = this.listenerCount("store");
		if (hasListeners) {
			const event = new StoreEvent(null, null, null, this.eventURL);
			return this.emit("store", event);
		}
		return true;
	}
}

/**
 * Fetches the root of the repository to make a store.
 */
export const root = () => {
	let dir = __dirname;
	while (!existsSync(join(dir, "package.json"))) dir = dirname(dir);
	return dir;
};
