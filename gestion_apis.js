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

// funcion para buscar por ID

async function getProductoID(id) {
    try {
        const response = await fetch (`http://localhost:3000/productos/${id}`);
        if(!response.ok) {
            return null;
        }

        const producto = await response.json();
        return producto.is_estado ? producto : null;
    } catch (error) {
        console.error('Error al obtener el producto', error);
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

// funcion para vender productos

async function ventaProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ is_estado: true, venta: true })
        });

        if(!response.ok) {
            throw new Error('Todavia no se ah vendido el producto');
        }

        alert('Producto Vendido!');
        obtenerProductosDisponibles();
    } catch (error) {
        console.error('Error al vender el producto:', error);
        alert('Error al vender el producto');
    }
}

// funcion de ver detalles de productos

async function viewProductDetails(id) {
    const producto = await getProductoID(id);
    if(producto) {
        alert(`Detalle del producto:\nID: ${producto.id}\nNombre: ${producto.nombre}\nPrecio: ${producto.precio}`);
    } else {
        alert('Producto no encontrado')
    }
}

// funcion para cancelar la actualizacion

function cancelarUpdate() {
    document.getElementById('update-form').style.display = 'none';
    document.getElementById('form-container').style.display ='block';
    document.getElementById('update-error').textContent = '';
}

// funcion de obtener los productos disponibles

async function obtenerProductosDisponibles() {
    try {
        const response = await fetch('http://localhost:3000/productos?is_estado=true');
        if(!response.ok) {
            throw new Error('No se puedieron obtener los productos disponibles');
        }

        const productosDisponibles = await response.json();

        const tableBody = document.getElementById('productos-table-body');
        tableBody.innerHTML = '';

        productosDisponibles.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.venta?'Vendido':'Disponible'}</td>
                <td>
                    <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                    <button onclick="ventaProducto('${producto.id}')">Vender</button>
                    <button onclick="viewProductDetails('${producto.id}')">Ver Detalles</button>
                    <button onclick="mostrarUpdateform('${producto.id}')">Actualizar</button>
                </td>
                `;
                tableBody.appendChild(row);
        });
    } catch (error) {

    }
}

// funcion para agregar los productos al formulario

async function handleAddProduct() {
    document.getElementById('form-error').textContent = '';

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

// funcion para actualizar los productos 

async function handleUpdateProduct() {
    const id = document.getElementById('update-id').value;
    const nombre = document.getElementById('update-nombre').value.trim();
    const precio = parseInt(document.getElementById('update-precio').value);

    if(!nombre || !precio) {
        document.getElementById('update-form').textContent = 'Todos los campos son obligatorios';
        return;
    }

    try {
        const productoActual = await getProductoID(id);
        if(!productoActual) {
            throw new Error('Producto no escontrado')
        }

        const updatedProducto = {
            id: id,
            nombre: nombre,
            precio: precio,
            is_estado: productoActual.is_estado,
            venta: productoActual.venta || false,
            debaja: productoActual.debaja || false,
        };

        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(updatedProducto)
        });

        if(!response.ok) {
            throw new Error('Todavia no se ah actualizado el producto');
        }

        alert('Producto Actualizado!');
        document.getElementById('update-form').style.display = 'none';
        document.getElementById('form-container').style.display = 'block';
        obtenerProductosDisponibles();
    } catch (error) {
        console.error('Error al actualizar el producto', error);
        document.getElementById('update-error').textContent = 'Error al actualizar el producto'
    }
}

// funcion para mostrar los productos  actualizados al formulario

async function mostrarUpdateform(id) {
    const producto = await getProductoID(id);
    if(producto) {
        document.getElementById('update-id').value = producto.id;
        document.getElementById('update-nombre').value = producto.nombre;
        document.getElementById('update-precio').value = producto.precio;
        document.getElementById('update-form').style.display = 'block';
        document.getElementById('form-container').style.display = 'none';
    } else {
        alert('Producto no encontrado');
    }
}

obtenerProductosDisponibles();