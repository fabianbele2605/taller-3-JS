// funcion para agregar productos
async function agregarProductos(producto) {
    try {
        const responseAll = await fetch('http://localhost:3000/productos');
        const totalProductos = await responseAll.json();
        const maxID = totalProductos.reduce((max, productos) => Math.max(max, parseInt(productos.id) || 0), 0);
        const nuevoId = maxID + 1;

        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({ id: nuevoId.toString(), ...producto, is_estado: true })
        });

        if (!response.ok) {
            throw new Error('no se pudo agregar el producto');
        }

        const nuevoProducto = await response.json();
        alert('Prodcuto agregado exitosamente!');
        return nuevoProducto;
    } catch (error) {
        console.error('Error al agregar producto:', error);
        document.getElementById('form-error').textContent = error.message;
        return null
    }
}

// funcion para eliminar productos

async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ is_estado: false, debaja: true })
        });

        if(!response.ok) {
            throw new Error('Todavia no se ah dado de baja el producto');
        }

        alert('Producto Eliminado!');
        obtenerProductosDisponibles();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto');
    }
}

// fucnion para actualizar productos

async function actualizarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({ is_estado: true, update: true})
        })
    }
}

// funcion de obtener los productos

async function obtenerProductosDisponibles() {
    try {
        const response = await fetch('http://localhost:3000/productos?is_estado=true');
        if(!response.ok) {
            throw new Error('No se puedieron obtener los productos disponibles');
        }

        const productosDisponibles = await response.json();

        const tableBody = document.getElementById('producto-table-body');
        tableBody.innerHTML = '';

        productosDisponibles.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                    <button onclick="eliminarProducto">Eliminar</button>
                    <button></button>
                    <button></button>
                </td>
                `;
                tableBody.appendChild(row);
        });
    } catch (error) {

    }
}

// funcion para agregar los prodcutos al formulario

async function handleAddProduct() {
    document.getElementById('form-error').textContent = '',

    const nombre = document.getElementById('nombre').value.trim();
    const precio = parseInt(document.getElementById('precio').value);

    if(!nombre || !precio) {
        document.getElementById('form-error').textContent = 'Todos los campos son obligatorios';
        return;
    }

    const producto = { nombre, precio};
    const nuevoProducto = await agregarProductos(producto);

    if (nuevoProducto) {
        document.getElementById('nombre').value = '';
        document.getElementById('precio').value = '';

        obtenerProductosDisponibles();
    }
}

obtenerProductosDisponibles();