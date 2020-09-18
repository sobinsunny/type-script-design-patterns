/**
 * The adapter pattern introduces abstract class, to make two or more incompatible interfaces look similar via abstract class
 * e.g. Both Mac and DELL has two different ports to connect displays.
 * But the adapter class introduce an wrapper for both the devices to connect "VGA connector"
 * */

interface VGA {
    connectDockToVGA()
}

interface ThunderBolt {
    connectDockerToThunderBolt()
}

class DELL implements VGA {
        connectDockToVGA() {
            console.log('Connected VGA port....');
        }
}

class Mac implements ThunderBolt {
    connectDockerToThunderBolt() {
        console.log('Connect to thunderbolt port...');
    }
}

class MacThunderBoltToVGAAdapter implements VGA {
    private macBook: Mac

    constructor (macBook: Mac) {
        this.macBook = macBook;
    }

    connectDockToVGA() {
        console.log('VGA is converted to adapt thunderbolt...');
        this.macBook.connectDockerToThunderBolt();
    }
}

const dellLaptop = new DELL();
dellLaptop.connectDockToVGA();

const macVGAAdapter = new MacThunderBoltToVGAAdapter(new Mac());
macVGAAdapter.connectDockToVGA();