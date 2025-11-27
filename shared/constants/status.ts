export enum ReservationStatus {
    RESERVED = 'reserved',
    WATCHED = 'watched',
    CANCELED = 'canceled'
}

export enum ProjectionStatus {
    AVAILABLE = 'available',
    SOLD_OUT = 'sold_out',
    PAST = 'past'
}

export const STATUS_COLORS = {
    [ReservationStatus.RESERVED]: 'primary',
    [ReservationStatus.WATCHED]: 'accent',
    [ReservationStatus.CANCELED]: 'warn'
} as const;
