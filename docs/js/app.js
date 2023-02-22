const ingresos = [
    new Ingreso('Salario',600),
    new Ingreso('Venta garage',50)
];
const egresos = [
    new Egreso('Renta departamento',200),
    new Egreso('Ropa',40)
]

cargarApp = () => {
    cargarCabecero();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/ totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
    cargarIngresos();
    cargarEgresos();
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD', minimumFractionDigits:2})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:0})
}

const cargarIngresos = () => {
    let ingreso_elemento = '';
    for(let ingreso of ingresos){
        ingreso_elemento += crearIngresoElemento(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingreso_elemento;
}

const crearIngresoElemento = (ingreso) =>{
    let ingreso_elemento = 
    `
    <div class="elemento limpiarEstilos">
        <div class="elemento-descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento-valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento-eliminar">
                <button class="elemento-eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.idIngreso})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingreso_elemento;
}

const eliminarIngreso = (id) => {
    let eliminar_elemento = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(eliminar_elemento,1);
    cargarCabecero();
}

const cargarEgresos = () => {
    let egreso_elemento = '';
    for(let egreso of egresos){
        egreso_elemento += crearEgresoElemento(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egreso_elemento;
}

const crearEgresoElemento = (egreso) =>{
    let egreso_elemento = 
    `
    <div class="elemento limpiarEstilos">
        <div class="elemento-descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento-valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento-porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                    <div class="elemento-eliminar">
                        <button class="elemento-eliminar--btn">
                            <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.idEgreso})"></ion-icon>
                        </button>
                    </div>
            </div>
    </div>
    `;
    return egreso_elemento;
}

const eliminarEgreso = (id) => {
    let eliminar_elemento = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(eliminar_elemento,1);
    cargarCabecero();
}

let agregarDato = () => {
    let formulario = document.forms['formulario'];
    let tipo_ingreso = formulario['izquierda-btn'];
    let tipo_egreso = formulario['derecha-btn'];
    console.log(tipo_egreso,tipo_ingreso);
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo_ingreso.checked){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
        } else if (tipo_egreso.checked){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
        }
    }
}