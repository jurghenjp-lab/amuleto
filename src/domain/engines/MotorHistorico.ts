/**
 * Motor Histórico - Generación basada en análisis estadístico
 * Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5
 */

import { IGeneradorApuestas, IBonolotoApiClient } from '../interfaces';
import { ResultadoSorteo } from '../../types';

interface FrecuenciasNumeros {
  [numero: number]: number;
}

interface UltimaAparicion {
  [numero: number]: number; // Número de sorteos desde última aparición
}

export class MotorHistorico implements IGeneradorApuestas {
  readonly nombre = 'Motor Histórico';
  readonly requiereConfiguracion = false;

  constructor(
    private apiClient: IBonolotoApiClient,
    private cache?: any // CacheResultados opcional
  ) {}

  /**
   * Genera una apuesta basada en análisis estadístico histórico
   * Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5
   */
  async generarApuesta(): Promise<number[]> {
    // 1. Obtener resultados del último año
    const resultados = await this.obtenerResultadosUltimoAno();

    // 2. Calcular frecuencias
    const frecuencias = this.calcularFrecuencias(resultados);

    // 3. Identificar números calientes (top 15)
    const numerosCalientes = this.obtenerNumerosCalientes(frecuencias, 15);

    // 4. Identificar números fríos (>20 sorteos sin aparecer)
    const numerosFrios = this.obtenerNumerosFrios(resultados, 20);

    // 5. Seleccionar 4-5 números calientes (Requisito 1.2)
    const cantidadCalientes = Math.random() < 0.5 ? 4 : 5;
    const seleccionCalientes = this.seleccionarAleatorios(numerosCalientes, cantidadCalientes);

    // 6. Seleccionar 1 número frío (Requisito 1.3)
    const seleccionFrios = this.seleccionarAleatorios(numerosFrios, 1);

    // 7. Completar hasta 6 con números restantes
    const apuesta = this.completarApuesta(seleccionCalientes, seleccionFrios);

    // 8. Ajustar distribución par/impar (Requisito 1.4)
    const apuestaAjustada = this.ajustarDistribucionParImpar(apuesta);

    // 9. Ordenar y retornar
    return apuestaAjustada.sort((a, b) => a - b);
  }

  /**
   * Obtiene resultados del último año
   * Requisito: 1.1
   */
  private async obtenerResultadosUltimoAno(): Promise<ResultadoSorteo[]> {
    // Intentar obtener del caché primero
    if (this.cache) {
      const resultadosCacheados = await this.cache.obtener();
      if (resultadosCacheados) {
        return resultadosCacheados;
      }
    }

    // Si no hay caché, consultar API
    const fechaFin = new Date();
    const fechaInicio = new Date();
    fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);

    const resultados = await this.apiClient.obtenerResultadosRango(fechaInicio, fechaFin);

    // Guardar en caché si está disponible
    if (this.cache) {
      await this.cache.guardar(resultados);
    }

