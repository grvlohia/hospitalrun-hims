export enum WeightUnit {
  Kilogram = 'kg',
  Pound = 'lb',
}

export enum BloodPressureUnit {
  MillimetersOfMercury = 'mmHg',
  KiloPascal = 'kPa',
}

export enum TemperatureUnit {
  Celsius = 'C',
  Fahrenheit = 'F',
}

export default interface PatientCondition {
  complaints: string
  weight: number | undefined
  weightUnit: WeightUnit
  bloodPressure: number | undefined
  bloodPressureUnit: BloodPressureUnit
  temperature: number | undefined
  temperatureUnit: TemperatureUnit
}
