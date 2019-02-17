const fs = require('fs');
let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
};


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    return listadoPorHacer;
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
};

const actualizas = (descripcion, completado = true) => {
    cargarDB();
    //findIndex retorna el valor del indice si lo encuentra si no encuentra nada retorna cero
    let index = listadoPorHacer.findIndex(tarea => {
        //campo descripción del objeto que se carga
        return tarea.descripcion === descripcion
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();
    //findIndex retorna el valor del indice si lo encuentra si no encuentra nada retorna cero
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    });
    if (index >= 0) {
        //campo descripción del objeto que se carga
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
};

module.exports = {
    crear,
    getListado,
    actualizas,
    borrar
};