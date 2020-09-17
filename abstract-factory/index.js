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
var Computer = /** @class */ (function () {
    function Computer() {
    }
    Computer.prototype.toString = function () {
        return "\"RAM= " + this.getRAM() + ", HDD=" + this.getHDD() + ", CPU=" + this.getCPU();
    };
    return Computer;
}());
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
var PCFactory = /** @class */ (function () {
    function PCFactory(ram, hdd, cpu) {
        this.ram = ram;
        this.hdd = hdd;
        this.cpu = cpu;
    }
    PCFactory.prototype.createComputer = function () {
        return new PC(this.ram, this.hdd, this.cpu);
    };
    return PCFactory;
}());
var ServerFactory = /** @class */ (function () {
    function ServerFactory(ram, hdd, cpu) {
        this.ram = ram;
        this.hdd = hdd;
        this.cpu = cpu;
    }
    ServerFactory.prototype.createComputer = function () {
        return new Server(this.ram, this.hdd, this.cpu);
    };
    return ServerFactory;
}());
var ComputerFactory = /** @class */ (function () {
    function ComputerFactory() {
    }
    ComputerFactory.prototype.getComputer = function (factory) {
        return factory.createComputer();
    };
    return ComputerFactory;
}());
var computerFactory = new ComputerFactory();
var pc = computerFactory.getComputer(new PCFactory("2 GB", "500 GB", "2.4 GHz"));
var server = computerFactory.getComputer(new ServerFactory("20 GB", "10 TB", "6 GHz"));
console.log(pc);
console.log(server);
