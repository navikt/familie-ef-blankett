import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export const datoFormat: DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

export const månedÅrFormat: DateTimeFormatOptions = {
  month: '2-digit',
  year: 'numeric',
};

export const formaterNullableIsoDato = (dato?: string): string | undefined =>
  dato && formaterIsoDato(dato);

export const formaterNullableMånedÅr = (dato?: string): string | undefined =>
  dato && new Date(dato).toLocaleDateString('no-NO', månedÅrFormat);

export const formaterIsoDato = (dato: string): string => {
  return new Date(dato).toLocaleDateString('no-NO', datoFormat);
};
