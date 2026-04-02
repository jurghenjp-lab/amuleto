# 🎱 Amuleto Bonoloto

Aplicación móvil multiplataforma que genera apuestas para la lotería Bonoloto española mediante tres motores algorítmicos: análisis estadístico histórico, simulación de la Aguja de Buffon, y personalización basada en datos del usuario.

## ✨ Características

- **Motor Histórico**: Análisis estadístico de resultados pasados (números calientes y fríos)
- **Motor Buffon**: Simulación matemática basada en el experimento de la Aguja de Buffon
- **Motor Amuleto**: Generación personalizada usando signo zodiacal, color favorito y equipo de fútbol
- **Interfaz intuitiva**: Diseño místico moderno con paleta dorada (#D4AF37) sobre fondo oscuro (#0B0E14)
- **Almacenamiento local**: Guarda tus apuestas favoritas con SQLite
- **Resultados oficiales**: Consulta los últimos sorteos de Bonoloto
- **Aviso legal**: Cumplimiento normativo con disclaimer y términos de uso

## 📋 Requisitos Previos

### Generales
- **Node.js** >= 18 ([Descargar aquí](https://nodejs.org/))
- **npm** o **yarn** (viene con Node.js)

### Para Android
- **Android Studio** ([Descargar aquí](https://developer.android.com/studio))
- **Android SDK** (se instala con Android Studio)
- **Java Development Kit (JDK)** 11 o superior
- Emulador Android configurado o dispositivo físico con USB debugging habilitado

### Para iOS (solo macOS)
- **Xcode** 12 o superior ([Descargar desde App Store](https://apps.apple.com/app/xcode/id497799835))
- **CocoaPods** (gestor de dependencias para iOS)
- **Xcode Command Line Tools**

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd amuleto-bonoloto
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configuración específica para iOS (solo macOS)
```bash
cd ios
pod install
cd ..
```

## 🏃 Ejecutar la Aplicación

### Iniciar Metro Bundler (servidor de desarrollo)
En una terminal:
```bash
npm start
```

### Ejecutar en Android
En otra terminal (con Metro corriendo):
```bash
npm run android
```

**Nota**: Asegúrate de tener un emulador Android corriendo o un dispositivo físico conectado.

### Ejecutar en iOS (solo macOS)
```bash
npm run ios
```

**Nota**: La primera vez puede tardar varios minutos mientras se compila.

## 🧪 Testing

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm run test:watch
```

### Tests incluidos
- **Tests unitarios**: Verifican funcionalidad específica de cada componente
- **Property-based tests**: Validan propiedades universales con fast-check (100+ iteraciones)
- **Tests de integración**: Verifican interacción entre componentes

## 📁 Estructura del Proyecto

```
amuleto-bonoloto/
├── src/
│   ├── types/              # Tipos TypeScript compartidos
│   ├── domain/             # Lógica de negocio
│   │   ├── engines/        # Motores de generación (Histórico, Buffon, Amuleto)
│   │   ├── validators/     # Validadores de apuestas
│   │   └── interfaces/     # Interfaces de dominio
│   ├── infrastructure/     # Servicios externos
│   │   ├── api/           # Cliente API Bonoloto
│   │   ├── database/      # SQLite (apuestas, configuración, caché)
│   │   └── sensors/       # Servicio de acelerómetro
│   ├── application/        # Coordinación de lógica
│   │   └── coordinators/  # Coordinador de motores
│   ├── presentation/       # UI Components
│   │   ├── screens/       # Pantallas (Orbe, Mesa Buffon, Altar, etc.)
│   │   └── components/    # Componentes reutilizables
│   └── navigation/         # Configuración de navegación
├── android/                # Código nativo Android
├── ios/                    # Código nativo iOS
├── .kiro/                  # Especificaciones y diseño
│   └── specs/
│       └── amuleto-bonoloto/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
└── docs/                   # Documentación adicional
```

## 🎨 Arquitectura

La aplicación sigue una **arquitectura en capas** con separación clara de responsabilidades:

1. **Capa de Presentación**: Componentes React Native
2. **Capa de Aplicación**: Coordinadores y orquestación
3. **Capa de Dominio**: Lógica de negocio (motores, validadores)
4. **Capa de Infraestructura**: Servicios externos (API, base de datos, sensores)

### Patrones de Diseño
- **Strategy Pattern**: Para los motores de generación intercambiables
- **Repository Pattern**: Para abstracción de persistencia
- **Service Layer**: Para comunicación con API externa

## 🔧 Scripts Disponibles

```bash
npm start          # Inicia Metro bundler
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS (solo macOS)
npm test           # Ejecuta tests
npm run test:watch # Ejecuta tests en modo watch
npm run lint       # Ejecuta ESLint
```

## 📱 Uso de la Aplicación

### 1. Pantalla Principal - El Orbe
- Toca el orbe dorado brillante
- Selecciona el número de columnas (1-8)
- Elige el motor para cada columna
- Genera tus apuestas

### 2. Configurar Motor Amuleto
- Ve al "Altar de Datos"
- Ingresa tu signo zodiacal
- Selecciona tu color favorito
- Escribe tu equipo de fútbol favorito
- Guarda la configuración

### 3. Ver Resultados Oficiales
- Consulta los últimos sorteos de Bonoloto
- Visualiza la combinación ganadora
- Revisa la distribución de premios

### 4. Apuestas Guardadas
- Guarda tus combinaciones favoritas
- Revisa el historial de apuestas generadas
- Elimina apuestas antiguas

## ⚠️ Aviso Legal

Esta aplicación genera números aleatorios con fines de entretenimiento. No garantiza premios ni resultados. El juego puede crear adicción. Juega con responsabilidad. Solo para mayores de 18 años.

## 🛠️ Tecnologías Utilizadas

- **React Native** 0.73.2 - Framework multiplataforma
- **TypeScript** 5.0.4 - Tipado estático
- **React Navigation** - Navegación entre pantallas
- **SQLite** - Base de datos local
- **Jest** - Framework de testing
- **fast-check** - Property-based testing
- **React Native Sensors** - Acceso al acelerómetro
- **React Native Reanimated** - Animaciones fluidas

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## � Build Fixes (Resueltos)

Durante la configuración inicial del proyecto React Native 0.73, se encontraron y resolvieron los siguientes problemas:

### Problemas Resueltos
1. **Plugin Gradle incompatible**: El `android/build.gradle` usaba la sintaxis antigua `apply plugin: "com.facebook.react.rootproject"`. Se actualizó a la nueva sintaxis `plugins { id("com.facebook.react") }` para React Native 0.73.

2. **Versión de Build Tools**: El `buildToolsVersion` estaba configurado en "34.0.0", pero el SDK instalado tenía "33.0.1". Se cambió a "33.0.1" para compatibilidad.

3. **JDK incorrecto**: El `JAVA_HOME` apuntaba a JDK 11, pero React Native 0.73 requiere JDK 17. Se configuró `JAVA_HOME` al JDK 17 de Adoptium.

4. **Keystore de debug faltante**: El archivo `android/app/debug.keystore` no existía. Se generó usando `keytool` con las credenciales estándar de debug.

5. **Política de ejecución de PowerShell**: En Windows, la ejecución de scripts estaba deshabilitada. Se cambió la política a `RemoteSigned` para el usuario actual.

### Comandos utilizados para las correcciones
- `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"`
- `cd android; .\gradlew clean`

Después de estos cambios, el build de Android funciona correctamente y la app se instala en el emulador.

## �📞 Soporte

Si encuentras algún problema o tienes preguntas:
- Abre un issue en GitHub
- Revisa la documentación en `/docs`
- Consulta las especificaciones en `.kiro/specs/amuleto-bonoloto/`

## 🎯 Roadmap

- [ ] Modo oscuro/claro
- [ ] Notificaciones de sorteos
- [ ] Estadísticas personales
- [ ] Compartir apuestas
- [ ] Más motores de generación
- [ ] Integración con redes sociales

---

**Desarrollado con ❤️ para los amantes de la Bonoloto**
"# amuleto" 
"# amuleto" 
"# amuletov2" 
