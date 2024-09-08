# Monorepo Project

Este es un proyecto monorepo que contiene dos subproyectos: `project1` y `packages/popup-library`.

## Estructura del proyecto

El proyecto está estructurado en dos carpetas principales:

- `apps/project1`: Contiene el código fuente de la aplicación `project1`.
- `packages/popup-library`: Contiene el código fuente de la biblioteca `popup-library`.

## Scripts

El proyecto principal contiene varios scripts que se pueden ejecutar desde la raíz del proyecto:

- `npm run dev`: Inicia el entorno de desarrollo de `project1`.
- `npm run build`: Construye todos los proyectos en el monorepo.
- `npm test`: Ejecuta las pruebas en todos los proyectos.
- `npm run lint`: Ejecuta ESLint, Stylelint y Prettier en todos los proyectos.

Cada subproyecto también tiene sus propios scripts que se pueden ejecutar desde su respectiva carpeta.

## Dependencias

Las dependencias de cada subproyecto se gestionan de forma independiente y se especifican en el archivo `package.json` de cada subproyecto.

## Motor

Este proyecto requiere Node.js versión 14.0.0 o superior.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.