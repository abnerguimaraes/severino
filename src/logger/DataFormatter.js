"use stric"

module.exports = DataFormatter;

function DataFormatter(){
  this.VERSION = '2023-04-14';

  this.getNow = function(){
    const date = Date.now();
    const dataObj = new Date(date);

    const ano = dataObj.getFullYear();
    let mes = (dataObj.getMonth()+1).toString();
    mes = mes.padStart(2, '0');

    let dia = dataObj.getDate().toString();
    dia = dia.padStart(2, '0');

    let hora = dataObj.getHours().toString();
    hora = hora.padStart(2, '0');

    let minuto = dataObj.getMinutes().toString();
    minuto = minuto.padStart(2, '0');

    let segundo = dataObj.getSeconds().toString();
    segundo = segundo.padStart(2, '0');

    const agora = ano + '/' + mes + '/' + dia + ' - ' + hora + ':' + minuto + ":" + segundo;

    return agora;
  }

}