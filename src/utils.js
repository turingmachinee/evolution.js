export default class Utils {
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}