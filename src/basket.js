const inventory = require('./inventory.js')

class Basket {
  constructor(capacity = 10) {
    this.basket = []
    this.capacity = capacity
  }

  addToBasket(sku, quantity) {
    const addedBagel = inventory.find((bagel) => bagel.sku === sku)
    const pushQuantity = quantity

    if (addedBagel) {
      const basket = new Basket()
      for (let i = 0; i < pushQuantity; i++) {
        this.basket.push(addedBagel)
      }
      return basket
      // return addedBagel
    } else {
      return 'this bagel does not exist'
    }
  }

  removeFromBasket(sku) {
    const removedBagelList = this.basket.filter((bagel) => bagel.sku !== sku)
    const removedBagel = (bagel) => bagel.sku === sku

    const index = this.basket.findIndex(removedBagel)

    if (index === -1) {
      return 'this bagel is not in your basket'
    } else {
      this.basket = removedBagelList
      // const updatedBasket = new Basket()
      // this.basket.splice(index, 1)
      return removedBagelList
    }
  }

  //also enables the capacity to increase
  checkBasketCapacity() {
    const basket = new Basket()
    return basket.capacity
  }

  displayPrice(sku) {
    //filter inventory
    const bagelPrice = inventory.filter((bagel) => bagel.sku === sku)
    //add to a basket to store it so that function can check the price
    for (let i = 0; i < bagelPrice.length; i++) {
      //should only have one: can only check one at a time
      return bagelPrice[i].price
    }
  }

  calculateFrequency() {
    // let frequency = new Frequency()
    let frequency = {
              BGLO: 0,
              BGLP: 0,
              BGLE: 0,
              COF:0
            }

    //Update frequency
    this.basket.forEach((item) => {
      if (item.sku === 'BGLO') {
        //increase count of item
        frequency.BGLO += 1
      } else if (item.sku === 'BGLP') {
        //increase count of item
        frequency.BGLP += 1
      } else if (item.sku === 'BGLE') {
        //increase count of item
        frequency.BGLE += 1
      } else if (item.sku === 'COF') {
        //increase count of item
        frequency.COF += 1
      }
    })

    return frequency

  }

  calculateBGLODiscount() {
    
    const frequency = this.calculateFrequency()
    const remainder = frequency.BGLO % 6
    const bundleItems = frequency.BGLO - remainder
    const numBundles = bundleItems / 6

    const bundlePrice = 2.49 * numBundles
    const individualPrice = 0.49 * remainder

    const totalBGLOCost = bundlePrice + individualPrice
    const fixedTotal = totalBGLOCost.toFixed(2)

    return fixedTotal
  }

  calculateBGLEDiscount() {
    const frequency = this.calculateFrequency()

    const remainder = frequency.BGLE % 6
    const bundleItems = frequency.BGLE - remainder
    const numBundles = bundleItems / 6

    const bundlePrice = 2.49 * numBundles
    const individualPrice = 0.49 * remainder

    const totalBGLOCost = bundlePrice + individualPrice
    const fixedTotal = totalBGLOCost.toFixed(2)
 

    console.log('fixedTotal: BGLE frewquency =6', fixedTotal)
    return fixedTotal
  }

  calculateBGLPDiscount() {
    const frequency = this.calculateFrequency()

    const remainder = frequency.BGLP % 12
    const bundleItems = frequency.BGLP - remainder
    const numBundles = bundleItems / 12

    const bundlePrice = 3.99 * numBundles
    const individualPrice = 0.39 * remainder

    const totalCost = bundlePrice + individualPrice
    const fixedTotal = totalCost.toFixed(2)
    console.log('totalCost:', fixedTotal)
    return fixedTotal
  }

  calculateCOFDiscount() {
    const frequency = this.calculateFrequency()
    return frequency.COF * 0.99

    //TODO: get code to work. Implement logic for if quantity.cof > remainder and refactor

    // let coffeeDeal = 0
    // const cofRemainder = frequency.COF % remainder
    // const cofBundleItems = frequency.COF - cofRemainder
    // const numCofBundles = bundleItems / remainder

    // //this.remainder: access from BGLP
    // if (
    //   cofRemainder === this.remainder ||
    //   cofBundleItems === this.remainder ||
    //   frequency.COF === this.remainder
    // )
    // {
    //   coffeeDeal = 1 * this.remainder
    //   console.log('coffeeDeal:', coffeeDeal)
    // }
    // //hopefully :)
    // const totalCost = coffeeDeal + cofRemainder
    // const fixedTotal = totalCost.toFixed(2)
    //   console.log('totalCost:', fixedTotal)
    //   return fixedTotal
  }
 
  calculateTotal() {
    const frequency = this.calculateFrequency()

    let finalPrice = 0

    const priceTotals = []

    priceTotals.push(Number(this.calculateBGLODiscount()))
    priceTotals.push(Number(this.calculateBGLEDiscount()))
    priceTotals.push(Number(this.calculateBGLPDiscount()))
    priceTotals.push(Number(this.calculateCOFDiscount()))

    for (let i = 0; i < priceTotals.length; i++) {
      finalPrice += priceTotals[i]
    }

    console.log('calculateTotal() finalPrice:', finalPrice.toFixed(2))

    return finalPrice.toFixed(2)
  }

}

module.exports = {
  Basket
}

