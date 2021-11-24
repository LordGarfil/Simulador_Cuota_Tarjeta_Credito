function getCuotaMinima(productos = [], interes = 0, plazo = 1){
  productos.forEach((producto) => {
    for(let i = 0; i < plazo; i++){

    }
  })
}

const moneyFormat = (data = []) =>{
  return new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});
}

export function getTotal(productos = []) {
  const resultado = []
  const historia = []
  const money = moneyFormat()

  productos.forEach((producto) => {
    const plazo = producto.plazo || 1
    const interes = (plazo <= 1 || plazo == undefined) ? 0 : producto.interes

    for (let i = 0; i < plazo; i++) {
      const _interes = producto.valor * interes
      const _total = producto.valor + _interes
      const tempPlazo = (plazo - (i))
      const cuotaMinima = tempPlazo > 0 ? (_total / tempPlazo) : (_total / 1)
      historia.push({
        mes: i + 1,
        valor: money.format(Math.round(producto.valor)),
        interes: money.format(Math.round(_interes)),
        total: money.format(Math.round(_total)),
        cuotaMinima: money.format(Math.round(cuotaMinima)),
      })
      producto.valor = (producto.valor + _interes) - cuotaMinima
    }
    let suma = {
      interes: 0,
      cuotaMinima: 0
    }
    historia.forEach(item => {
      suma.interes += item.interes
      suma.cuotaMinima += item.cuotaMinima
    })
    resultado.push({
      producto: producto.nombre,
      historia,
      total: suma
    })
  })
  return resultado
}