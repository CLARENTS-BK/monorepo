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

## Despliegue

Este proyecto se despliega en Netlify. La URL del sitio es: https://main--monorepo-monitore-inteligente.netlify.app/

## Pruebas

Las pruebas se ejecutan con GitHub Actions. Aquí está la configuración de la acción:

```yaml
name: Run unit test

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16.x'

      - name: Install dependencies
        run: npm ci -f

      - name: Run lint
        run: npm run lint

      - name: Unit tests
        run: npm test

      - name: Build
        run: npm run build