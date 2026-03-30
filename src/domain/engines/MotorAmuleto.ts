/**
 * Motor Amuleto - Generación personalizada basada en datos del usuario
 * Requisitos: 3.1, 3.2, 3.3, 3.4, 3.7
 */

import { IGeneradorApuestas, IConfiguracionUsuario } from '../interfaces';
import { SignoZodiacal } from '../../types';

export class MotorAmuleto implements IGeneradorApuestas {
  readonly nombre = 'Motor Amuleto';
  readonly requiereConfiguracion = true;

  constructor(private configuracionUsuario: IConfiguracionUsuario) {}

  /**
   * Genera una apuesta personalizada basada en datos del usuario
   * Requisitos: 3.1, 3.2, 3.3, 3.4, 3.7
   */
  async generarApuesta(): Promise<number[]> {
    // 1. Obtener datos del usuario
    const config = await this.configuracionUsuario.obtener();

    if (!config) {
      throw new Error('Motor Amuleto requiere configuración del usuario');
    }

    // 2. Calcular semillas (Requisitos 3.1, 3.2, 3.3)
    const semillaZodiacal = this.calcularSemillaZodiacal(config.signoZodiacal);
    const semillaColor = this.calcularSemillaColor(config.colorFavorito);
    const semillaEquipo = this.calcularSemillaEquipo(config.equipoFutbol);

    // 3. Combinar con fecha actual (Requisito 3.5, 3.6)
    const fechaActual = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // 4. Generar hash determinista (Requisito 3.4)
    const semillaCombinada = `${semillaZodiacal}-${semillaColor}-${semillaEquipo}-${fechaActual}`;
    const hash = this.generarHash(semillaCombinada);

    // 5. Convertir hash a 6 números únicos (Requisito 3.7)
    return this.hashANumeros(hash);
  }

  /**
   * Calcula semilla numérica basada en signo zodiacal
   * Requisito: 3.1
   */
  calcularSemillaZodiacal(signo: SignoZodiacal): number {
    const mapeoSignos: Record<SignoZodiacal, number> = {
      Aries: 9,
      Tauro: 6,
      Géminis: 5,
      Cáncer: 2,
      Leo: 1,
      Virgo: 5,
      Libra: 6,
      Escorpio: 9,
      Sagitario: 3,
      Capricornio: 8,
      Acuario: 4,
      Piscis: 7,
    };
    return mapeoSignos[signo];
  }

  /**
   * Calcula semilla numérica basada en color favorito
   * Mapeo basado en longitud de onda del espectro visible
   * Requisito: 3.2
   */
  calcularSemillaColor(color: string): number {
    const coloresBase: Record<string, number> = {
      Rojo: 1,
      Naranja: 8,
      Amarillo: 15,
      Verde: 22,
      Azul: 29,
      Añil: 36,
      Violeta: 43,
      Rosa: 10,
      Blanco: 25,
      Negro: 49,
    };

    // Normalizar color (primera letra mayúscula)
    const colorNormalizado = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

    return coloresBase[colorNormalizado] || 25; // Default: blanco
  }

  /**
   * Calcula semilla numérica basada en equipo de fútbol
   * Suma valores ASCII y aplica módulo 49
   * Requisito: 3.3
   */
  calcularSemillaEquipo(nombreEquipo: string): number {
    let suma = 0;
    for (let i = 0; i < nombreEquipo.length; i++) {
      suma += nombreEquipo.charCodeAt(i);
    }
    return (suma % 49) + 1; // Rango 1-49
  }

  /**
   * Genera hash determinista a partir de una cadena
   * Requisito: 3.4
   */
  generarHash(entrada: string): string {
    // Implementación de hash simple pero determinista
    // Basado en algoritmo DJB2
    let hash = 5381;

    for (let i = 0; i < entrada.length; i++) {
      const char = entrada.charCodeAt(i);
      hash = (hash << 5) + hash + char; // hash * 33 + char
      hash = hash & hash; // Convertir a entero de 32 bits
    }

    // Convertir a hexadecimal y asegurar longitud mínima
    const hashHex = Math.abs(hash).toString(16);

    // Extender el hash si es necesario para tener suficientes dígitos
    let hashExtendido = hashHex;
    while (hashExtendido.length < 12) {
      // Generar más dígitos usando el hash como semilla
      const nuevoHash = this.generarHashSecundario(hashExtendido);
      hashExtendido += nuevoHash;
    }

    return hashExtendido;
  }

  /**
   * Genera hash secundario para extender el hash principal
   */
  private generarHashSecundario(entrada: string): string {
    let hash = 0;
    for (let i = 0; i < entrada.length; i++) {
      const char = entrada.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Convierte hash a 6 números únicos en rango 1-49
   * Requisito: 3.7
   */
  hashANumeros(hash: string): number[] {
    const numeros = new Set<number>();
    let indice = 0;

    // Intentar generar números desde el hash
    while (numeros.size < 6 && indice < hash.length - 1) {
      // Tomar pares de caracteres hexadecimales
      const par = hash.substring(indice, indice + 2);
      const valor = parseInt(par, 16);

      // Mapear a rango 1-49
      const numero = (valor % 49) + 1;
      numeros.add(numero);

      indice += 2;
    }

    // Si no hay suficientes números únicos, generar más con semilla derivada
    let intentos = 0;
    while (numeros.size < 6 && intentos < 100) {
      const hashExtendido = this.generarHash(hash + numeros.size + intentos);
      const valor = parseInt(hashExtendido.substring(0, 2), 16);
      const numero = (valor % 49) + 1;
      numeros.add(numero);
      intentos++;
    }

    // Si aún no tenemos 6 números, completar con números faltantes
    if (numeros.size < 6) {
      for (let i = 1; i <= 49 && numeros.size < 6; i++) {
        numeros.add(i);
      }
    }

    return Array.from(numeros).sort((a, b) => a - b);
  }

  /**
   * Genera una apuesta para una fecha específica (útil para testing)
   * Requisitos: 3.5, 3.6
   */
  async generarApuestaParaFecha(fecha: Date): Promise<number[]> {
    const config = await this.configuracionUsuario.obtener();

    if (!config) {
      throw new Error('Motor Amuleto requiere configuración del usuario');
    }

    const semillaZodiacal = this.calcularSemillaZodiacal(config.signoZodiacal);
    const semillaColor = this.calcularSemillaColor(config.colorFavorito);
    const semillaEquipo = this.calcularSemillaEquipo(config.equipoFutbol);

    const fechaStr = fecha.toISOString().split('T')[0];
    const semillaCombinada = `${semillaZodiacal}-${semillaColor}-${semillaEquipo}-${fechaStr}`;
    const hash = this.generarHash(semillaCombinada);

    return this.hashANumeros(hash);
  }
}
