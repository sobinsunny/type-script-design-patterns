// Builder pattern (Builder, Director, concrete classes)
var PC = /** @class */ (function () {
    function PC() {
    }
    PC.prototype.setCPU = function (cpu) {
        this.cpu = cpu;
    };
    PC.prototype.setMemory = function (memory) {
        this.memory = memory;
    };
    PC.prototype.setHDD = function (hdd) {
        this.hdd = hdd;
    };
    return PC;
}());
var Director = /** @class */ (function () {
    function Director() {
    }
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    Director.prototype.makePC = function () {
        this.builder.setCPU("2.7 GHz");
        this.builder.setMemory("8 GB");
        this.builder.setHDD("250 GB");
    };
    Director.prototype.makeServer = function () {
        this.builder.setCPU("6 GHz");
        this.builder.setMemory("20 GB");
        this.builder.setHDD("10 TB");
    };
    Director.prototype.getProduct = function () {
        return this.builder;
    };
    return Director;
}());
var director = new Director();
director.setBuilder(new PC());
director.makePC();
console.log(director.getProduct());
director.makeServer();
console.log(director.getProduct());
