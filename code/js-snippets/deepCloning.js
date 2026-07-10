// creating deep clone of an complex object using desructuring

const product = {
  name: "Customise your 16‑inch MacBook Pro - Space Grey",
  desc: [
    "2.4GHz 8-core 9th-generation I,ntel Core i9 processor, Turbo Boost up to 5.0GHz",
    "32GB 2666MHz DDR4 memory",
    "AMD Radeon Pro 5600M with 8GB of HBM2 memory",
    "8TB SSD storage",
    "16-inch Retina display with True Tone",
    "Four Thunderbolt 3 ports",
    "Touch Bar and Touch ID Backlit Magic Keyboard - US English"
  ],
  basePrice: 239900,
  components: [
    {
      id: 1,
      title: "Processor",
      varients: [
        {
          id: 1,
          name: "2.3GHz 8-core 9th-generation Intel Core i9 processor, Turbo Boost up to 4.8GHz",
          price: 0,
          selected: true
        },
        {
          id: 2,
          name: "2.4GHz 8-core 9th-generation Intel Core i9 processor, Turbo Boost up to 5.0GHz",
          price: 20000,
          selected: false
        }
      ]
    },
    {
      id: 2,
      title: "Memory",
      varients: [
        {
          id: 1,
          name: "16GB 2666MHz DDR4 memory",
          price: 0,
          selected: true
        },
        {
          id: 2,
          name: "32GB 2666MHz DDR4 memory",
          price: 40000,
          selected: false
        },
        {
          id: 3,
          name: "64GB 2666MHz DDR4 memory",
          price: 80000,
          selected: false
        }
      ]
    }
  ]
}

const newProduct = { ...product };
console.log(newProduct === product);

let finalDesc = newProduct.desc.map(d => {
  return d
})
newProduct.desc = finalDesc;
console.log(newProduct.desc === product.desc);

let finalComponents = newProduct.components.map(comp => {
  return comp.varients.map(vart => {
    return vart;
  })
})

newProduct.components = finalComponents;
console.log(newProduct.components[1].varients === product.components[1].varients);
