function getCuotaMinima(productos = [], interes = 0, plazo = 1){
  productos.forEach((producto) => {
    for(let i = 0; i < plazo; i++){

    }
  })
}

export const moneyFormat = (data = []) =>{
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
    const valorProducto = producto.valor
    const plazo = producto.plazo || 1
    const interes = (plazo <= 1 || plazo == undefined) ? 0 : producto.interes
    const cuotaMinima_ = (producto.valor / plazo)

    for (let i = 0; i < plazo; i++) {
      const _interes = producto.valor * interes
      const _total = producto.valor + _interes
      const tempPlazo = (plazo - (i))
      // const cuotaMinima = tempPlazo > 0 ? (_total / tempPlazo) : (_total / 1)
      const cuotaMinima = cuotaMinima_ + (producto.valor * interes)
      historia.push({
        mes: i + 1,
        valor: producto.valor,
        interes: _interes,
        total: _total,
        cuotaMinima: cuotaMinima,
      })
      
      producto.valor = (producto.valor + _interes) - cuotaMinima
    }
    let suma = {
      mes: "#",
      valor: valorProducto,
      interes: 0,
      cuotaMinima: 0,
      total: 0
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