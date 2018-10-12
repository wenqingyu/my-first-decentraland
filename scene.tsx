import * as DCL from 'decentraland-api'

const axios = require('axios')

// Ground board
let grndPosition: any = { x: 5, y: 0, z: 5 }

// Ads billboard setting
let bgPositionA: any = { x: 5, y: 5.2, z: 3.95 }
let bgPositionB: any = { x: 5, y: 5.2, z: 4 }
let cntPositionA: any = { x: 5, y: 5, z: 3.95 }
let cntPositionB: any = { x: 5, y: 5, z: 4 }

let bgScale: any = { x: 10, y: 7, z: 7 }
let cntScale: any = { x: 9.5, y: 5, z: 5 }
let grndScale: any = 10


/** Ads config */
// let adsBg = 'materials/senseManaBg_1.jpg'
let adsBg = 'materials/background/bg_club_A.jpg' 


// let adsImg = 'materials/senseManaAds.png'
// let adsImg = 'materials/adsContent/land_auction.png'
let adsImgA = 'materials/adsContent/senseManaAds.png'
let adsImgB = 'materials/adsContent/senseManaAds.png'

// Ads 
let grndImg = 'materials/background/bg_club_B.jpg'



// OracleInteraction
const url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR" 



export default class adsScene extends DCL.ScriptableScene {

  state = {
    ETH_Price: "$????/ETH",
    time: new Date().toLocaleString()
  }

  sceneDidMount() {
    setInterval(this.getPriceUpdate(), 10000)
  }

  getPriceUpdate() {
    axios.get(url)
      .then( (response:any) => {
        this.state.time = new Date().toLocaleString()
        this.state.ETH_Price = "$" + response.data.USD + "/ETH"
        console.log(this.state)
      })
      .catch( (error:any) => {
        console.log(error)
      });
  }


  async render() {
    // const { time } = this.state

    return (
      <scene >
      <material
        id="senseManaGrnd"
        albedoTexture={grndImg}
        hasAlpha
      />

      <material
        id="senseManaCntA"
        // albedoTexture={adsImg}
        albedoTexture={adsImgA}
        hasAlpha
      />

      <material
        id="senseManaCntB"
        albedoTexture={adsImgB}
        hasAlpha
      />

      <material
        id="senseManaBg"
        albedoTexture={adsBg}
        hasAlpha
      />

      {/* Ground board */}
      <plane
      position={grndPosition}
      rotation={{ x: 90, y: 0, z: 0 }}  
      scale={grndScale}
      // transition={{ rotation: { duration: interval, timing: 'ease-in' } }}
      material="#senseManaGrnd"
      />

      {/* A side Background */}
      <plane
      position={bgPositionA}
      // rotation={{ x: 360, y: 180, z: 0 }}
      scale={bgScale}
      material="#senseManaBg"
      />


      {/* A side content */}
      <plane
      position={cntPositionA}
      // rotation={{ x: 360, y: 180, z: 0 }}
      // rotation={{ x: 0, y: 0, z: 0 }}
      scale={cntScale}
      material="#senseManaCntA"
      />

      {/* B side Background */}
      <plane
      position={bgPositionB}
      rotation={{ x: 360, y: 180, z: 0 }}
      scale={bgScale}
      material="#senseManaBg"
      />


      {/* B side content */}
      <plane
      position={cntPositionB}
      rotation={{ x: 360, y: 180, z: 0 }}
      // rotation={{ x: 0, y: 0, z: 0 }}
      transition={{
        rotation: { duration: 10000, timing: "ease-in" }
      }}
      scale={cntScale}
      material="#senseManaCntB"
      />
        />
    

      />
    </scene>
    )
  }
}
