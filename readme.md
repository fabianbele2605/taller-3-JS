# Sistema de Gestión de Productos

## Descripción General
Esta es una aplicación web sencilla para la gestión de productos, desarrollada con HTML, JavaScript y CSS. Interactúa con una API basada en JSON para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos, además de funcionalidades adicionales como marcar productos como vendidos.

## Características
- **Agregar Productos**: Permite añadir nuevos productos con un nombre y precio.
- **Ver Productos**: Muestra una lista de productos disponibles en una tabla.
- **Actualizar Productos**: Modifica el nombre y precio de productos existentes.
- **Eliminar Productos**: Realiza una eliminación suave de productos marcándolos como inactivos (`debaja: true`).
- **Vender Productos**: Marca los productos como vendidos (`venta: true`).
- **Ver Detalles**: Muestra los detalles de un producto en una alerta.

## Tecnologías
- **Frontend**: HTML, JavaScript, CSS
- **API**: API REST basada en JSON (se asume que está ejecutándose en `http://localhost:3000/productos`)
- **Estructura de Datos**: Objeto JSON con detalles de productos (`id`, `nombre`, `precio`, `is_estado`, `venta`, `debaja`)

## Instrucciones de Configuración
1. **Clonar el Repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd <carpeta-del-repositorio>
   ```

2. **Iniciar la API de Backend**:
   Asegúrate de que una API REST basada en JSON esté ejecutándose en `http://localhost:3000/productos`. Los datos JSON proporcionados pueden usarse para poblar la base de datos.

3. **Configurar el Frontend**:
   - Asegúrate de que los archivos `index.html`, `gestion_apis.js` y `stylos.css` estén en el mismo directorio.
   - Abre `index.html` en un navegador web. Si usas un servidor local, puedes ejecutarlo con:
     ```bash
     npx http-server
     ```
     Luego, accede a `http://localhost:8080` (o el puerto configurado).

4. **Dependencias**:
   - No se requieren dependencias externas para el frontend, ya que utiliza JavaScript puro.
   - Asegúrate de que el backend (API) esté configurado para manejar las solicitudes GET, POST, PUT y PATCH.

## Estructura de Archivos
```
├── index.html          # Página principal con el formulario y la tabla de productos
├── gestion_apis.js     # Lógica de JavaScript para interactuar con la API
├── stylos.css          # Estilos CSS para la interfaz
└── README.md           # Este archivo
```

## Uso
1. **Agregar un Producto**:
   - Completa los campos de nombre y precio en el formulario "Agregar Productos".
   - Haz clic en "Agregar Productos" para enviar los datos a la API.
2. **Ver Productos Disponibles**:
   - Haz clic en el botón "Productos Disponibles" para cargar la lista de productos con `is_estado: true`.
3. **Actualizar un Producto**:
   - Haz clic en el botón "Actualizar" en la tabla para cargar los datos del producto en el formulario de actualización.
   - Modifica los campos y haz clic en "Actualizar Producto".
4. **Eliminar un Producto**:
   - Haz clic en el botón "Eliminar" en la tabla para marcar el producto como `debaja: true`.
5. **Vender un Producto**:
   - Haz clic en el botón "Vender" para marcar el producto como `venta: true`.
6. **Ver Detalles**:
   - Haz clic en el botón "Ver Detalles" para mostrar los detalles del producto en una alerta.

## Estructura de Datos JSON
La API espera y devuelve datos en el siguiente formato:
```json
{
  "productos": [
    {
      "id": "1",
      "nombre": "laptop",
      "precio": 900,
      "is_estado": true,
      "venta": true,
      "debaja": false
    },
    ...
  ]
}
```

## Notas
- La aplicación realiza una eliminación suave (soft delete) al marcar `is_estado: false` y `debaja: true` en lugar de eliminar físicamente los registros.
- Los errores se manejan mediante alertas y mensajes en la interfaz.
- Asegúrate de que la API esté configurada para soportar consultas con parámetros, como `?is_estado=true`.
- El archivo `stylos.css` debe incluir los estilos necesarios para los contenedores `form-container`, `update-container`, y la tabla.

## Solución de Problemas
- **API no responde**: Verifica que el servidor backend esté ejecutándose en `http://localhost:3000`.
- **Tabla vacía**: Asegúrate de que la API devuelva productos con `is_estado: true`.
- **Errores en el formulario**: Revisa que los campos de entrada no estén vacíos y que el precio sea un número válido.

## Mejoras Futuras
- Agregar validaciones más robustas en el frontend (por ejemplo, tipos de datos específicos).
- Implementar un sistema de autenticación para la API.
- Mejorar la interfaz con un diseño más moderno y responsivo.
- Agregar filtros para la tabla de productos (por ejemplo, por estado de venta).

## Licencia
                          FABIANBELE2605   @RIWI

</xaiArtifact>