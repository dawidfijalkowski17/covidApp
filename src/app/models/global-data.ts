import { NumberValueAccessor } from "@angular/forms";

export interface GlobalDataSummary{
    country ?: string;
    confirmed ?: number;
    deaths ?: number;
    recovered ?: number;
    active ?: number;
}
