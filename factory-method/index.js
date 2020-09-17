// factory pattern
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Abstract class, which defines, all the methods for the concrete classes.
 */
var Computer = /** @class */ (function () {
    function Computer() {
    }
    Computer.prototype.toString = function () {
        return "\"RAM= " + this.getRAM() + ", HDD=" + this.getHDD() + ", CPU=" + this.getCPU();
    };
    return Computer;
}());
/**
 * concrete class which extends the abstract class
 */
var PC = /** @class */ (function (_super) {
    __extends(PC, _super);
    function PC(ram, hdd, cpu) {
        var _this = _super.call(this) || this;
        _this.ram = ram;
        _this.hdd = hdd;
        _this.cpu = cpu;
        return _this;
    }
    PC.prototype.getRAM = function () {
        return this.ram;
    };
    PC.prototype.getHDD = function () {
        return this.hdd;
    };
    PC.prototype.getCPU = function () {
        return this.cpu;
    };
    return PC;
}(Computer));
/**
 * concrete class which extends the abstract class
 */
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server(ram, hdd, cpu) {
        var _this = _super.call(this) || this;
        _this.ram = ram;
        _this.hdd = hdd;
        _this.cpu = cpu;
        return _this;
    }
    Server.prototype.getRAM = function () {
        return this.ram;
    };
    Server.prototype.getHDD = function () {
        return this.hdd;
    };
    Server.prototype.getCPU = function () {
        return this.cpu;
    };
    return Server;
}(Computer));
/**
 * An consumer class, which helps the client application to get the desired output.
 */
var ComputerFactory = /** @class */ (function () {
    function ComputerFactory() {
    }
    ComputerFactory.prototype.getComputer = function (type, ram, hdd, cpu) {
        if (type === 'PC') {
            return new PC(ram, hdd, cpu);
        }
        else if (type === 'Server') {
            return new Server(ram, hdd, cpu);
        }
    };
    return ComputerFactory;
}());
var computerFactory = new ComputerFactory();
var pc = computerFactory.getComputer("PC", "2 GB", "500 GB", "2.4 GHz");
var server = computerFactory.getComputer("Server", "20 GB", "10 TB", "6 GHz");
console.log(pc);
console.log(server);
