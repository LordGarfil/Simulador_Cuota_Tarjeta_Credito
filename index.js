import { getTotal } from "./app.js"

window.onload = function () {
  const app = new App()

  const productForm = document.querySelector('.config-container')
  productForm.onsubmit = function(e){
    e.preventDefault()
    const inputs = productForm.querySelectorAll('input')
    const _inputs = {}

    inputs.forEach(input =>{
      const key = input.name
      const value = input.value
      _inputs[key] = value
    })
    console.log(_inputs)
    app.setData(_inputs)
    app.addRowsData()
  }
}

class App {
  constructor(producto = null, valor = null, interes = null, plazo = null) {
    this.producto = producto
    this.valor = valor
    this.interes = interes
    this.plazo = plazo
  }

setData(data){
  this.producto = data.producto
  this.valor = parseFloat(data.valor)
  this.interes = checkNumberFormat(data.interes)
  this.plazo = parseInt(data.plazo)
}

addRowsData(){
  const producto = [
  {
    nombre: this.producto,
    valor: this.valor,
    interes: this.interes,
    plazo: this.plazo,
  },
]
  this.clearTable()
  const historia = getTotal(producto)
  const table = document.querySelector('table[name=response] tbody')
  historia.forEach(item => {
    const _historia = item.historia
    _historia.forEach(element =>{
      const tr = `
    <td>${element.mes}</td>
    <td>${element.valor}</td>
    <td>${element.interes}</td>
    <td>${element.total}</td>
    <td>${element.cuotaMinima}</td>
    `
    table.innerHTML += tr
    })
  })
}

clearTable(){
  const table = document.querySelector('table[name=response] tbody')
  table.innerHTML = null
}

}

function checkNumberFormat(number){
  if(number.toString().includes(',')){
      return parseFloat(number.toString().replace(',', '.'))
    }

   return number 

}