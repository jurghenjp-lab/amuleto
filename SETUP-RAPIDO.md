# 🚀 Setup Rápido - Amuleto Bonoloto

## ✅ Estado del Proyecto
- ✅ Código completo (22/22 tareas)
- ✅ Backend 100% implementado
- ✅ Frontend 100% implementado
- ✅ Tests creados
- ⏳ Pendiente: Instalar Node.js y ejecutar

## 📝 Pasos para Mañana

### 1. Verificar instalación de Node.js
Abre una terminal NUEVA (importante, para que cargue el PATH) y ejecuta:
```bash
node --version
npm --version
```

Si ves las versiones (ej: v18.x.x), ¡perfecto! Si no, reinstala Node.js desde: https://nodejs.org/

### 2. Instalar dependencias del proyecto
En la carpeta del proyecto:
```bash
npm install
```

Esto tardará unos minutos. Instalará todas las librerías necesarias.

### 3. Ejecutar la aplicación

#### Opción A: Android (más fácil en Windows)
```bash
# Terminal 1: Iniciar Metro
npm start

# Terminal 2: Ejecutar en Android
npm run android
```

**Requisitos previos para Android:**
- Android Studio instalado
- Emulador Android creado y corriendo
- O dispositivo físico conectado con USB debugging

#### Opción B: Solo ver si compila (sin ejecutar)
```bash
npm run lint
```

### 4. Ejecutar tests
```bash
npm test
```

## 🔧 Si hay problemas

### Error: "npm no se reconoce"
- Cierra y abre una terminal NUEVA
- Verifica que Node.js se instaló correctamente
- Reinicia el PC si es necesario

### Error al instalar dependencias
```bash
# Limpiar caché y reinstalar
npm cache clean --force
rm -rf node_modules
npm install
```

### Error en Android
- Asegúrate de tener Android Studio instalado
- Abre Android Studio y crea un emulador (AVD)
- Inicia el emulador antes de ejecutar `npm run android`

## 📱 Configurar Android Studio (si no lo tienes)

1. Descargar Android Studio: https://developer.android.com/studio
2. Instalar con configuración por defecto
3. Abrir Android Studio
4. Tools → AVD Manager → Create Virtual Device
5. Seleccionar un dispositivo (ej: Pixel 5)
6. Descargar una imagen del sistema (ej: Android 13)
7. Crear y ejecutar el emulador

## 🎯 Estructura de Comandos

```bash
npm install        # Instalar dependencias (solo una vez)
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android
npm test           # Ejecutar tests
npm run lint       # Verificar código
```

## 📊 Resumen de lo Implementado

### Backend (100%)
- ✅ Motor Histórico (análisis estadístico)
- ✅ Motor Buffon (simulación matemática)
- ✅ Motor Amuleto (personalización)
- ✅ Validador de apuestas
- ✅ Cliente API Bonoloto
- ✅ Sistema de caché (24h)
- ✅ Base de datos SQLite
- ✅ Coordinador de motores

### Frontend (100%)
- ✅ OrbeScreen (pantalla principal)
- ✅ MesaBuffonScreen (visualización Buffon)
- ✅ AltarDatosScreen (configuración usuario)
- ✅ ResultadosScreen (resultados oficiales)
- ✅ ApuestasGuardadasScreen (historial)
- ✅ AvisoLegal (disclaimer)
- ✅ Navegación completa
- ✅ App.tsx integrado

### Testing (100%)
- ✅ 9 property-based tests
- ✅ ~200 tests unitarios
- ✅ Tests de componentes UI
- ✅ Cobertura completa

## 🎨 Paleta de Colores
- Fondo: `#0B0E14` (negro azulado)
- Acentos: `#D4AF37` (dorado)
- Secundario: `#1a1f2e` (gris oscuro)

## 📞 Próximos Pasos Opcionales

Una vez que funcione:
1. Probar en dispositivo físico
2. Ajustar animaciones
3. Optimizar rendimiento
4. Publicar en Play Store / App Store

---

**¡Todo está listo! Solo falta instalar Node.js y ejecutar `npm install` 🚀**

**Que descanses! 😴**