    return resultados;
  }

  /**
   * Calcula la frecuencia de aparición de cada número
   * Requisito: 1.2
   */
  calcularFrecuencias(resultados: ResultadoSorteo[]): FrecuenciasNumeros {
    const frecuencias: FrecuenciasNumeros = {};

    // Inicializar todos los números (1-49) con frecuencia 0
    for (let i = 1; i <= 49; i++) {
      frecuencias[i] = 0;
    }

    // Contar apariciones
    for (const resultado of resultados) {
      for (const numero of resultado.combinacionGanadora) {
        frecuencias[numero]++;
      }
    }

    return frecuencias;
  }

  /**
   * Obtiene los números más frecuentes (calientes)
   * Requisito: 1.2
   */
  obtenerNumerosCalientes(frecuencias: FrecuenciasNumeros, cantidad: number): number[] {
    // Convertir a array y ordenar por frecuencia descendente
    const numerosOrdenados = Object.entries(frecuencias)
      .map(([numero, freq]) => ({ numero: parseInt(numero), frecuencia: freq }))
      .sort((a, b) => b.frecuencia - a.frecuencia);

    // Tomar los top N
    return numerosOrdenados.slice(0, cantidad).map((item) => item.numero);
  }

  /**
   * Obtiene números que llevan muchos sorteos sin aparecer (fríos)
   * Requisito: 1.3
   */
  obtenerNumerosFrios(resultados: ResultadoSorteo[], umbralSorteos: number): number[] {
    const ultimaAparicion: UltimaAparicion = {};

    // Inicializar todos los números con el máximo de sorteos
    for (let i = 1; i <= 49; i++) {
      ultimaAparicion[i] = resultados.length;
    }

    // Recorrer resultados desde el más reciente
    for (let i = 0; i < resultados.length; i++) {
      const resultado = resultados[i];
      for (const numero of resultado.combinacionGanadora) {
        // Solo actualizar si aún no se ha encontrado
        if (ultimaAparicion[numero] === resultados.length) {
          ultimaAparicion[numero] = i;
        }
      }
    }

    // Filtrar números que llevan más del umbral sin aparecer
    const numerosFrios: number[] = [];
    for (let numero = 1; numero <= 49; numero++) {
      if (ultimaAparicion[numero] >= umbralSorteos) {
        numerosFrios.push(numero);
      }
    }

    return numerosFrios;
  }

  /**
   * Selecciona números aleatorios de un array
   */
  private seleccionarAleatorios(numeros: number[], cantidad: number): number[] {
    if (numeros.length === 0) {
      return [];
    }

    const seleccionados: number[] = [];
    const disponibles = [...numeros];

    for (let i = 0; i < cantidad && disponibles.length > 0; i++) {
      const indice = Math.floor(Math.random() * disponibles.length);
      seleccionados.push(disponibles[indice]);
      disponibles.splice(indice, 1);
    }

    return seleccionados;
  }

  /**
   * Completa la apuesta hasta 6 números con números aleatorios
   */
  private completarApuesta(calientes: number[], frios: number[]): number[] {
    const apuesta = [...calientes, ...frios];
    const numerosUsados = new Set(apuesta);

    // Generar números restantes
    while (apuesta.length < 6) {
      const numero = Math.floor(Math.random() * 49) + 1;
      if (!numerosUsados.has(numero)) {
        apuesta.push(numero);
        numerosUsados.add(numero);
      }
    }

    return apuesta;
  }

  /**
   * Ajusta la distribución de números pares e impares
   * Distribuciones válidas: 3:3, 4:2, 2:4
   * Requisito: 1.4
   */
  ajustarDistribucionParImpar(apuesta: number[]): number[] {
    const pares = apuesta.filter((n) => n % 2 === 0);
    const impares = apuesta.filter((n) => n % 2 !== 0);

    const cantidadPares = pares.length;
    const cantidadImpares = impares.length;

    // Verificar si ya tiene una distribución válida
    if (
      (cantidadPares === 3 && cantidadImpares === 3) ||
      (cantidadPares === 4 && cantidadImpares === 2) ||
      (cantidadPares === 2 && cantidadImpares === 4)
    ) {
      return apuesta;
    }

    // Necesita ajuste - reemplazar números para lograr distribución válida
    return this.reemplazarParaDistribucion(apuesta);
  }

  /**
   * Reemplaza números para lograr una distribución par/impar válida
   */
  private reemplazarParaDistribucion(apuesta: number[]): number[] {
    const pares = apuesta.filter((n) => n % 2 === 0);
    const impares = apuesta.filter((n) => n % 2 !== 0);
    const numerosUsados = new Set(apuesta);

    let cantidadPares = pares.length;
    let cantidadImpares = impares.length;

    // Determinar distribución objetivo (elegir aleatoriamente entre las válidas)
    const distribucionesValidas = [
      { pares: 3, impares: 3 },
      { pares: 4, impares: 2 },
      { pares: 2, impares: 4 },
    ];
    const objetivo = distribucionesValidas[Math.floor(Math.random() * distribucionesValidas.length)];

    const nuevaApuesta = [...apuesta];

    // Ajustar pares
    while (cantidadPares < objetivo.pares) {
      // Necesitamos más pares, reemplazar un impar
      const indiceImpar = nuevaApuesta.findIndex((n) => n % 2 !== 0);
      if (indiceImpar !== -1) {
        // Buscar un número par que no esté usado
        let nuevoPar = this.generarNumeroAleatorio(true, numerosUsados);
        nuevaApuesta[indiceImpar] = nuevoPar;
        numerosUsados.delete(apuesta[indiceImpar]);
        numerosUsados.add(nuevoPar);
        cantidadPares++;
        cantidadImpares--;
      }
    }

    while (cantidadPares > objetivo.pares) {
      // Necesitamos menos pares, reemplazar un par
      const indicePar = nuevaApuesta.findIndex((n) => n % 2 === 0);
      if (indicePar !== -1) {
        // Buscar un número impar que no esté usado
        let nuevoImpar = this.generarNumeroAleatorio(false, numerosUsados);
        nuevaApuesta[indicePar] = nuevoImpar;
        numerosUsados.delete(apuesta[indicePar]);
        numerosUsados.add(nuevoImpar);
        cantidadPares--;
        cantidadImpares++;
      }
    }

    return nuevaApuesta;
  }

  /**
   * Genera un número aleatorio par o impar que no esté en uso
   */
  private generarNumeroAleatorio(par: boolean, numerosUsados: Set<number>): number {
    let numero: number;
    let intentos = 0;
    const maxIntentos = 100;

    do {
      numero = Math.floor(Math.random() * 49) + 1;
      intentos++;

      if (intentos >= maxIntentos) {
        // Fallback: buscar secuencialmente
        for (let i = 1; i <= 49; i++) {
          if (!numerosUsados.has(i) && (par ? i % 2 === 0 : i % 2 !== 0)) {
            return i;
          }
        }
        throw new Error('No se pudo generar número con paridad requerida');
      }
    } while (numerosUsados.has(numero) || (par ? numero % 2 !== 0 : numero % 2 === 0));

    return numero;
  }
}
