// import { shallowMount } from "@vue/test-utils";
import { check } from "./auth.js";
import { addStorageKeyObject, delStorageKeyObject } from "./tools.js";
describe("auth test", () => {
    it("empty check", () => {
        //空的时候检测校验
        delStorageKeyObject("CURRENT_USER", "authority", window.sessionStorage);
        expect(check(['user'])).toEqual(false);
        expect(check(['admin'])).toEqual(false);
    });
    it("user check", () => {
        //user时候检测校验
        delStorageKeyObject("CURRENT_USER", "authority", window.sessionStorage);
        addStorageKeyObject("CURRENT_USER", "authority", 'user', window.sessionStorage);
        expect(check(['user'])).toEqual(true);
        expect(check(['admin'])).toEqual(false);
    });
    it("admin check", () => {
        //admin时候检测校验
        delStorageKeyObject("CURRENT_USER", "authority", window.sessionStorage);
        addStorageKeyObject("CURRENT_USER", "authority", 'admin', window.sessionStorage);
        expect(check(['user'])).toEqual(false);
        expect(check(['admin'])).toEqual(true);
    });
});