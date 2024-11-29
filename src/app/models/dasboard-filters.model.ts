export interface DashboardFilters {
  dateInit: string;
  dateEnd: string;
  dateType: string;
  remitentesItems: string[];
  destinatariosItems: string[];
  transportistaItems: string[];
  conductorItems: string[];
  camionItems: string[];
  remolqueItems: string[];
  estado: Status;
  estadoCMR: StatusCMR;
}

export type Status = {pendiente: boolean; cargando: boolean; enTransito: boolean; entregado: boolean; incidencia: boolean}
export type StatusCMR = {planificado: boolean; borrador: boolean; completado: boolean; incompleto: boolean}
