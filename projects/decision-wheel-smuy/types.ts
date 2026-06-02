export interface WheelSegment {
  id: string;
  label: string;
  color: string;
}

export interface SpinResult {
  segment: WheelSegment;
  index: number;
}
