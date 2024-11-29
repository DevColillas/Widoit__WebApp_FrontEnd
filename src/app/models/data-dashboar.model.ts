// Model for Shipment data structure
export interface Shipment {
  fileNumber: string;           // Unique file number
  dispatchDate: Date;           // Shipment dispatch date
  documentNumber: string;       // Shipment document number
  loadingDateTime: Date;        // Date and time of loading
  unloadingDateTime: Date;      // Date and time of unloading
  sender: string;               // Sender's name
  recipient: string;            // Recipient's name
  loadingPlace: string;         // Place where loading occurs
  driver: string;               // Driver's name
  status: ShipmentStatus[];          // Current shipment status
  cmr: CMRStatus;               // CMR (transport document) status
  transporter: string;          // Transport company name
  selected?: boolean;            // Checkbox selected status
  isFavorite?: boolean;          // Favorite status
  isHidden?: boolean;           // Hidden status
}
// Tipos de datos personalizados para los estados y CMR
export type ShipmentStatus = "Pendiente" | "Cargando" | "En tránsito" | "Entregado" | "Incidencia";
export type CMRStatus = "Planificado" | "Borrador" | "Completado" | "Incompleto";
